package com.pastorm.model

import com.pastorm.model.dice.Die

sealed trait StatValue {
  def formulae: String

  def meanValue: Int

  def instantiateValue: Int
}

case class ConstValue(formulae: String, meanValue: Int) extends StatValue {
  override def instantiateValue: Int = meanValue
}

case class DiceValue(number: Int, sides: Int, modifier: Int) extends StatValue {
  override def instantiateValue: Int = {
    val die = new Die(sides)
    var acc = modifier
    for (_ <- 0 until number) {
      acc += die.roll
    }
    acc
  }

  override def meanValue: Int = {
    val facesUp : Double = sides + 1
    val div : Double = facesUp / 2
    val res : Double = number * div + modifier
    res.toInt
  }

  override def formulae: String = {
    val modifierFormat = s"${if (modifier > 0) "+" else "-"}$modifier"
    s"${number}d$sides${if (modifier != 0) modifierFormat else ""}"
  }
}

case class Ability(abilityType: String, score: Int, modifier: Int)

case class Stat(statType: String, statValue: StatValue)

case class Feature(name: String, description: String)

case class Action(name: String,
                  toHit: String,
                  reach: String,
                  range: String,
                  hit: String,
                  description: String)

case class Block(name: String,
                 abilityScores: List[Ability],
                 stats: List[Stat],
                 features: List[Feature],
                 actions: List[Action]) {
  //todo find by enum
  def findStat(statType: String): Option[Stat] =
    stats.find(s => s.statType.equals(statType.toLowerCase))
  //todo find by enum
  def findAbility(abilityType: String): Option[Ability] =
    abilityScores.find(a => a.abilityType.equals(abilityType.toLowerCase))

}

class BlockAdapter() {
  var block = Block("", Nil, Nil, Nil, Nil)

  def setName(name: String): Unit =
    block = block.copy(name = name)

  def putAbility(typeName: String, value: Int, modifier: Int): Unit =
    block = block.copy(abilityScores = Ability(typeName, value, modifier) :: block.abilityScores)

  def putStat(typeName: String, statValue: StatValue): Unit =
    block = block.copy(stats = Stat(typeName, statValue) :: block.stats)

  def putFeature(name: String, description: String): Unit =
    block = block.copy(features = Feature(name, description) :: block.features)

  def putAction(action: Action): Unit =
    block = block.copy(actions = action :: block.actions)
}