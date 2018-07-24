package com.storm.api.route

import akka.http.scaladsl.server._
import com.pastorm.accessors.Accessor
import com.pastorm.encounter.engine.GameEngine
import com.storm.api._
import com.storm.model.Block

abstract class StormRoute(gameEngine: GameEngine, accessor: Accessor) extends JsonSupport {

  def getBlockByName(name: String): Option[Block] = {
    val option = accessor.getBlockByName(name)
    if (option.isPresent) Some(option.get()) else None // java optional to scala option
  }

  def route: Route
}
