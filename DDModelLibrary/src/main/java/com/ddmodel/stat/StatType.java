package com.ddmodel.stat;

import java.util.Arrays;
import java.util.Optional;

public enum StatType {
    ARMOR_CLASS("AC"),
    SPEED("SPEED"),
    HIT_POINTS("HP"),
    CHALLENGE_RATING("CR"),
    PASSIVE_PERCEPTION("PP"),
    NOT_APPLICABLE("NA");

    private String type;

    StatType(String type) {
        this.type = type;
    }

    public static Optional<StatType> asStatType(String typeString) {
        return Arrays.stream(StatType.values())
                .filter(s -> s.type.equals(typeString.toUpperCase()))
                .findFirst();
    }
}
