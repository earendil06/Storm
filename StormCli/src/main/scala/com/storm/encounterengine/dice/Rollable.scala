package com.storm.encounterengine.dice

trait Rollable[T] {
  def roll:T
}