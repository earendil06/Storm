package com.pastorm.encounter.engine

import com.ddmodel.Block
import com.pastorm.encounter.model.{EncounterData, Monster}

trait GameEngine {

  def newMonster(name: String, block: Block): Unit

  def getEncounterData: EncounterData

  def getMonsterByName(name: String): Option[Monster]

  def getPlayingMonsterName: String

  def rollInitiative(): Unit

  def nextTurn(): Unit

  def getPlayingMonster: Option[Monster]

  def updateMonster(monster: Monster): Unit

  def damage(name: String, damage: Int): Option[Monster]
}
