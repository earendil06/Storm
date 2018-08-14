package com.pastorm
import scala.scalajs.js.annotation._
import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.pastorm.model.{Block, BlockAdapter, EncounterData, Monster}
import upickle.default._

@JSExportTopLevel("JSAdapter")
class JSAdapter {
  val engine: EncounterEngine = EncounterEngineComponent.encounterEngine

  @JSExport
  def newMonster(name: String, adapter: BlockAdapter): Unit =
    engine.newMonster(name, adapter.block)

  @JSExport
  def getEncounterData: String =
    write(engine.getEncounterData)

  @JSExport
  def getMonsterByName(name: String): String =
    write(engine.getMonsterByName(name))

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
  def getPlayingMonster: String =
    write(engine.getPlayingMonster)

  @JSExport
  def updateMonster(monster: String): Unit =
    engine.updateMonster(read[Monster](monster))

  @JSExport
  def damage(name: String, damage: Int): String =
    write(engine.damage(name, damage))

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
  def setInitiative(name: String, value: Int): String =
    write(engine.setInitiative(name, value))

  @JSExport
  def setEncounter(newEncounter: String): Unit =
    engine.setEncounter(read[EncounterData](newEncounter))
}
