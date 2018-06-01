package com.pastorm.encounter.dice

import java.security.SecureRandom

class Die (val sides:Int) extends Rollable[Int] {

  val randy = new SecureRandom()
  def roll:Int = randy.nextInt(sides) + 1
  override def toString:String = "d" + sides
}
