package com.pastorm.encounterengine.dice

trait Rollable[T] {
  def roll:T
}