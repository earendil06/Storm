package com.pastorm.encounter.engine

import com.ddmodel.Block
import com.ddmodel.stat.StatType
import com.pastorm.encounter.engine.configuration.InitiativeEngineComponent
import com.pastorm.encounter.model.{EncounterData, Monster}
import com.pastorm.utils.ExceptionSupplierFactory.IllegalArgumentSupplier

class EncounterEngine() extends GameEngine {
  this: InitiativeEngineComponent =>
  private var encounterData: EncounterData = EncounterData(Seq(), "")

  override def newMonster(name: String, block: Block): Unit =
    encounterData = encounterData.copy(monsters = encounterData.monsters :+ createBaseMonster(name, block))

  override def getEncounterData: EncounterData = encounterData

  override def getMonsterByName(name: String): Option[Monster] =
    encounterData.monsters.find(monster => monster.name == name)

  override def getCurrentTurnMonster: String = encounterData.playingMonsterName

  override def rollInitiative(): Unit =
    encounterData = encounterData.copy(monsters = initiativeEngine.rollInitiatives(encounterData.monsters))

  override def nextTurn(): Unit = encounterData = initiativeEngine.nextTurn(encounterData)

  override def getPlayingMonster: Monster = getMonsterByName(encounterData.playingMonsterName)
    .getOrElse(throw new IllegalArgumentException(
      s"${encounterData.playingMonsterName} is the playing monster but does not exists in the encounter."))

  override def updateMonster(monster: Monster): Unit =
    encounterData =
      encounterData.copy(monsters = encounterData.monsters.filter(m => !m.name.equals(monster.name)) :+ monster)

  override def damage(name: String, damage: Int): Monster = {
    println(s"$name took $damage damage")
    val monster = getMonsterByName(name).getOrElse(throw new IllegalArgumentException(s"$name is not in the encounter"))
    monster.copy(hitPoints = monster.hitPoints.map(hp => hp - damage))
  }

  private def createBaseMonster(name: String, block: Block): Monster = {
    Monster(block, name, hitPoints = Option(block.getStat(StatType.HIT_POINTS)
      .orElseThrow(IllegalArgumentSupplier(s"Missing HP for ${block.getName}"))
      .getStatValue.instanciateValue))
  }
}
