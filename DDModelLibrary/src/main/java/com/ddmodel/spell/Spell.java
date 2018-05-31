package com.ddmodel.spell;

import java.util.Objects;

public class Spell {
    private String name;
    private String description;

    public Spell(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Spell spell = (Spell) o;
        return Objects.equals(name, spell.name);
    }

    @Override
    public int hashCode() {

        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return name + " : " + description;
    }
}
