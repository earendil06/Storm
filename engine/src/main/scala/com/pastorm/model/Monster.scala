package com.pastorm.model

@JSExportTopLevel("Monster")
@JSExportAll
case class Monster(block: Block, name: String, hitPoints: Option[Int] = None, initiative: Option[Int] = None)
