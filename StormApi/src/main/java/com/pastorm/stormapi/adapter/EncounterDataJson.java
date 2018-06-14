package com.pastorm.stormapi.adapter;

import com.pastorm.encounter.model.EncounterData;
import com.pastorm.encounter.model.Monster;

import java.util.ArrayList;
import java.util.List;

public class EncounterDataJson {
    private List<MonsterJson> monsters;
    private String playingMonsterName;

    public EncounterDataJson() {
    }

    public EncounterDataJson(EncounterData encounterData) {
        this.monsters = new ArrayList<>();
        for (int i = 0; i < encounterData.monsters().size(); i++) {
            Monster monster = encounterData.monsters().apply(i);
            monsters.add(new MonsterJson(monster));
        }
        this.playingMonsterName = encounterData.playingMonsterName();
    }

    public List<MonsterJson> getMonsters() {
        return monsters;
    }

    public void setMonsters(List<MonsterJson> monsters) {
        this.monsters = monsters;
    }

    public String getPlayingMonsterName() {
        return playingMonsterName;
    }

    public void setPlayingMonsterName(String playingMonsterName) {
        this.playingMonsterName = playingMonsterName;
    }

    @Override
    public String toString() {
        return "EncounterDataJson{" +
                "monsters=" + monsters +
                ", playingMonsterName='" + playingMonsterName + '\'' +
                '}';
    }
}
