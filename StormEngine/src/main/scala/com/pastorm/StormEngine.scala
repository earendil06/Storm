package com.pastorm

import com.pastorm.encounter.EncounterEngine
import com.pastorm.encounter.initiative.DefaultInitiativeEngine
import storm.resource.StormParser

object StormEngine {
  def main(args: Array[String]): Unit = {
    val stormParser = new StormParser
    val goblinBlock = stormParser.getBlockFromName("goblin")

    val encounter: EncounterEngine = new EncounterEngine(new DefaultInitiativeEngine)
    encounter.newMonster("Toto", goblinBlock)
    encounter.newMonster("Glork", goblinBlock)

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
    println(encounter.getPlayingMonster.hitPoints.get)
    val damaged = encounter.getPlayingMonster
    val n = damaged.damage(2)
    encounter.updateMonster(n)
    println(encounter.getPlayingMonster.hitPoints.get)
  }

}
