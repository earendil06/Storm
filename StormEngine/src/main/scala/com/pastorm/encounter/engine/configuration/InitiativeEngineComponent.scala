package com.pastorm.encounter.engine.configuration

import com.pastorm.encounter.engine.initiative.InitiativeEngine

trait InitiativeEngineComponent {
  val initiativeEngine: InitiativeEngine
}

