package com.storm.api.route

import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.pastorm.accessors.Accessor
import com.pastorm.encounter.engine.GameEngine

class InitiativeRoute(gameEngine: GameEngine, accessor: Accessor) extends StormRoute(gameEngine, accessor) {
  override def route: Route =
    pathPrefix("api") {
      pathPrefix("roll") {
        path("initiative") {
          put {
            gameEngine.rollInitiative()
            complete(gameEngine.getPlayingMonster match {
              case Some(monster) => OK -> monster
              case None => NotFound
            })
          }
        }
      } ~
        path("nextTurn") {
          put {
            gameEngine.nextTurn()
            complete(gameEngine.getPlayingMonster match {
              case Some(monster) => OK -> monster
              case None => NotFound
            })
          }
        }
    }
}
