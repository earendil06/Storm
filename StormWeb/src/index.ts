import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"
import Engine from "./engine/Engine";
import LocalAccessor from "./resources/LocalAccessor";

let engine = new Engine();

// engine.newMonster("toto", block.get());
// engine.newMonster("ddd", block.get());
// console.log(engine.getMonsterByName("toto"));
// console.log(engine.getMonsterByName("jj"));
// engine.rollInitiative();
// console.log(engine.getPlayingMonster());
// console.log(engine.getPlayingMonsterName());
// console.log(engine.nextTurn());
// engine.reset();
// console.log(engine.getTurn());
// console.log(engine.getEncounterData());

// console.log(engine.damage("toto", -10));
// console.log(engine.setInitiative("toto", 42));
// console.log(engine.getMonsterByName("toto"));
// engine.remove("rgrg");
// engine.remove("toto");
// console.log(engine.getEncounterData());

// localStorage.clear();
// let key = 'Item 1';
// localStorage.setItem(key, 'Value');
// let myItem = localStorage.getItem(key);
// console.log(myItem);
// let accessor = new LocalAccessor();

// accessor.getBlockByName("airbender").then(value => console.log(value)); // already loaded in browser memory

// accessor.getBlockByName("goblin").then(value => console.log(value)); // dynamically loaded from filesystem

if ($("#container").length > 0) {
    Term.main();
} else {
    Ide.main();
}
