package com.ddmodel.stat;

import java.util.Objects;

public class Stat {
    private StatType type;
    private StatValue statValue;
    private String description;

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

    public StatValue getStatValue() {
        return statValue;
    }

    public void setStatValue(StatValue statValue) {
        this.statValue = statValue;
    }

    public String getFormulae() {
        return statValue.getFormulae();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        String desc = description == null ? "" : " {" + description + "}";
        return type + "=" + statValue + desc;
    }
}
