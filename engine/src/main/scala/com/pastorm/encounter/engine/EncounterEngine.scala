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

  def updateMonsterAttribute(name: String, attributeModifierFunction: Monster => Monster): Encounter =
    encounter.copy(monsters = encounter.monsters.map {
      case updated if updated.name == name => attributeModifierFunction(updated)
      case monster => monster
    })

  override def updateMonster(monster: Monster): Encounter =
    encounter.copy(monsters = encounter.monsters.filterNot(m => m.name.equals(monster.name)) :+ monster)

  override def damage(name: String, damage: Int): Encounter =
    updateMonsterAttribute(name, damaged => damaged.copy(hitPoints = damaged.hitPoints.map(hp => hp + damage)))

  override def reset(): Encounter = Encounter(List(), "", 0)

  override def getTurn: Int = encounter.turn

  override def remove(name: String): Encounter =
    encounter.copy(monsters = encounter.monsters.filterNot(m => m.name.equals(name)))

  override def setInitiative(name: String, newInitiative: Int): Encounter =
    updateMonsterAttribute(name, modified => modified.copy(initiative = Some(newInitiative)))

  private def createBaseMonster(name: String, block: Block): Monster =
    Monster(block, name, hitPoints = block.findStat("hp").map(stat => stat.statValue.instantiateValue))

}
