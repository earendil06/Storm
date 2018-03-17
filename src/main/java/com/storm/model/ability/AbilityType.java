package com.storm.model.ability;

import java.util.Arrays;
import java.util.Optional;

public enum AbilityType {
    STRENGTH("str"),
    DEXTERITY("dex"),
    CONSTITUTION("con"),
    INTELLIGENCE("int"),
    WISDOM("wis"),
    CHARISMA("cha"),
    NOT_APPLICABLE("na");

    private String name;

    AbilityType(String name) {
        this.name = name;
    }

    public static Optional<AbilityType> asAbility(String s) {
        return Arrays.stream(AbilityType.values())
                .filter(v -> v.name.equals(s))
                .findFirst();
    }
}
