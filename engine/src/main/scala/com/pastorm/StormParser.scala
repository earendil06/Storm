package com.pastorm

import java.nio.file.Paths

import cats.syntax.either._
import com.google.gson.Gson
import com.pastorm.model.Block
import io.circe.generic.auto._
import io.circe.yaml
import io.circe.yaml.syntax._

object StormParser {
  def main(args: Array[String]) {
    val path = Paths.get("block.yml")

    val stringFromFile = new String(java.nio.file.Files.readAllBytes(path))
    val blockOption = new StormParser().parseYml(stringFromFile)
    val block = blockOption.get
    val ymlSerialized = new StormParser().serializeToYml(block)
    println(ymlSerialized)
  }
}


class StormParser {
  def parseYml(input: String): Option[Block] = yaml.parser.parse(input).flatMap(_.as[Block]).toOption

  def serializeToYml(block: Block): String = io.circe.jawn.parse(new Gson().toJson(block)).valueOr(throw _).asYaml.spaces2

}

