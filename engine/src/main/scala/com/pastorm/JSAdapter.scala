package com.pastorm

import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.pastorm.model.{Block, BlockAdapter, EncounterData, Monster}

import scala.scalajs.js.annotation.{JSExport, JSExportTopLevel}

@JSExportTopLevel("JSAdapter")
class JSAdapter {
  val engine: EncounterEngine = EncounterEngineComponent.encounterEngine

  @JSExport
  //todo
  def newMonster(name: String, adapter: BlockAdapter): Unit =
    engine.newMonster(name, adapter.block)

  @JSExport
  //todo
  def getEncounterData: EncounterData =
    engine.getEncounterData

  @JSExport
  //todo
  def getMonsterByName(name: String): Option[Monster] =
    engine.getMonsterByName(name)

  @JSExport
  def getPlayingMonsterName: String =
    engine.getPlayingMonsterName

  @JSExport
  def rollInitiative(): Unit =
    engine.rollInitiative()

  @JSExport
  def nextTurn(): Unit =
    engine.nextTurn()

  @JSExport
  //todo
  def getPlayingMonster: Option[Monster] =
    engine.getPlayingMonster

  @JSExport
  //todo
  def updateMonster(monster: Monster): Unit =
    engine.updateMonster(monster)

  @JSExport
  def damage(name: String, damage: Int): Option[Monster] =
    engine.damage(name, damage)

  @JSExport
  def reset(): Unit =
    engine.reset()

  @JSExport
  def getTurn: Int =
    engine.getTurn

  @JSExport
  def remove(name: String): Unit =
    engine.remove(name)

  @JSExport
  //todo
  def setInitiative(name: String, value: Int): Option[Monster] =
    engine.setInitiative(name, value)
}
