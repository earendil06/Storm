package com.pastorm.model.dice

trait Rollable[T] {
  def roll:T
}