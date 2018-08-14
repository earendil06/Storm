package com.pastorm.encounter.engine

import com.pastorm.model.{Block, EncounterData, Monster}

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

  def reset(): Unit

  def getTurn: Int

  def remove(name: String): Unit

  def setInitiative(name: String, value: Int): Option[Monster]

  def setEncounter(newEncounter: EncounterData): Unit
}
