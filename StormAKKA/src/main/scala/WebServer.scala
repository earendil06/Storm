import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.server._
import com.pastorm.accessors.{Accessor, LocalAccessor, ServerAccessor}
import com.pastorm.encounter.engine.GameEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.storm.model._
import com.typesafe.config.{Config, ConfigFactory}
import spray.json._

import scala.collection.JavaConverters._
import scala.util.Try

object WebServer extends HttpApp with JsonSupport with CorsHandler {

  val config: Config = ConfigFactory.load()
  val accessor: Accessor =
    if (config.getString("profiles.active").equals("dev")) new LocalAccessor else new ServerAccessor

  val gameEngine: GameEngine = EncounterEngineComponent.encounterEngine

  implicit def myRejectionHandler: RejectionHandler =
    RejectionHandler.newBuilder()
      .handleAll[Rejection] { _ =>
      complete(addCORSHeaders(HttpResponse(StatusCodes.InternalServerError)))
    }
      .handleNotFound {
        complete(addCORSHeaders(HttpResponse(StatusCodes.NotFound)))
      }
      .result()

  implicit def myExceptionHandler: ExceptionHandler =
    ExceptionHandler {
      case _ =>
        complete(addCORSHeaders(HttpResponse(StatusCodes.InternalServerError)))
    }

  def getBlockByName(name: String): Option[Block] = {
    val option = accessor.getBlockByName(name)
    if (option.isPresent) Some(option.get()) else None // java optional to scala option
  }

  def blockRoutes: Route =
    pathPrefix("api") {
      pathPrefix("block") {
        path(Segment) { name =>
          get {
            val block = getBlockByName(name)
            if (block.nonEmpty) complete(block.get) else complete(StatusCodes.NotFound)
          }
        }
      } ~
        pathPrefix("write") {
          post {
            path(Segment) { name =>
              entity(as[String]) { storm: String =>
                val response = accessor.saveBlock(name, storm)
                if (response.isEmpty)
                  complete(StatusCodes.OK)
                else
                  complete(StatusCodes.BadRequest)
              }
            }
          }
        } ~
        path("blocks") {
          get {
            complete(accessor.getBlockList.asScala.toList.toJson)
          }
        }
    }

  def monsterRoutes: Route =
    pathPrefix("api") {
      pathPrefix("monster") {
        path(Segment) { name =>
          get {
            val monster = gameEngine.getMonsterByName(name.toLowerCase())
            if (monster.nonEmpty) complete(monster.get) else complete(StatusCodes.NotFound)
          }
        }
      }
    }

  def apiRoutes: Route =
    pathPrefix("api") {
      pathPrefix("new") {
        post {
          entity(as[NewMonster]) { newMonster =>
            if (gameEngine.getMonsterByName(newMonster.name.toLowerCase()).nonEmpty) {
              complete(StatusCodes.BadRequest)
            } else {
              val block = getBlockByName(newMonster.blockName.toLowerCase())
              block.foreach(block => gameEngine.newMonster(newMonster.name.toLowerCase(), block))
              complete {
                if (block.nonEmpty)
                  StatusCodes.OK
                else
                  StatusCodes.NotFound
              }
            }
          }
        }
      } ~
        pathPrefix("data") {
          path("names") {
            get {
              complete {
                gameEngine.getEncounterData.monsters.map(_.name).toJson
              }
            }
          } ~
            get {
              complete(gameEngine.getEncounterData)
            }
        } ~
        path("playing") {
          get {
            if (gameEngine.getPlayingMonster.nonEmpty)
              complete(gameEngine.getPlayingMonster)
            else
              complete(StatusCodes.NotFound)
          }
        } ~
        path("reset") {
          put {
            gameEngine.reset()
            complete(StatusCodes.OK)
          }
        } ~
        path("turn") {
          get {
            complete(gameEngine.getTurn.toString)
          }
        } ~
        pathPrefix("remove") {
          path(Segment) { name =>
            delete {
              if (name.isEmpty) {
                complete(StatusCodes.BadRequest)
              } else if (gameEngine.getMonsterByName(name.toLowerCase()).isEmpty) {
                complete(StatusCodes.NotFound)
              } else {
                gameEngine.remove(name.toLowerCase())
                complete(StatusCodes.OK)
              }
            }
          }
        } ~
        pathPrefix("damage") {
          put {
            entity(as[DamageMonster]) { damageMonster: DamageMonster =>
              val damage: Try[Int] = Try(damageMonster.damage.toInt)
              if (damage.isSuccess) {
                println(damage.get)
                val damaged = gameEngine.damage(damageMonster.name.toLowerCase(), damage.get)
                if (damaged.nonEmpty) {
                  gameEngine.updateMonster(damaged.get)
                  complete(gameEngine.getMonsterByName(damageMonster.name.toLowerCase))
                } else {
                  complete(StatusCodes.NotFound)
                }
              } else {
                complete(StatusCodes.BadRequest)
              }
            }
          }
        } ~
        path("set") {
          put {
            entity(as[SetJson]) { setJson: SetJson =>
              val initiative: Try[Int] = Try(setJson.value.toInt)
              if (initiative.isSuccess) {
                val monster = gameEngine.setInitiative(setJson.name.toLowerCase(), initiative.get)
                if (monster.nonEmpty) {
                  gameEngine.updateMonster(monster.get)
                  complete(monster)
                } else {
                  complete(StatusCodes.NotFound)
                }
              } else {
                complete(StatusCodes.BadRequest)
              }
            }
          }
        }
    }

  def initiativeRoutes: Route =
    pathPrefix("api") {
      pathPrefix("roll") {
        path("initiative") {
          put {
            gameEngine.rollInitiative()
            if (gameEngine.getPlayingMonster.isEmpty)
              complete(StatusCodes.NotFound)
            else
              complete(gameEngine.getPlayingMonster)
          }
        }
      } ~
        path("nextTurn") {
          put {
            gameEngine.nextTurn()
            if (gameEngine.getPlayingMonster.isEmpty)
              complete(StatusCodes.NotFound)
            else
              complete(gameEngine.getPlayingMonster)
          }
        }
    }

  override def routes: Route =
    corsHandler(
      apiRoutes ~
        blockRoutes ~
        monsterRoutes ~
        initiativeRoutes)

  def main(args: Array[String]): Unit = {
    WebServer.startServer(config.getString("http.interface"), config.getInt("http.port"))
  }
}
