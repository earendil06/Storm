package com.pastorm.encounter.model

import com.storm.model.Block


case class Monster(block: Block, name: String, hitPoints: Option[Int] = None, initiative: Option[Int] = None)