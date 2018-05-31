package com.pastorm.encounterengine

case class EncounterData(monsters: List[Monster] = List(), playingMonsterName: String = null) {

  def get(name: String): Option[Monster] = {
    monsters.find(monster => monster.name == name)
  }
}
