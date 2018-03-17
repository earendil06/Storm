package com.storm.model.ability;

import java.math.BigDecimal;
import java.util.Objects;

public class Ability {
    private AbilityType abilityType;
    private int score;

    public Ability(AbilityType abilityType, int score) {
        this.abilityType = abilityType;
        this.score = score;
    }

    public Ability(String type, int score) {
        this(AbilityType.asAbility(type).orElse(AbilityType.NOT_APPLICABLE), score);
    }

    public int getModifier() {
        int roundingMode = (score - 10) > 0 ? BigDecimal.ROUND_DOWN : BigDecimal.ROUND_UP;
        BigDecimal decimal = new BigDecimal(score - 10).divide(new BigDecimal(2), roundingMode);
        return decimal.intValue();
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public AbilityType getAbilityType() {
        return abilityType;
    }

    @Override
    public String toString() {
        int modifier = getModifier();
        return abilityType + " = " + score + " (" + (modifier >= 0 ? ("+" + modifier) : modifier) + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ability ability = (Ability) o;
        return abilityType == ability.abilityType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(abilityType);
    }
}
