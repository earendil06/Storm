package com.pastorm.model

import com.pastorm.model.dice.Die

import scala.scalajs.js.annotation.{JSExport, JSExportAll, JSExportTopLevel}
import upickle.default._
import upickle.default.{macroRW, ReadWriter => RW}

@JSExportAll
sealed trait StatValue {
  def formulae: String

  def meanValue: Int

  def instantiateValue: Int
}
object StatValue{
  implicit val rw: RW[StatValue] = macroRW
}

@JSExportTopLevel("ConstValue")
@JSExportAll
case class ConstValue(formulae: String, meanValue: Int) extends StatValue {
  override def instantiateValue: Int = meanValue
}
object ConstValue{
  implicit val rw: RW[ConstValue] = macroRW
}

@JSExportTopLevel("DiceValue")
@JSExportAll
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
object DiceValue{
  implicit val rw: RW[DiceValue] = macroRW
}

case class Ability(abilityType: String, score: Int, modifier: Int)
object Ability{
  implicit val rw: RW[Ability] = macroRW
}
case class Stat(statType: String, statValue: StatValue)
object Stat{
  implicit val rw: RW[Stat] = macroRW
}
case class Feature(name: String, description: String)
object Feature{
  implicit val rw: RW[Feature] = macroRW
}
@JSExportTopLevel("Action")
@JSExportAll
case class Action(name: String,
                  toHit: String,
                  reach: String,
                  range: String,
                  hit: String,
                  description: String)
object Action{
  implicit val rw: RW[Action] = macroRW
}

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
object Block{
  implicit val rw: RW[Block] = macroRW
}

@JSExportTopLevel("BlockAdapter")
class BlockAdapter() {
  @JSExport
  var block = Block("", Nil, Nil, Nil, Nil)

  @JSExport
  def setName(name: String): Unit =
    block = block.copy(name = name)

  @JSExport
  def putAbility(typeName: String, value: Int, modifier: Int): Unit =
    block = block.copy(abilityScores = Ability(typeName, value, modifier) :: block.abilityScores)

  @JSExport
  def putStat(typeName: String, statValue: StatValue): Unit =
    block = block.copy(stats = Stat(typeName, statValue) :: block.stats)

  @JSExport
  def putFeature(name: String, description: String): Unit =
    block = block.copy(features = Feature(name, description) :: block.features)

  @JSExport
  def putAction(action: Action): Unit =
    block = block.copy(actions = action :: block.actions)

  @JSExport
  def getBlock: String =
    write(block)
}