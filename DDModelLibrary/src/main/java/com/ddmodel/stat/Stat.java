package com.ddmodel.stat;

import java.util.Objects;

public class Stat {
    private StatType type;
    private StatValue statValue;

    public Stat(StatType type) {
        this.type = type;
    }

    public Stat(StatType type, StatValue statValue) {
        this.type = type;
        this.statValue = statValue;
    }

    public Stat(String type) {
        this(StatType.asStatType(type).orElse(StatType.NOT_APPLICABLE));
    }

    public StatType getType() {
        return type;
    }

    public void setType(StatType type) {
        this.type = type;
    }

    public int instantiateValue() {
        return statValue.instantiateValue();
    }

    public int getMeanValue() {
        return statValue.getMeanValue();
    }

    public void setStatValue(StatValue statValue) {
        this.statValue = statValue;
    }

    public String getFormulae() {
        return statValue.getFormulae();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stat stat = (Stat) o;
        return type == stat.type;
    }

    @Override
    public int hashCode() {

        return Objects.hash(type);
    }

    @Override
    public String toString() {
        return type + "=" + statValue;
    }
}
