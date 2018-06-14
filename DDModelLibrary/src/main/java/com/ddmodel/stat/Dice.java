package com.ddmodel.stat;

import com.ddmodel.Die;

public class Dice implements StatValue {
    private int number;
    private int faces;
    private int modifier;
    private Die die;

    public Dice(int number, int faces) {
        this.number = number;
        this.faces = faces;
        this.die = new Die(faces);
    }

    @Override
    public int getMeanValue() {
        return number * (faces / 2) + modifier;
    }

    private int roll() {
        return die.roll();
    }

    @Override
    public String getFormulae() {
        String mod = "";
        if (modifier != 0) {
            mod = (modifier > 0 ? "+" : "-") + modifier;
        }
        return number + "d" + faces + mod;
    }

    @Override
    public int instantiateValue() {
        return roll() + modifier;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getFaces() {
        return faces;
    }

    public int getModifier() {
        return modifier;
    }

    public void setModifier(int modifier) {
        this.modifier = modifier;
    }

    @Override
    public String toString() {
        return getMeanValue() + "(" + getFormulae() + ")";
    }
}
