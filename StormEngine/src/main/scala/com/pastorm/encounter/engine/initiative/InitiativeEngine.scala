package com.pastorm.encounter.engine.initiative

import com.pastorm.encounter.model.EncounterData

trait InitiativeEngine {

  def rollInitiative(encounterData: EncounterData): EncounterData

  def nextTurn(encounterData: EncounterData): EncounterData
}
