package com.pastorm.stormapi.adapter;

public class DamageJson {
    private String damage;
    private String name;

    public DamageJson() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDamage(String damage) {

        this.damage = damage;
    }

    public String getDamage() {
        return damage;
    }

    public String getName() {
        return name;
    }
}
