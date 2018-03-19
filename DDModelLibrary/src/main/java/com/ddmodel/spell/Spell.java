package com.ddmodel.spell;

public class Spell {
    private String name;
    private String description;

    public Spell(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return name + " : " + description;
    }
}
