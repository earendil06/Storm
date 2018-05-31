package com.pastorm.encounterengine

case class EncounterData(monsters: List[Monster], initiatives: Map[String, Int], playingMonsterName: String) {

  def get(name: String): Option[Monster] = {
    monsters.find(monster => monster.name == name)
  }
}
