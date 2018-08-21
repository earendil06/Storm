package com.pastorm.encounter.engine.configuration

import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.initiative.DefaultInitiativeEngine
import com.pastorm.model.Encounter

import scala.scalajs.js.annotation.{JSExport, JSExportTopLevel}

@JSExportTopLevel("EncounterEngineComponent")
object EncounterEngineComponent {
  @JSExport
  def encounterEngine(encounter: Encounter): EncounterEngine = new EncounterEngine(encounter) with InitiativeEngineComponent {
    val initiativeEngine = new DefaultInitiativeEngine()
  }
}
