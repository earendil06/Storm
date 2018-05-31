package pastorm.stormlanguage.encounterengine

import com.ddmodel.Block
import com.ddmodel.ability.{Ability, AbilityType}
import pastorm.stormlanguage.encounterengine.dice.Die

class Encounter {
  private val d20 = new Die(20)
  private var monsters: Map[String, Block] = Map()
  private var initiatives: Map[String, Int] = Map()
  private var currentTurnMonster: String = _

  def newMonster(name: String, block: Block): Unit = monsters += (name -> block)

  def getMonsterByName(name: String): Option[Block] = monsters get name

  def getCurrentTurnMonster: String = currentTurnMonster

  def rollInitiative(): Unit = {
    for ((name, block) <- monsters) {
      if (!(initiatives contains name)) {
        val dexterityAbility = block.getAbility(AbilityType.DEXTERITY)
          .orElse(new Ability(AbilityType.DEXTERITY, 10))
        val dexterityModifier = dexterityAbility.getModifier
        val roll = d20 roll
        val rolledInitiative = roll + dexterityModifier
        initiatives += (name -> rolledInitiative)
        println(s"$name rolled $rolledInitiative (base:$dexterityModifier + roll:$roll)")
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
    if (currentTurnMonster == null) {
      currentTurnMonster = orderedInitiative.head
    } else {
      val index = orderedInitiative.indexOf(currentTurnMonster)
      val newIndex = index + 1
      if (newIndex >= orderedInitiative.size) {
        currentTurnMonster = orderedInitiative head
      } else {
        currentTurnMonster = orderedInitiative(newIndex)
      }
    }
    println(s"$currentTurnMonster's turn")
    currentTurnMonster
  }
}
