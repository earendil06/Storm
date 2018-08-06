package com.pastorm.model

import scala.scalajs.js.annotation.JSExportAll

@JSExportAll
case class EncounterData(monsters: Seq[Monster], playingMonsterName: String, turn: Int)