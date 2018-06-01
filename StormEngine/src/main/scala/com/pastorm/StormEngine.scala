package com.pastorm

import com.pastorm.encounterengine.{Encounter, InitiativeEngine}
import storm.resource.StormParser

object StormEngine {
  def main(args: Array[String]): Unit = {
    val stormParser = new StormParser
    val goblinBlock = stormParser.getBlockFromName("goblin")

    val encounter: Encounter = new Encounter(new InitiativeEngine)
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
  }

}
