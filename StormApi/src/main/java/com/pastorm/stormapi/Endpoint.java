package com.pastorm.stormapi;

import com.ddmodel.Block;
import com.pastorm.accessors.ServerAccessor;
import com.pastorm.encounter.engine.GameEngine;
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent;
import com.pastorm.encounter.model.Monster;
import org.springframework.stereotype.Component;
import scala.Option;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Component
@Path("/api")
public class Endpoint {
    private ServerAccessor accessor = new ServerAccessor();
    private GameEngine gameEngine = EncounterEngineComponent.encounterEngine();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response documentation() {
        return Response.ok("TODO API DOC").build();
    }

    @GET
    @Path("/block/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Block getBlockByName(@PathParam("name") String name) {
        return accessor.getBlockByName(name).orElse(new Block());
    }

    @GET
    @Path("/monster/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMonsterByName(@PathParam("name") String name) {
        Option<Monster> monster = gameEngine.getMonsterByName(name);
        if (monster.nonEmpty()) {
            return Response.ok(new MonsterJson(monster.get())).build();
        } else {
            return Response.status(404).entity(name + " does not exist in the encounter.").build();
        }
    }

    @POST
    @Path("/new")
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

    @GET
    @Path("/data")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEncounterData() {
        return Response.ok(gameEngine.getEncounterData()).build();
    }

}