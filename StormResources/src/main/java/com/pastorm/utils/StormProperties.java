package com.pastorm.utils;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

public class StormProperties {
    public static Properties getStormProperties() {
        URL resource = StormProperties.class.getClassLoader().getResource("storm.properties");
        if (resource == null) {
            return new Properties();
        }
        Path path = Paths.get(resource.getPath());
        Properties properties = new Properties();
        try {
            properties.load(Files.newInputStream(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
}
