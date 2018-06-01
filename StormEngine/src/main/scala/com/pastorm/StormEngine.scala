package com.pastorm

import com.ddmodel.stat.{ConstValue, Stat, StatType}
import com.pastorm.encounter.{EncounterEngine, Monster}
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
    println(encounter.getPlayingMonster)
    val damaged = encounter.getPlayingMonster.get
    damaged.block.putStat(new Stat(StatType.HIT_POINTS, new ConstValue(damaged.block.getStat(StatType.HIT_POINTS).get().getStatValue.getScore - 2)))
    encounter.setMonster(damaged)
    println(encounter.getPlayingMonster)
  }

}
