package com.storm.model.stat;

public class Dice implements StatValue {
    private int number;
    private int faces;
    private int modifier;

    public Dice(int number, int faces) {
        this.number = number;
        this.faces = faces;
    }

    public int meanValue() {
        return number * (faces / 2) + modifier;
    }

    private int roll() {
        return -1;
    }

    @Override
    public int getScore() {
        return roll();
    }

    @Override
    public String getFormulae() {
        String mod = "";
        if (modifier != 0) {
            mod = (modifier > 0 ? "+" : "-") + modifier;
        }
        return number + "d" + faces + mod;
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
        return meanValue() + "(" + getFormulae() + ")";
    }
}
