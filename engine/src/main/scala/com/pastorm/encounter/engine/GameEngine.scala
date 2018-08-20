package com.pastorm.encounter.engine

import com.pastorm.model.{Block, Encounter, Monster}

abstract class GameEngine(val encounter: Encounter) {

  def newMonster(name: String, block: Block): Option[Encounter]

  def getMonsterByName(name: String): Option[Monster]

  def getPlayingMonsterName: String

  def rollInitiative(): Encounter

  def nextTurn(): Encounter

  def getPlayingMonster: Option[Monster]

  def updateMonster(monster: Monster): Encounter

  def damage(name: String, damage: Int): Option[Encounter]

  def reset(): Encounter

  def getTurn: Int

  def remove(name: String): Encounter

  def setInitiative(name: String, value: Int): Encounter

}
