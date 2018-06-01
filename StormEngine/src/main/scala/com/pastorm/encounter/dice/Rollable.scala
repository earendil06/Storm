package com.pastorm.encounter.dice

trait Rollable[T] {
  def roll:T
}