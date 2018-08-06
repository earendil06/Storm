package com.pastorm.model

import scala.scalajs.js
import scala.scalajs.js.annotation.{JSExport, JSExportAll, JSExportTopLevel}

@JSExportAll
case class Monster(block: Block, name: String, hitPoints: Option[Int] = None, initiative: Option[Int] = None)

@JSExportTopLevel("Monster")
object Monster {
  @JSExport
  def fromJS(adapter: BlockAdapter,
             name: String,
             hitPoints: js.UndefOr[Int] = js.undefined,
             initiative: js.UndefOr[Int] = js.undefined): Monster =
    Monster(adapter.block, name, hitPoints.toOption, initiative.toOption)
}
