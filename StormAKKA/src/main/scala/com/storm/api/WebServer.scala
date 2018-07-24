package com.storm.api

import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.server._
import com.pastorm.accessors.{Accessor, LocalAccessor, ServerAccessor}
import com.pastorm.encounter.engine.GameEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.storm.api.route.{ApiRoute, InitiativeRoute}
import com.typesafe.config.{Config, ConfigFactory}

object WebServer extends HttpApp with CorsHandler {

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

  val apiRoute: ApiRoute = new ApiRoute(gameEngine, accessor)
  val initiativeRoutes: InitiativeRoute = new InitiativeRoute(gameEngine, accessor)

  override def routes: Route =
    corsHandler(apiRoute.route ~ initiativeRoutes.route)

  def main(args: Array[String]): Unit = {
    WebServer.startServer(config.getString("http.interface"), config.getInt("http.port"))
  }
}
