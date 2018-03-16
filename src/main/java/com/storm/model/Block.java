package com.storm.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Block {
    private String name;
    private List<Ability> abilities = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Ability> getAbilities() {
        return new ArrayList<>(abilities);
    }

    public Optional<Ability> getAbility(AbilityType type) {
        return this.abilities.stream()
                .filter(ability -> ability.getAbilityType().equals(type))
                .findFirst();
    }

    public void addAbility(Ability ability) {
        this.abilities.add(ability);
    }

    public void removeAbility(Ability ability) {
        this.abilities.remove(ability);
    }

    @Override
    public String toString() {
        return "Name : " + name + '\n' +
                "Abilities : " + abilities;
    }
}
