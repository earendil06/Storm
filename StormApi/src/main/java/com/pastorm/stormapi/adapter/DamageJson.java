package com.pastorm.stormapi.adapter;

public class DamageJson {
    private int damage;
    private String name;

    public DamageJson() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDamage(int damage) {

        this.damage = damage;
    }

    public int getDamage() {
        return damage;
    }

    public String getName() {
        return name;
    }
}
