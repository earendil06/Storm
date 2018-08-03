package com.pastorm.encounter.engine.configuration

import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.initiative.DefaultInitiativeEngine

@JSExportTopLevel("EncounterEngineComponent")
object EncounterEngineComponent {
  @JSExport
  val encounterEngine: EncounterEngine = new EncounterEngine with InitiativeEngineComponent {
    val initiativeEngine = new DefaultInitiativeEngine()
  }
}
