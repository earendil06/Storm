package com.pastorm.encounter.initiative

import com.ddmodel.ability.AbilityType
import com.pastorm.encounter.EncounterData
import com.pastorm.encounter.dice.Die
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

class DefaultInitiativeEngine() extends InitiativeEngine {
  private val d20 = new Die(20)

  override def rollInitiative(encounterData: EncounterData): EncounterData = {
    var resultMonsters = encounterData.monsters
    for (monster <- encounterData.monsters if monster.initiative isEmpty) {
      val dexterityAbility = monster.block.getAbility(AbilityType.DEXTERITY)
        .orElseThrow(IllegalArgumentSupplier(s"${monster.name} does not have a dexterity ability."))
      val dexterityModifier = dexterityAbility.getModifier
      val roll = d20 roll
      val rolledInitiative = roll + dexterityModifier
      println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
      resultMonsters =
        resultMonsters.filter(_.name != monster.name) :+ monster.copy(initiative = Some(rolledInitiative))
    }
    println(s"=> Combat order: ${
      resultMonsters
        .sortBy(_.initiative)
        .reverse
        .map(monster => s"${monster.name} (${monster.initiative})")
        .reduce((a, b) => a + ", " + b)
    }")
    encounterData.copy(monsters = resultMonsters)
  }

  override def nextTurn(encounterData: EncounterData): EncounterData = {
    var resultEncounterData = encounterData
    val initiatives = encounterData.monsters.map(monster => (monster.name, monster.initiative))
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
    resultEncounterData
  }

}
