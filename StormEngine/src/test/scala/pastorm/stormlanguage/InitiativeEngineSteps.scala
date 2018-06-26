package pastorm.stormlanguage

import com.ddmodel.ability.{Ability, AbilityType}
import com.ddmodel.{Block, TypedSet}
import com.pastorm.encounter.engine.initiative.{DefaultInitiativeEngine, InitiativeEngine}
import com.pastorm.encounter.model.{EncounterData, Monster}
import cucumber.api.scala.{EN, ScalaDsl}
import org.junit.Assert._

class InitiativeEngineSteps extends ScalaDsl with EN {
  val engine: InitiativeEngine = new DefaultInitiativeEngine
  val defaultBlock: Block = new Block
  var encounterData: EncounterData = EncounterData(Seq(), "", 0)

  Before { scenario =>
    defaultBlock.setName("test")
    val typedSet = new TypedSet[Ability]
    typedSet.add(new Ability(AbilityType.DEXTERITY, 10))
    defaultBlock.setAbilityScores(typedSet)
    encounterData = encounterData.copy(monsters = Seq())
    encounterData = encounterData.copy(playingMonsterName = "")
    encounterData = encounterData.copy(turn = 0)
  }

  Given("""^(\d+) default monsters are created$""") { n: Int =>
    for (i <- 0 to n) {
      encounterData
        = encounterData.copy(monsters = encounterData.monsters :+ Monster(block = defaultBlock, name = "monster" + i))
    }
  }

  When("""^I roll initiative$""") { () =>
    encounterData = encounterData.copy(monsters = engine.rollInitiatives(encounterData.monsters))
  }

  Then("""^The list size is (\d+)$""") { expected: Int =>
    assertEquals(expected, encounterData.monsters.size)
  }

  Then("""^the monster initiative takes a value$""") { () =>
    encounterData.monsters.foreach(monster => assertFalse(monster.initiative.isEmpty))
  }

  Given("""^A monster named "([^"]*)" with (\d+) initiative$""") { (newName: String, newInitiative: Int) =>
    encounterData = encounterData.copy(monsters = encounterData.monsters :+
      Monster(block = defaultBlock, name = newName, initiative = Some(newInitiative)))
  }

  Given("""^A monster named "([^"]*)" with None initiative$""") { newName: String =>
    encounterData = encounterData.copy(monsters = encounterData.monsters :+
      Monster(block = defaultBlock, name = newName))
  }

  Then("""^"([^"]*)"'s initiative is (\d+)$""") { (name: String, initiative: Int) =>
    encounterData.monsters.filter(monster => monster.name.equals(name))
      .foreach(monster => assertEquals(Some(initiative), monster.initiative))
  }

  Then("""^"([^"]*)" has Some initiative$""") { name: String =>
    encounterData.monsters.filter(monster => monster.name.equals(name))
      .foreach(monster => assertFalse(monster.initiative.isEmpty))
  }

  //NextTurn specific
  When("""^Next turn is called$""") { () =>
    encounterData = engine.nextTurn(encounterData)
  }

  Then("""^The monster list size is (\d+)$""") { size: Int =>
    assertEquals(size, encounterData.monsters.size)
  }

  Then("""^The playing monster is "([^"]*)"$""") { name: String =>
    assertEquals(name, encounterData.playingMonsterName)
  }

}