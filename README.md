# StormD&D Specifications draft

Toolchain with the goal to help a Dungeon Master to run a D&D game.  
This is not yet another online role playing game tool, it is meant to be used for live pen and papers sessions.  
All dice rolls should be done IRL, the toolchain should only provide information on what to do but not do it for you.  
The principal features should be to enable faster battles and content generation by providing :
- A data type (codename StormLang) that can describe a monster's stats block
  - the automatic generation of those blocks by parsing some db on the web
  - the persistence of those blocks in a db
  - an api that enables an easy manipulation of those data
- A Command Line Interface (codename StormCLI) to easily manage a battle encounter
  - initiative tracking
  - Health tracking per monster
  - an easy access to the data of the monsters in the encounter
  - a ncurse type GUI | an easy to use CLI

Not prioritary :
- A data type / db for the player characters, the spells, the equipments, etc, 
that uses the same concepts as the monster stats blocks
- A cloud hub to store and retrieve those data

## StormLang

#### Example :

The syntax below should not influence the future implementation, 
it is json-like to be simple to talk about for now.

```
entity "Goblin"

AC 11
HP 1d6 + 2
stats {
    str 12
    dex 10
    con 11
    ...
}
immunity { fire }
resistance { ice }
skills { acrobatics }
features { darkvision }
actions {
    shortsword {
        hit +4
        damage 1d6 + 2
        effect "makes you sick"
        ...
    },
    fireball
}

```

Things to note :
- The dice types (e.g. 1d6, 2d100, ...)
- the "links" (fireball, ice, fire, acrobatics, etc could be linked to a description
 and retrieved at compile time so we don't have to rewrite them each time we need one)
## StormCLI

#### Example for a simple CLI (no ncurse) :

The symbol '>>' is a user prompt and '->" is the cli response.

```
>> new encounter "easy encounter"
    >> 2 goblins "Adrien", "Steven"
    >> generate
        -> encounter "easy encounter" generated

>> play "easy encounter"
    >> show details 
        -> goblin "Adrien" HP 4 AC 11 ...
        -> goblin "Steven" HP 9999 AC 9999 ...
    
    >> roll initiative
        -> "Steven" 13
        -> "Adrien" 4
    -> It is Steven's turn
    
    >> show action "Steven"
        -> shortsword : hit +4 ...
        -> fireball : ...
        
    >> show action "Adrien"
            -> Cry : hit -4 ...
            
    >> damage "Adrien" -2
        -> Adrien has 2 HP left
```
Notes :
- The dice types (e.g. 1d6, 2d100, ...) from  StormLang should be used to generate monster stats dynamically
