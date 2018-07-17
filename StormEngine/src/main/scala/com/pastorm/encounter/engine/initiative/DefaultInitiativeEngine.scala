package com.pastorm.encounter.engine.initiative

import com.pastorm.encounter.model.{EncounterData, Monster}
import com.storm.model.dice.Die

class DefaultInitiativeEngine extends InitiativeEngine {
  private val d20 = new Die(20)

  override def rollInitiatives(monsters: Seq[Monster]): Seq[Monster] =
    monsters
      .map(monster => if (monster.initiative.isEmpty) rollInitiative(monster) else monster)
      .sortWith((l, r) => {
        if (l.initiative == r.initiative) {
          l.name < r.name
        } else {
          l.initiative.get < r.initiative.get
        }
      })
      .reverse

  def rollInitiative(monster: Monster): Monster = {
    val dexterityModifier = monster.block.findAbility("dex").map(_.modifier).get
    val roll = d20.roll
    val rolledInitiative = roll + dexterityModifier
    println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
    monster.copy(initiative = Some(rolledInitiative))
  }

  override def nextTurn(encounterData: EncounterData): EncounterData = {
    var resultEncounterData = encounterData
    val orderedInitiative = encounterData.monsters
      .filter(_.initiative.nonEmpty)
      .sortWith((l, r) => {
        if (l.initiative == r.initiative) {
          l.name < r.name
        } else {
          l.initiative.get < r.initiative.get
        }
      })
      .reverse
      .map(monster => monster.name)
    if (orderedInitiative.isEmpty) {
      println("No one rolled initiative in the encounter")
      return resultEncounterData
    }
    if (encounterData.playingMonsterName.isEmpty) {
      resultEncounterData = encounterData.copy(playingMonsterName = orderedInitiative.head)
    } else {
      val next = orderedInitiative.indexOf(encounterData.playingMonsterName) + 1
      if (next >= orderedInitiative.size) {
        resultEncounterData = encounterData.copy(playingMonsterName = orderedInitiative.head)
      } else {
        resultEncounterData = encounterData.copy(playingMonsterName = orderedInitiative(next))
      }
    }
    resultEncounterData.copy(turn = resultEncounterData.turn + 1)
  }

}
