package com.pastorm.stormapi;

import com.ddmodel.Block;
import com.pastorm.accessors.Accessor;
import com.pastorm.accessors.ServerAccessor;
import com.pastorm.encounter.engine.GameEngine;
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent;
import com.pastorm.encounter.model.Monster;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import scala.Option;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@RestController
@CrossOrigin
public class Endpoint {
    private Accessor accessor = new ServerAccessor();
    private GameEngine gameEngine = EncounterEngineComponent.encounterEngine();

    @RequestMapping(value = "/api/block/{name}", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Block getBlockByName(@PathVariable("name") String name) {
        return accessor.getBlockByName(name).orElse(new Block());
    }

    @RequestMapping(value = "/api/monster/{name}", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMonsterByName(@PathVariable("name") String name) {
        Option<Monster> monster = gameEngine.getMonsterByName(name);
        if (monster.nonEmpty()) {
            return Response.ok(new MonsterJson(monster.get())).build();
        } else {
            return Response.status(404).entity(name + " does not exist in the encounter.").build();
        }
    }

    @RequestMapping(value = "/api/new", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newMonster(NewMonster newMonster) {
        Optional<Block> block = accessor.getBlockByName(newMonster.blockName);
        if (block.isPresent()) {
            gameEngine.newMonster(newMonster.name, block.get());
            return Response.ok(newMonster.name + " has been added successfully.").build();
        } else {
            return Response.status(404).entity(newMonster.blockName + " does not exist.").build();
        }
    }

    @RequestMapping(value = "/api/data", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEncounterData() {
        return Response.ok(gameEngine.getEncounterData()).build();
    }

}