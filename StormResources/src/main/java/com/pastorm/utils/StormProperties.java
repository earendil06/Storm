package com.pastorm.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

public class StormProperties {
    public static Properties getStormProperties() {
        InputStream resource = StormProperties.class.getClassLoader().getResourceAsStream("/storm.properties");
        if (resource == null) {
            return new Properties();
        }
        Properties properties = new Properties();
        try {
            properties.load(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
}
