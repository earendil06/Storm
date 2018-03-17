package com.storm.model;

import com.storm.model.ability.Ability;
import com.storm.model.ability.AbilityType;

import java.util.*;

public class Block {
    private String name;
    private Set<Ability> abilityScores = new HashSet<>();

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
        return abilityScores.stream()
                .filter(ability -> ability.getAbilityType().equals(type))
                .findFirst();
    }

    public void addAbility(Ability ability) {
        if (!abilityScores.add(ability)) {
            abilityScores.remove(ability);
            abilityScores.add(ability);
        }
    }

    @Override
    public String toString() {
        return "Name : " + name + '\n' +
                "Abilities : " + abilityScores;
    }
}
