package com.pastorm.model

import scala.scalajs.js.annotation._
import upickle.default.{macroRW, ReadWriter => RW}

@JSExportTopLevel("EncounterData")
@JSExportAll
case class EncounterData(monsters: Seq[Monster], playingMonsterName: String, turn: Int)

object EncounterData{
  implicit val rw: RW[EncounterData] = macroRW
}
