package com.pastorm.encounter.model

import com.ddmodel.Block
import com.ddmodel.stat.StatType
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

case class Monster(block: Block,
                   name: String,
                   hitPoints: Option[Int] = None,
                   initiative: Option[Int] = None) {

  def damage(damage: Int): Monster = {
    println(s"$name took $damage damage")
    this.copy(hitPoints = hitPoints.map(hp => hp - damage))
  }
}

object Monster {
  def apply(block: Block, name: String): Monster =
    new Monster(
      block,
      name,
      hitPoints = Option(block.getStat(StatType.HIT_POINTS)
        .orElseThrow(IllegalArgumentSupplier(s"Missing HP for ${block.getName}"))
        .getStatValue.instanciateValue))

}
