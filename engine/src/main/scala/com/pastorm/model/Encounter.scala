package com.pastorm.model

import scala.scalajs.js.annotation._
import upickle.default.{macroRW, ReadWriter => RW}

@JSExportTopLevel("EncounterData")
@JSExportAll
case class Encounter(monsters: List[Monster], playingMonsterName: String, turn: Int)

object Encounter{
  implicit val rw: RW[Encounter] = macroRW
}
