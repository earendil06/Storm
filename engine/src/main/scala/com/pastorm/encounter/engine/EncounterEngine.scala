package com.pastorm.encounter.engine

import com.pastorm.encounter.engine.configuration.InitiativeEngineComponent
import com.pastorm.model.{Block, Encounter, Monster}

class EncounterEngine(override val encounter: Encounter) extends GameEngine(encounter: Encounter) {
  this: InitiativeEngineComponent =>

  override def newMonster(name: String, block: Block): Option[Encounter] =
    getMonsterByName(name) match {
      case Some(_) => None
      case None => Some(encounter.copy(monsters = createBaseMonster(name, block) :: encounter.monsters))
    }

  override def getMonsterByName(name: String): Option[Monster] =
    encounter.monsters.find(monster => monster.name == name)

  override def getPlayingMonsterName: String = encounter.playingMonsterName

  override def rollInitiative(): Encounter =
    encounter.copy(monsters = initiativeEngine.rollInitiatives(encounter.monsters))

  override def nextTurn(): Encounter = initiativeEngine.nextTurn(encounter)

  override def getPlayingMonster: Option[Monster] = getMonsterByName(encounter.playingMonsterName)

  override def updateMonster(monster: Monster): Encounter =
    encounter.copy(monsters = encounter.monsters.filterNot(m => m.name.equals(monster.name)) :+ monster)

  override def damage(name: String, damage: Int): Option[Encounter] =
    getMonsterByName(name) match {
      case Some(_) => Some(
        encounter.copy(monsters = encounter.monsters.map(m => m.copy(hitPoints = m.hitPoints.map(hp => hp + damage))))
      )
      case None => None
    }

  override def reset(): Encounter = Encounter(List(), "", 0)

  override def getTurn: Int = encounter.turn

  override def remove(name: String): Encounter = //todo next if encounter.playingMonsterName.equals(name)
    encounter.copy(monsters = encounter.monsters.filterNot(m => m.name.equals(name)))

  override def setInitiative(name: String, value: Int): Encounter =
    encounter.copy(monsters =
      encounter.monsters
        .filter(_.name == name)
        .map(_.copy(initiative = Some(value))))

  private def createBaseMonster(name: String, block: Block): Monster =
    Monster(block, name, hitPoints = block.findStat("hp").map(stat => stat.statValue.instantiateValue))

}
