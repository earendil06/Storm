package com.pastorm.stormapi.route;

import com.ddmodel.Block;
import com.pastorm.accessors.Accessor;
import com.pastorm.encounter.engine.GameEngine;
import com.pastorm.encounter.engine.configuration.EncounterEngineComponent;
import com.pastorm.encounter.model.Monster;
import com.pastorm.stormapi.adapter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import scala.Option;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@RestController
@CrossOrigin
public class Endpoint {
    private final Accessor accessor;
    private GameEngine gameEngine = EncounterEngineComponent.encounterEngine();

    @Autowired
    public Endpoint(Accessor accessor) {
        this.accessor = accessor;
    }

    @RequestMapping(value = "/api/block/{name}", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBlockByName(@PathVariable("name") String name) {
        Optional<Block> monster = accessor.getBlockByName(name);
        if (monster.isPresent()) {
            return Response.ok(monster.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/api/monster/{name}", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMonsterByName(@PathVariable("name") String name) {
        Option<Monster> monster = gameEngine.getMonsterByName(name);
        if (monster.nonEmpty()) {
            MonsterJson entity = new MonsterJson(monster.get());
            return Response.ok(entity).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity(name + " does not exist in the encounter.").build();
        }

    }

    @RequestMapping(value = "/api/new", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newMonster(@RequestBody NewMonster newMonster) {
        newMonster.name = newMonster.name.toLowerCase();
        if (gameEngine.getMonsterByName(newMonster.name).nonEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(newMonster.name + " already exists in the encounter.")
                    .build();
        }
        Optional<Block> block = accessor.getBlockByName(newMonster.blockName);
        if (block.isPresent()) {
            gameEngine.newMonster(newMonster.name, block.get());
            return Response.ok(newMonster.name + " has been added successfully.").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity(newMonster.blockName + " does not exist.").build();
        }
    }

    @RequestMapping(value = "/api/data", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEncounterData() {
        return Response.ok(new EncounterDataJson(gameEngine.getEncounterData())).build();
    }

    @RequestMapping(value = "/api/playing", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlayingMonster() {
        Option monster = gameEngine.getPlayingMonster();
        if (monster.nonEmpty()) {
            return Response
                    .ok(new MonsterJson(gameEngine.getPlayingMonster().get()))
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No one rolled initiative.").build();
        }
    }

    @RequestMapping(value = "/api/roll/initiative", method = RequestMethod.PUT)
    @Produces(MediaType.APPLICATION_JSON)
    public Response rollInitiative() {
        gameEngine.rollInitiative();
        String name = gameEngine.getPlayingMonsterName();
        if (name.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("No one rolled initiative, is there no one in the encounter ?")
                    .build();
        }
        return Response.ok(gameEngine.getPlayingMonsterName() + "'s turn.").build();
    }

    @RequestMapping(value = "/api/nextTurn", method = RequestMethod.PUT)
    @Produces(MediaType.APPLICATION_JSON)
    public Response nextTurn() {
        gameEngine.nextTurn();
        String name = gameEngine.getPlayingMonsterName();
        if (name.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("No one rolled initiative.").build();
        } else {
            return Response.ok(gameEngine.getPlayingMonsterName() + "'s turn.").build();
        }
    }

    @RequestMapping(value = "/api/damage", method = RequestMethod.PUT)
    @Produces(MediaType.APPLICATION_JSON)
    public Response damage(@RequestBody DamageJson damageJson) {
        Integer damage;
        try {
            damage = Integer.valueOf(damageJson.getDamage());
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Damage argument must be a number.").build();
        }
        Option monster = gameEngine.damage(damageJson.getName(), damage);
        if (monster.nonEmpty()) {
            gameEngine.updateMonster((Monster) monster.get());
            return Response
                    .ok(new MonsterJson(gameEngine.getMonsterByName(damageJson.getName()).get()))
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity(damageJson.getName() + " does not exists.").build();
        }
    }

    @RequestMapping(value = "/api/reset", method = RequestMethod.PUT)
    @Produces(MediaType.APPLICATION_JSON)
    public Response reset() {
        gameEngine.reset();
        return Response.ok("Reset done.").build();
    }

    @RequestMapping(value = "/api/turn", method = RequestMethod.GET)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTurn() {
        return Response.ok(gameEngine.getTurn()).build();
    }

    @RequestMapping(value = "/api/remove/{name}", method = RequestMethod.DELETE)
    @Produces(MediaType.APPLICATION_JSON)
    public Response remove(@PathVariable("name") String name) {
        if (name == null || name.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("name cannot be empty.").build();
        } else if (gameEngine.getMonsterByName(name).isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity(name + " is not in the encounter.").build();
        }
        gameEngine.remove(name);
        return Response.ok(name + " has been removed.").build();
    }

    @RequestMapping(value = "/api/set", method = RequestMethod.PUT)
    @Produces(MediaType.APPLICATION_JSON)
    public Response set(@RequestBody SetJson setJson) {
        Integer initiative;
        try {
            initiative = Integer.valueOf(setJson.getValue());
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Initiative argument must be a number.").build();
        }
        Option monster = gameEngine.setInitiative(setJson.getName(), initiative);
        if (monster.nonEmpty()) {
            gameEngine.updateMonster((Monster) monster.get());
            return Response
                    .ok(new MonsterJson(gameEngine.getMonsterByName(setJson.getName()).get()))
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity(setJson.getName() + " does not exists.").build();
        }
    }

    @RequestMapping(value = "/api/write/{name}", method = RequestMethod.POST)
    @Produces(MediaType.TEXT_PLAIN)
    public Response write(@RequestBody String storm, @PathVariable("name") String name) {
        accessor.saveBlock(name, storm);
        return Response.ok().build();
    }
}