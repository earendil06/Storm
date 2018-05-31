package com.storm

import com.ddmodel.Block
import com.storm.encounterengine.Encounter
import storm.resource.StormParser

object Main {
  def main(args: Array[String]): Unit = {
    val stormParser = new StormParser
    val goblinBlock: Block = stormParser.getBlockFromName("goblin")

    val encounter: Encounter = new Encounter
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
