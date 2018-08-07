package com.pastorm.model

@JSExportTopLevel("EncounterData")
@JSExportAll
case class EncounterData(monsters: Seq[Monster], playingMonsterName: String, turn: Int)
