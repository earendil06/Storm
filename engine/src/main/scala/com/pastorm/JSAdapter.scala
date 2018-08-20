package com.pastorm

import scala.scalajs.js.annotation._
import com.pastorm.encounter.engine.GameEngine
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent
import com.pastorm.model.{BlockAdapter, Encounter, Monster}
import org.scalajs.dom
import upickle.default._

@JSExportTopLevel("JSAdapter")
class JSAdapter {
  var engine: GameEngine = EncounterEngineComponent.encounterEngine(Encounter(List(), "", 0))

  def withLocalData(encounter: => Option[Encounter]): Unit = {
    updateFromLocal()
    saveOptionToLocal(encounter)
    updateFromLocal()
  }

  def saveOptionToLocal(encounter: Option[Encounter]): Unit =
    encounter.foreach(e => dom.window.localStorage.setItem("serial/encounter", write(e)))

  @JSExport
  def updateFromLocal(): Unit = {
    val encounter = dom.window.localStorage.getItem("serial/encounter")
    if (encounter != null && encounter != "") {
      val restored = read[Encounter](encounter)
      this.engine = EncounterEngineComponent.encounterEngine(restored)
    }
  }

  @JSExport //todo try with read instead of blockAdapter
  def newMonster(name: String, adapter: BlockAdapter): Unit = withLocalData {
    engine.newMonster(name, adapter.block)
  }

  @JSExport
  def rollInitiative(): Unit = withLocalData {
    Some(engine.rollInitiative())
  }

  @JSExport
  def nextTurn(): Unit = withLocalData {
    Some(engine.nextTurn())
  }

  @JSExport
  def updateMonster(monster: String): Unit = withLocalData {
    Some(engine.updateMonster(read[Monster](monster)))
  }

  @JSExport
  def damage(name: String, damage: Int): Unit = withLocalData {
    engine.damage(name, damage)
  }

  @JSExport
  def reset(): Unit = withLocalData {
    Some(engine.reset())
  }

  @JSExport
  def remove(name: String): Unit = withLocalData {
    Some(engine.remove(name))
  }

  @JSExport
  def setInitiative(name: String, value: Int): Unit = withLocalData {
    Some(engine.setInitiative(name, value))
  }

  // Below only getters

  @JSExport
  def getPlayingMonsterName: String = {
    updateFromLocal()
    engine.getPlayingMonsterName
  }

  @JSExport
  def getPlayingMonster: String = {
    updateFromLocal()
    write(engine.getPlayingMonster)
  }

  @JSExport
  def getTurn: Int = {
    updateFromLocal()
    engine.getTurn
  }

  @JSExport
  def getEncounterData: String = {
    updateFromLocal()
    write(engine.encounter)
  }

  @JSExport
  def getMonsterByName(name: String): String = {
    updateFromLocal()
    write(engine.getMonsterByName(name))
  }
}
