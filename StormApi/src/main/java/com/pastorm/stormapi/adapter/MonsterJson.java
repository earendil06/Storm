package com.pastorm.stormapi.adapter;

import com.ddmodel.Block;
import com.pastorm.encounter.model.Monster;

public class MonsterJson {
    private Block block;
    private String name;
    private Integer hitPoints;
    private Integer initiative;

    public MonsterJson() {
    }

    public MonsterJson(Monster monster) {
        this.block = monster.block();
        this.name = monster.name();
        if (monster.hitPoints().isEmpty()) {
            this.hitPoints = null;
        } else {
            this.hitPoints = (Integer) monster.hitPoints().get();
        }
        if (monster.initiative().isEmpty()) {
            this.initiative = null;
        } else {
            this.initiative = (Integer) monster.initiative().get();
        }
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getHitPoints() {
        return hitPoints;
    }

    public void setHitPoints(Integer hitPoints) {
        this.hitPoints = hitPoints;
    }

    public Integer getInitiative() {
        return initiative;
    }

    public void setInitiative(Integer initiative) {
        this.initiative = initiative;
    }

    @Override
    public String toString() {
        return "MonsterJson{" +
                "block=" + block +
                ", name='" + name + '\'' +
                ", hitPoints=" + hitPoints +
                ", initiative=" + initiative +
                '}';
    }
}
