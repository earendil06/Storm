package com.ddmodel;

public class Action {
    private String name;
    private String toHit;
    private String reach;
    private String range;
    private String hit;
    private String description;

    public Action() {
    }

    public Action(String name, String toHit, String reach, String range, String hit, String description) {
        this.name = name.trim();
        this.toHit = toHit.trim();
        this.reach = reach.trim();
        this.range = range.trim();
        this.hit = hit.trim();
        this.description = description.trim();
    }

    public String getToHit() {
        return toHit;
    }

    public void setToHit(String toHit) {
        this.toHit = toHit.trim();
    }

    public String getReach() {
        return reach;
    }

    public void setReach(String reach) {
        this.reach = reach.trim();
    }

    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range.trim();
    }

    public String getHit() {
        return hit;
    }

    public void setHit(String hit) {
        this.hit = hit.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name.trim();
    }

    @Override
    public String toString() {
        return '('   + name +
                ", " + toHit +
                ", " + reach +
                ", " + range +
                ", " + hit +
                ", " + description.replaceAll("\n", " ")
                + ')';
    }
}
