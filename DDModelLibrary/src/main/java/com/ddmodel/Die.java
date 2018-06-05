package com.ddmodel;

import java.security.SecureRandom;

public class Die {
    private int sides;
    private final SecureRandom randy = new SecureRandom();

    public Die(int sides) {
        this.sides = sides;
    }

    public int roll() {
        return randy.nextInt(sides) + 1;
    }

    @Override
    public String toString() {
        return "d" + sides;
    }
}
