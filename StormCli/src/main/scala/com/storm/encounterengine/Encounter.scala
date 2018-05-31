package com.storm.encounterengine

import com.ddmodel.Block
import com.ddmodel.ability.{Ability, AbilityType}
import com.storm.encounterengine.dice.Die

class Encounter {
  val d20 = new Die(20)
  var monsters: Map[String, Block] = Map()
  var initiatives: Map[String, Int] = Map()

  def newMonster(name: String, block: Block): Unit = monsters += (name -> block)

  def getMonsterByName(name: String): Option[Block] = monsters get name

  def rollInitiative(): Unit = {
    for ((name, block) <- monsters) {
      if (!(initiatives contains name)) {
        val dexterityAbility = block.getAbility(AbilityType.DEXTERITY)
          .orElse(new Ability(AbilityType.DEXTERITY, 10))
        val dexterityModifier = dexterityAbility.getModifier
        val roll = d20.roll
        val rolledInitiative = roll + dexterityModifier
        initiatives += (name -> rolledInitiative)
        println(s"$name rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
      }
      println(s"Combat order: $initiatives")
    }
  }
}
