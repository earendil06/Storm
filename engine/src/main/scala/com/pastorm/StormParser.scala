package com.pastorm

import cats.syntax.either._
import com.pastorm.model.Block
import io.circe._
import io.circe.generic.auto._
import io.circe.yaml

object StormParser {
  def main(args: Array[String]) {

    val json = new StormParser().parseYml("""

""")

    println(json.name)
  }
}


class StormParser {
  def parseYml(input: String) : Block = {
    val json = yaml.parser.parse(input)
    val foo = json
      .leftMap(err => err: Error)
      .flatMap(_.as[Block])
      .valueOr(throw _)
    foo
  }
}

