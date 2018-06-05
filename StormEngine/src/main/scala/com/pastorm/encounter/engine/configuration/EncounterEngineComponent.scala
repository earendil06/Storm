package com.pastorm.encounter.engine.configuration

import com.pastorm.encounter.engine.EncounterEngine
import com.pastorm.encounter.engine.initiative.DefaultInitiativeEngine

object EncounterEngineComponent {
  val encounterEngine: EncounterEngine = new EncounterEngine with InitiativeEngineComponent {
    val initiativeEngine = new DefaultInitiativeEngine()
  }
}
