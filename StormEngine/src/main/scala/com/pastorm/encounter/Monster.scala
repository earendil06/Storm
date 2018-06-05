package com.pastorm.encounter

import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

import com.ddmodel.Block
import com.ddmodel.stat.StatType

case class Monster(block: Block, name: String,
                   hitPoints: Option[Int] = None,
                   initiative: Option[Int] = None) {

  def damage(damage: Int): Monster = this.copy(hitPoints = hitPoints.map(hp => hp - damage))
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
