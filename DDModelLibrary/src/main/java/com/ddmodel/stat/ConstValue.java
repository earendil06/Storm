package com.ddmodel.stat;

public class ConstValue implements StatValue {
    private int value;

    public ConstValue(int value) {
        this.value = value;
    }

    public ConstValue(String text) {
        this.value = Integer.valueOf(text);
    }

    @Override
    public int getScore() {
        return value;
    }

    @Override
    public String getFormulae() {
        return String.valueOf(value);
    }

    @Override
    public String toString() {
        return getFormulae();
    }
}
