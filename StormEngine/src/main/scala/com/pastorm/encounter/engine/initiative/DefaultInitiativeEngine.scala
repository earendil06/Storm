package com.pastorm.encounter.engine.initiative

import com.ddmodel.ability.AbilityType
import com.pastorm.encounter.dice.Die
import com.pastorm.encounter.model.{EncounterData, Monster}
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

import scala.collection.mutable

class DefaultInitiativeEngine extends InitiativeEngine {
  private val d20 = new Die(20)

  override def rollInitiatives(monsters: Seq[Monster]): Seq[Monster] = {
    val monstersWithInitiative: Seq[Monster] = for {
      monster <- monsters
      result = if (monster.initiative.isEmpty) rollInitiative(monster) else monster
    } yield result
    monstersWithInitiative
  }

  def rollInitiative(monster: Monster): Monster = {
    val dexterityModifier = monster.block.getAbility(AbilityType.DEXTERITY)
      .orElseThrow(IllegalArgumentSupplier(s"${monster.name} does not have a dexterity ability."))
      .getModifier
    val roll = d20.roll
    val rolledInitiative = roll + dexterityModifier
    println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
    monster.copy(initiative = Some(rolledInitiative))
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
