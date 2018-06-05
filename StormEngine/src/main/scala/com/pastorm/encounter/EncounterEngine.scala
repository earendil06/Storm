package com.pastorm.encounter

import com.ddmodel.Block
import com.pastorm.encounter.initiative.InitiativeEngine

class EncounterEngine(initiativeEngine: InitiativeEngine) {
  private var encounterData: EncounterData = EncounterData(Seq(), "")

  def newMonster(name: String, block: Block): Unit =
    encounterData = encounterData.copy(monsters = encounterData.monsters :+ Monster(block, name))

  def getMonsterByName(name: String): Option[Monster] = encounterData.get(name)

  def getCurrentTurnMonster: String = encounterData.playingMonsterName

  def rollInitiative(): Unit = encounterData = initiativeEngine.rollInitiative(encounterData)

  def nextTurn(): Unit = encounterData = initiativeEngine.nextTurn(encounterData)

  def getPlayingMonster: Monster = encounterData.get(encounterData.playingMonsterName)
    .getOrElse(throw new IllegalArgumentException(
      s"${encounterData.playingMonsterName} is the playing monster but does not exists in the encounter."))

  def updateMonster(monster: Monster): Unit =
    encounterData =
      encounterData.copy(monsters = encounterData.monsters.filter(m => !m.name.equals(monster.name)) :+ monster)
}
