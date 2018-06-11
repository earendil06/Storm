package com.ddmodel;

import com.ddmodel.ability.Ability;
import com.ddmodel.ability.AbilityType;
import com.ddmodel.feature.Feature;
import com.ddmodel.stat.Stat;
import com.ddmodel.stat.StatType;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Block {
    private String name;
    private TypedSet<Ability> abilityScores = new TypedSet<>();
    private TypedSet<Stat> stats = new TypedSet<>();
    private TypedSet<Feature> features = new TypedSet<>();
    private TypedSet<Action> actions = new TypedSet<>();

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

    public void putAbility(Ability ability) {
        abilityScores.put(ability);
    }

    public void putStat(Stat stat) {
        stats.put(stat);
    }

    public void putFeature(Feature feature) {
        features.put(feature);
    }

    public TypedSet<Action> getAction() {
        return actions;
    }

    public void putAction(Action action) {
        actions.put(action);
    }

    @Override
    public String toString() {
        return "Name : " + name + '\n' +
                "Abilities : " + abilityScores + '\n' +
                "Statistics : " + stats + '\n' +
                "Actions : " + actions + '\n' +
                "Features : " + features;
    }
}
