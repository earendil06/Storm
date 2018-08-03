package com.storm.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import com.pastorm.model.EncounterData
import com.storm.model._
import spray.json.{DefaultJsonProtocol, JsValue, RootJsonFormat, _}

final case class NewMonster(name: String, blockName: String)
final case class DamageMonster(name: String, damage: String)
final case class SetJson(name: String, value: String)
final case class StormToBlock(storm: String)

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val ability: RootJsonFormat[Ability] = jsonFormat3(Ability)
  implicit val action: RootJsonFormat[Action] = jsonFormat6(Action)
  implicit val feature: RootJsonFormat[Feature] = jsonFormat2(Feature)

  implicit val constValue: RootJsonFormat[ConstValue] = jsonFormat2(ConstValue)
  implicit val diceValue: RootJsonFormat[DiceValue] = jsonFormat3(DiceValue)

  implicit object statValue extends RootJsonFormat[StatValue] {
    override def write(obj: StatValue): JsValue = obj match {
      case c: ConstValue => c.toJson
      case d: DiceValue => ConstValue(d.formulae, d.meanValue).toJson
    }

    override def read(json: JsValue): StatValue = json.convertTo[ConstValue]
  }

  implicit val stat: RootJsonFormat[Stat] = jsonFormat2(Stat)

  implicit val monsterBlockFormat: RootJsonFormat[Block] = jsonFormat5(Block)
  implicit val monsterFormat: RootJsonFormat[com.pastorm.model.Monster] = jsonFormat4(Monster)
  implicit val encounterFormat: RootJsonFormat[EncounterData] = jsonFormat3(EncounterData)

  implicit val newMonsterFormat: RootJsonFormat[NewMonster] = jsonFormat2(NewMonster)
  implicit val damageMonsterFormat: RootJsonFormat[DamageMonster] = jsonFormat2(DamageMonster)
  implicit val setJsonFormat: RootJsonFormat[SetJson] = jsonFormat2(SetJson)
  implicit val stormToBlockFormat: RootJsonFormat[StormToBlock] = jsonFormat1(StormToBlock)
}
