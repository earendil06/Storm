package com.ddmodel.stat;

import com.ddmodel.Die;

public class Dice implements StatValue {
    private int number;
    private int faces;
    private int modifier;
    private transient Die die;

    public Dice(int number, int faces) {
        this.number = number;
        this.faces = faces;
        this.die = new Die(faces);
    }

    @Override
    public int getMeanValue() {
        double facesUp = (faces + 1);
        double div = facesUp / 2;
        double res = number * div + modifier;
        return (int) res;
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
        int acc = 0;
        for (int i = 0; i < number; i++) {
            acc += die.roll();
        }
        return acc + modifier;
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
