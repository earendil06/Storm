package com.pastorm

@JSExportTopLevel("JSAdapter")
class JSAdapter {
  val engine: EncounterEngine = EncounterEngineComponent.encounterEngine

  @JSExport
  //todo
  def newMonster(name: String, adapter: BlockAdapter): Unit =
    engine.newMonster(name, adapter.block)

  @JSExport
  //todo
  def getEncounterData: EncounterData =
    write(engine.getEncounterData)

  @JSExport
  //todo
  def getMonsterByName(name: String): Option[Monster] =
    write(engine.getMonsterByName(name))

  @JSExport
  def getPlayingMonsterName: String =
    engine.getPlayingMonsterName

  @JSExport
  def rollInitiative(): Unit =
    engine.rollInitiative()

  @JSExport
  def nextTurn(): Unit =
    engine.nextTurn()

  @JSExport
  //todo
  def getPlayingMonster: Option[Monster] =
    write(engine.getPlayingMonster)

  @JSExport
  //todo
  def updateMonster(monster: String): Unit =
    engine.updateMonster(read[Monster](monster))

  @JSExport
  def damage(name: String, damage: Int): Option[Monster] =
    write(engine.damage(name, damage))

  @JSExport
  def reset(): Unit =
    engine.reset()

  @JSExport
  def getTurn: Int =
    engine.getTurn

  @JSExport
  def remove(name: String): Unit =
    engine.remove(name)

  @JSExport
  //todo
  def setInitiative(name: String, value: Int): Option[Monster] =
    write(engine.setInitiative(name, value))
}
