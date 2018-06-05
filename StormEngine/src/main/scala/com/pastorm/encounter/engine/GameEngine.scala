package com.pastorm.encounter.engine

import com.ddmodel.Block
import com.pastorm.encounter.model.{EncounterData, Monster}

trait GameEngine {

  def newMonster(name: String, block: Block): Unit

  def getEncounterData: EncounterData

  def getMonsterByName(name: String): Option[Monster]

  def getCurrentTurnMonster: String

  def rollInitiative(): Unit

  def nextTurn(): Unit

  def getPlayingMonster: Monster

  def updateMonster(monster: Monster): Unit

  def damage(name: String, damage: Int): Monster
}
