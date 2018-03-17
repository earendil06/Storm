package com.storm.model;

import com.storm.model.ability.Ability;
import com.storm.model.ability.AbilityType;
import com.storm.model.stat.Stat;
import com.storm.model.stat.StatType;

import java.util.*;

public class Block {
    private String name;
    private TypedSet<Ability> abilityScores = new TypedSet<>();
    private TypedSet<Stat> stats = new TypedSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Ability> getAbilityScores() {
        return new ArrayList<>(abilityScores);
    }

    public Optional<Ability> getAbility(AbilityType type) {
        return abilityScores.getValueMatching(ability -> ability.getAbilityType().equals(type));
    }

    public Optional<Stat> getStat(StatType type) {
        return stats.getValueMatching(stat -> stat.getType().equals(type));
    }

    public void addAbility(Ability ability) {
        abilityScores.put(ability);
    }

    public void addStat(Stat stat) {
        stats.put(stat);
    }

    @Override
    public String toString() {
        return "Name : " + name + '\n' +
                "Abilities : " + abilityScores + '\n' +
                "Statistics : " + stats;
    }
}
