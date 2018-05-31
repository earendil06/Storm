package com.pastorm.encounterengine

import com.ddmodel.Block
import com.ddmodel.ability.{Ability, AbilityType}
import com.pastorm.encounterengine.dice.Die

class Encounter {
  private val d20 = new Die(20)
  private var encounterData: EncounterData = EncounterData()
  private var initiatives: Map[String, Int] = Map()

  def newMonster(name: String, block: Block): Unit =
    encounterData = EncounterData(encounterData.monsters :+ Monster(name, block), encounterData.playingMonsterName)

  def getMonsterByName(name: String): Option[Monster] = encounterData.get(name)

  def getCurrentTurnMonster: String = encounterData.playingMonsterName

  def rollInitiative(): Unit = {
    for (monster <- encounterData.monsters) {
      if (!(initiatives contains monster.name)) {
        val dexterityAbility = monster.block.getAbility(AbilityType.DEXTERITY)
          .orElse(new Ability(AbilityType.DEXTERITY, 10))
        val dexterityModifier = dexterityAbility.getModifier
        val roll = d20 roll
        val rolledInitiative = roll + dexterityModifier
        initiatives += (monster.name -> rolledInitiative)
        println(s"${monster.name} rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
      }
    }
    println(s"=> Combat order: ${initiatives.toList.sortBy(_._2).reverse.map(_._1)}")
  }

  def nextTurn(): String = {
    if (initiatives.isEmpty) {
      println("No one rolled initiative in the encounter")
      return null
    }
    val orderedInitiative = initiatives.toList.sortBy(_._2).reverse.map(_._1)
    if (encounterData.playingMonsterName == null) {
      encounterData = EncounterData(encounterData.monsters, orderedInitiative.head)
    } else {
      val index = orderedInitiative.indexOf(encounterData.playingMonsterName)
      val newIndex = index + 1
      if (newIndex >= orderedInitiative.size) {
        encounterData = EncounterData(encounterData.monsters, orderedInitiative.head)
      } else {
        encounterData = EncounterData(encounterData.monsters, orderedInitiative(newIndex))
      }
    }
    println(s"${encounterData.playingMonsterName}'s turn")
    encounterData.playingMonsterName
  }
}
