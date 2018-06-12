package com.pastorm.encounter.engine

import com.ddmodel.Block
import com.ddmodel.stat.StatType
import com.pastorm.encounter.engine.configuration.InitiativeEngineComponent
import com.pastorm.encounter.model.{EncounterData, Monster}
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

class EncounterEngine() extends GameEngine {
  this: InitiativeEngineComponent =>
  private var encounterData: EncounterData = EncounterData(Seq(), "")

  override def newMonster(name: String, block: Block): Unit = {
    if (getMonsterByName(name).nonEmpty) {
      println(s"$name already exists in the encounter.")
    } else {
      encounterData = encounterData.copy(monsters = encounterData.monsters :+ createBaseMonster(name, block))
    }
  }

  override def getEncounterData: EncounterData = encounterData

  override def getMonsterByName(name: String): Option[Monster] =
    encounterData.monsters.find(monster => monster.name == name)

  override def getPlayingMonsterName: String = encounterData.playingMonsterName

  override def rollInitiative(): Unit = {
    encounterData = encounterData.copy(monsters = initiativeEngine.rollInitiatives(encounterData.monsters))
    nextTurn()
  }

  override def nextTurn(): Unit = encounterData = initiativeEngine.nextTurn(encounterData)

  override def getPlayingMonster: Option[Monster] = getMonsterByName(encounterData.playingMonsterName)

  override def updateMonster(monster: Monster): Unit =
    encounterData =
      encounterData.copy(monsters = encounterData.monsters.filterNot(m => m.name.equals(monster.name)) :+ monster)

  override def damage(name: String, damage: Int): Option[Monster] = {
    println(s"$name took $damage damage")
    getMonsterByName(name) match {
      case Some(m) => Some(m.copy(hitPoints = m.hitPoints.map(hp => hp - damage)))
      case None => None
    }
  }

  private def createBaseMonster(name: String, block: Block): Monster = {
    Monster(block, name, hitPoints = Option(block.getStat(StatType.HIT_POINTS)
      .orElseThrow(IllegalArgumentSupplier(s"Missing HP for ${block.getName}"))
      .getStatValue.instanciateValue))
  }
}
