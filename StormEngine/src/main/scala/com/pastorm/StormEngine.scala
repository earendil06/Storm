package com.pastorm

import com.pastorm.encounter.engine.EncounterEngine
import storm.resource.StormParser

object StormEngine {
  def main(args: Array[String]): Unit = {
    val stormParser = new StormParser
    val goblinBlock = stormParser.getBlockFromName("goblin")

    implicit val encounter: EncounterEngine = new EncounterEngine()
    showAllInfo
    encounter.newMonster("Toto", goblinBlock)
    encounter.newMonster("Glork", goblinBlock)
    showAllInfo
    encounter.rollInitiative()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()
    encounter.nextTurn()

    encounter.newMonster("Baba", goblinBlock)
    encounter.rollInitiative()

    encounter.nextTurn()
    encounter.nextTurn()

    showAllInfo
    encounter.updateMonster(encounter.damage("Toto", 2))
    encounter.nextTurn()
    showAllInfo

  }

  def showAllInfo(implicit encounterEngine: EncounterEngine): Unit = {
    val data = encounterEngine.getEncounterData
    if (data.monsters.isEmpty) return
    println()
    data.monsters
      .sortBy(_.initiative)
      .reverse
      .foreach(monster =>
        println(
          s"${monster.name}:\t HP: ${monster.hitPoints.get}, " +
            s"Initiative: ${monster.initiative.getOrElse("(not rolled)")}"))
    println()
  }

}
