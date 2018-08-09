package com.pastorm.model
import scala.scalajs.js.annotation._
import upickle.default.{macroRW, ReadWriter => RW}

@JSExportTopLevel("Monster")
@JSExportAll
case class Monster(block: Block, name: String, hitPoints: Option[Int] = None, initiative: Option[Int] = None)

object Monster{
  implicit val rw: RW[Monster] = macroRW
}
