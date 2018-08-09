package com.pastorm.model.dice

import scala.util.Random

class Die (val sides:Int) extends Rollable[Int] {

  val randy = new Random()
  def roll:Int = randy.nextInt(sides) + 1
  override def toString:String = "d" + sides
}
