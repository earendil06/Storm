package com.storm.model.dice

trait Rollable[T] {
  def roll:T
}