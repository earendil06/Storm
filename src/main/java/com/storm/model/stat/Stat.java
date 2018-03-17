package com.storm.model.stat;

public class Stat {
    private StatType type;
    private StatValue statValue;
    private String description;

    public Stat(StatType type) {
        this.type = type;
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

    public int getScore() {
        return statValue.getScore();
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
    public String toString() {
        String desc = description == null ? "" : " {" + description + "}";
        return type + "=" + statValue + desc;
    }

    public void setStatValue(StatValue statValue) {
        this.statValue = statValue;
    }
}
