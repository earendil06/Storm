import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"
import Engine from "./engine/Engine";
import {EncounterData} from "./engine/Adapters";
import ServerAccessor from "./resources/ServerAccessor";
import {Accessor} from "./resources/Accessor";

let engine = new Engine();

let accessor = new ServerAccessor();
/*let block = accessor.getBlockFromStormText(
    `Acolyte

AC 10
HP 2d8
speed 30
pp 10

str 10
dex 10
con 10
int 10
wis 14
cha 11

actions {

scimitar =>
+4 to hit
reach 5
hit 1d6+2 slashing

shortbow =>
+4 to hit
range 80/320
hit 1d6 + 2 piercing
{cool bow}
}

features {

Skills => {medicine 4, religion 2}

Languages => {any one language (usually Common)}

Challenge => {1/4}

}
`
);*/

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

accessor.getBlockByName("airbender").then(value => console.log(value)); // already loaded in browser memory

localStorage.clear();

accessor.getBlockByName("airbender").then(value => console.log(value)); // dynamically loaded from filesystem

accessor.getBlockByName("dontexists").then(value => console.log(value)); // returns 404

if ($("#container").length > 0) {
    Term.main();
} else {
    Ide.main();
}
