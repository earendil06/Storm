package com.storm.api.route

import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server._
import com.pastorm.accessors.Accessor
import com.pastorm.encounter.engine.GameEngine
import com.storm.api._
import spray.json._

import scala.collection.JavaConverters._
import scala.util.{Failure, Success, Try}

class ApiRoute(gameEngine: GameEngine, accessor: Accessor) extends StormRoute(gameEngine, accessor) {
  override def route: Route =
    pathPrefix("api") {
      pathPrefix("new") {
        post {
          entity(as[NewMonster]) { newMonster =>
            if (gameEngine.getMonsterByName(newMonster.name.toLowerCase()).nonEmpty) {
              complete(BadRequest)
            } else {
              val block = getBlockByName(newMonster.blockName.toLowerCase())
              block.foreach(block => gameEngine.newMonster(newMonster.name.toLowerCase(), block))
              complete(block match {
                case Some(_) => OK
                case None => NotFound
              })
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
            complete(gameEngine.getPlayingMonster match {
              case Some(monster) => monster
              case None => NotFound
            })
          }
        } ~
        path("reset") {
          put {
            gameEngine.reset()
            complete(OK)
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
                complete(BadRequest)
              } else if (gameEngine.getMonsterByName(name.toLowerCase()).isEmpty) {
                complete(NotFound)
              } else {
                gameEngine.remove(name.toLowerCase())
                complete(OK)
              }
            }
          }
        } ~
        pathPrefix("damage") {
          put {
            entity(as[DamageMonster]) { damageMonster: DamageMonster =>
              val damage: Try[Int] = Try(damageMonster.damage.toInt)
              if (damage.isSuccess) {
                val damaged = gameEngine.damage(damageMonster.name.toLowerCase(), damage.get)
                if (damaged.nonEmpty) {
                  gameEngine.updateMonster(damaged.get)
                  complete(gameEngine.getMonsterByName(damageMonster.name.toLowerCase))
                } else {
                  complete(NotFound)
                }
              } else {
                complete(BadRequest)
              }
            }
          }
        } ~
        path("set") {
          put {
            entity(as[SetJson]) { setJson: SetJson =>
              val initiative: Try[Int] = Try(setJson.value.toInt)
              complete {
                initiative match {
                  case Success(initiativeValue) =>
                    gameEngine.setInitiative(setJson.name.toLowerCase(), initiativeValue) match {
                      case Some(monster) =>
                        gameEngine.updateMonster(monster)
                        OK -> monster
                      case None =>
                        NotFound
                    }
                  case Failure(f) =>
                    BadRequest -> f.getMessage
                }
              }
            }
          }
        } ~
        pathPrefix("monster") {
          path(Segment) { name =>
            get {
              complete(gameEngine.getMonsterByName(name.toLowerCase()) match {
                case Some(monster) => OK -> monster
                case None => NotFound
              })
            }
          }
        } ~
        pathPrefix("block") {
          path(Segment) { name =>
            get {
              complete(getBlockByName(name) match {
                case Some(block) => OK -> block
                case None => NotFound
              })
            }
          }
        } ~
        pathPrefix("write") {
          post {
            path(Segment) { name =>
              entity(as[String]) { storm: String =>
                complete(accessor.saveBlock(name.toLowerCase(), storm) match {
                  case "" => OK
                  case _ => BadRequest
                })
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

}
