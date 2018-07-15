package com.pastorm.encounter.engine.initiative

import com.pastorm.encounter.dice.Die
import com.pastorm.encounter.model.{EncounterData, Monster}

class DefaultInitiativeEngine extends InitiativeEngine {
  private val d20 = new Die(20)

  override def rollInitiatives(monsters: Seq[Monster]): Seq[Monster] = {
    monsters.map(monster => if (monster.initiative.isEmpty) rollInitiative(monster) else monster)
  }

  def rollInitiative(monster: Monster): Monster = {
    val dexterityModifier = monster.block.findAbility("dex").map(_.modifier).get
    val roll = d20.roll
    val rolledInitiative = roll + dexterityModifier
    println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
    monster.copy(initiative = Some(rolledInitiative))
  }

  override def nextTurn(encounterData: EncounterData): EncounterData = {
    var resultEncounterData = encounterData
    val initiatives = encounterData.monsters
      .filter(_.initiative.nonEmpty)
      .map(monster => (monster.name, monster.initiative))
    if (initiatives.isEmpty) {
      println("No one rolled initiative in the encounter")
      return resultEncounterData
    }
    val orderedInitiative = initiatives.sortBy(_._2).reverse.map(_._1)
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
    println(s"${resultEncounterData.playingMonsterName}'s turn")
    resultEncounterData.copy(turn = resultEncounterData.turn + 1)
  }

}
