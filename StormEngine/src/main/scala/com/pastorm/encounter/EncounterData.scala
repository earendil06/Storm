package com.pastorm.encounter


case class EncounterData(monsters: Seq[Monster], playingMonsterName: String) {

  def get(name: String): Option[Monster] = {
    monsters.find(monster => monster.name == name)
  }
}
