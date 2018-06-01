package com.pastorm.encounterengine

import com.ddmodel.ability.{Ability, AbilityType}
import com.pastorm.encounterengine.dice.Die

class InitiativeEngine() {
  private val d20 = new Die(20)

  def rollInitiative(encounterData: EncounterData): EncounterData = {
    var resultInitiatives = encounterData.initiatives
    for (monster <- encounterData.monsters if !(resultInitiatives contains monster.name)) {
      val dexterityAbility = monster.block.getAbility(AbilityType.DEXTERITY)
        .orElse(new Ability(AbilityType.DEXTERITY, 10))
      val dexterityModifier = dexterityAbility.getModifier
      val roll = d20 roll
      val rolledInitiative = roll + dexterityModifier
      println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
      resultInitiatives += (monster.name -> rolledInitiative)
    }
    println(s"=> Combat order: ${resultInitiatives.toList.sortBy(_._2).reverse.map(_._1)}")
    encounterData.copy(initiatives = resultInitiatives)
  }

  def nextTurn(encounterData: EncounterData): EncounterData = {
    var resultEncounterData = encounterData
    val initiatives = encounterData.initiatives
    if (initiatives.isEmpty) {
      println("No one rolled initiative in the encounter")
      return resultEncounterData
    }
    val orderedInitiative = initiatives.toList.sortBy(_._2).reverse.map(_._1)
    if (encounterData.playingMonsterName == null) {
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
    resultEncounterData
  }
}
