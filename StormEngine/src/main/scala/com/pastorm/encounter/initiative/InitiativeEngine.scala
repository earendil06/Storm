package com.pastorm.encounter.initiative

import com.pastorm.encounter.EncounterData

trait InitiativeEngine {

  def rollInitiative(encounterData: EncounterData): EncounterData

  def nextTurn(encounterData: EncounterData): EncounterData
}
