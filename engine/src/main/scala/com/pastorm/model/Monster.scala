package com.pastorm.model

case class Monster(block: Block, name: String, hitPoints: Option[Int] = None, initiative: Option[Int] = None)