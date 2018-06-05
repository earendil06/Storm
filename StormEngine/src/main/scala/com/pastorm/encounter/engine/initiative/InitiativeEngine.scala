package com.pastorm.encounter.engine.initiative

import com.pastorm.encounter.model.{EncounterData, Monster}

trait InitiativeEngine {
  def rollInitiative(monsters: Seq[Monster]): Seq[Monster]
  def nextTurn(encounterData: EncounterData): EncounterData
}
