package com.pastorm.encounter.engine

import com.ddmodel.Block
import com.pastorm.encounter.engine.initiative.DefaultInitiativeEngine
import com.pastorm.encounter.model.{EncounterData, Monster}

class EncounterEngine() extends GameEngine with DefaultInitiativeEngine {
  private var encounterData: EncounterData = EncounterData(Seq(), "")

  override def newMonster(name: String, block: Block): Unit =
    encounterData = encounterData.copy(monsters = encounterData.monsters :+ Monster(block, name))

  override def getEncounterData: EncounterData = encounterData

  override def getMonsterByName(name: String): Option[Monster] = encounterData.get(name)

  override def getCurrentTurnMonster: String = encounterData.playingMonsterName

  override def rollInitiative(): Unit = encounterData = rollInitiative(encounterData)

  override def nextTurn(): Unit = encounterData = nextTurn(encounterData)

  override def getPlayingMonster: Monster = encounterData.get(encounterData.playingMonsterName)
    .getOrElse(throw new IllegalArgumentException(
      s"${encounterData.playingMonsterName} is the playing monster but does not exists in the encounter."))

  override def updateMonster(monster: Monster): Unit =
    encounterData =
      encounterData.copy(monsters = encounterData.monsters.filter(m => !m.name.equals(monster.name)) :+ monster)
}
