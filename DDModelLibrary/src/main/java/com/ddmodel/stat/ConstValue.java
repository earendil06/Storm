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
    public String getFormulae() {
        return String.valueOf(value);
    }

    @Override
    public int instantiateValue() {
        return value;
    }

    @Override
    public int getMeanValue() {
        return value;
    }

    @Override
    public String toString() {
        return getFormulae();
    }
}
