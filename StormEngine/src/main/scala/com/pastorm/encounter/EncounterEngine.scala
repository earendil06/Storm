package com.pastorm.encounter

import com.ddmodel.Block
import com.pastorm.encounter.initiative.InitiativeEngine

class EncounterEngine(initiativeEngine: InitiativeEngine) {
  private var encounterData: EncounterData = EncounterData(Seq(), Map(), "")

  def newMonster(name: String, block: Block): Unit =
    encounterData = encounterData.copy(monsters = encounterData.monsters :+ Monster(name, block))

  def getMonsterByName(name: String): Option[Monster] = encounterData.get(name)

  def getCurrentTurnMonster: String = encounterData.playingMonsterName

  def rollInitiative(): Unit = encounterData = initiativeEngine.rollInitiative(encounterData)

  def nextTurn(): Unit = encounterData = initiativeEngine.nextTurn(encounterData)

  def getPlayingMonster: Option[Monster] = encounterData.get(encounterData.playingMonsterName)

  def setMonster(monster: Monster): Unit =
    encounterData =
      encounterData.copy(monsters = encounterData.monsters.filter(m => m.name.equals(monster.name)) :+ monster)
}
