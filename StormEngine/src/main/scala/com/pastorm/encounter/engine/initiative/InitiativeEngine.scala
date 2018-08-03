package com.pastorm.encounter.engine.initiative

import com.pastorm.model.{EncounterData, Monster}

trait InitiativeEngine {
  def rollInitiatives(monsters: Seq[Monster]): Seq[Monster]
  def nextTurn(encounterData: EncounterData): EncounterData
}
