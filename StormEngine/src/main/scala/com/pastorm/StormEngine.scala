package com.pastorm

import com.pastorm.accessors.{LocalAccessor, ServerAccessor}
import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

object StormEngine {
  def main(args: Array[String]): Unit = {
    val accessor = new LocalAccessor
    val goblinBlock = accessor.getBlockByName("goblin").orElseThrow(IllegalArgumentSupplier("the block could not be found"))

    implicit val encounter: EncounterEngine = EncounterEngineComponent.encounterEngine

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
