package com.pastorm.encounter.engine.initiative

import com.pastorm.model.{Encounter, Monster}

trait InitiativeEngine {
  def rollInitiatives(monsters: List[Monster]): List[Monster]
  def nextTurn(encounterData: Encounter): Encounter
}
