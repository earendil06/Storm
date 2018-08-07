import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"
import Engine from "./engine/Engine";
import {EncounterData} from "./engine/Adapters";
import ServerAccessor from "./resources/ServerAccessor";

let engine = new Engine();

let accessor = new ServerAccessor();
let block = accessor.getBlockFromStormText(
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
);

engine.newMonster("toto", block.get());
let ed = engine.getEncounterData() as EncounterData;
console.log(ed);
console.log(ed.turn);
console.log(ed.playingMonsterName);
console.log(ed.monsters);

if ($("#container").length > 0) {
    Term.main();
} else {
    Ide.main();
}
