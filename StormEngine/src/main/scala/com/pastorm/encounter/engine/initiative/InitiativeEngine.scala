package com.pastorm.encounter.engine.initiative

import com.pastorm.encounter.engine.GameEngine
import com.pastorm.encounter.model.EncounterData

trait InitiativeEngine extends GameEngine {

  def rollInitiative(encounterData: EncounterData): EncounterData

  def nextTurn(encounterData: EncounterData): EncounterData
}
