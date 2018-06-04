package com.pastorm.encounterengine

import com.ddmodel.Block
import com.pastorm.encounter.initiative.InitiativeEngine
import com.pastorm.encounter.{EncounterData, Monster}

class Encounter(initiativeEngine: InitiativeEngine) {
  private var encounterData: EncounterData = EncounterData(Seq(), Map(), "")

  def newMonster(name: String, block: Block): Unit =
    encounterData = encounterData.copy(monsters = encounterData.monsters :+ Monster(name, block))

  def getMonsterByName(name: String): Option[Monster] = encounterData.get(name)

  def getCurrentTurnMonster: String = encounterData.playingMonsterName

  def rollInitiative(): Unit = encounterData = initiativeEngine.rollInitiative(encounterData)

  def nextTurn(): Unit = encounterData = initiativeEngine.nextTurn(encounterData)

}
