package com.storm.model;

public class Ability {
    private AbilityType abilityType;
    private int value;

    public Ability(String type, int value) {
        this.abilityType = AbilityType.asAbility(type).orElse(AbilityType.NOT_APPLICABLE);
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public AbilityType getAbilityType() {
        return abilityType;
    }

    public void setAbilityType(AbilityType abilityType) {
        this.abilityType = abilityType;
    }

    @Override
    public String toString() {
        return abilityType + " = " + value;
    }
}
