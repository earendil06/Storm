package com.ddmodel;

import java.util.HashSet;
import java.util.Optional;
import java.util.function.Predicate;

public class TypedSet<T> extends HashSet<T> {

    public void put(T o) {
        if (!this.add(o)) {
            this.remove(o);
            this.add(o);
        }
    }

    public Optional<T> getValueMatching(Predicate<T> predicate) {
        return this.stream()
                .filter(predicate)
                .findFirst();
    }

}
