package com.pastorm;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import org.apache.commons.io.FileUtils;

public class Main {
    public static void main(String[] args) {
        /*try {
            FileUtils.copyURLToFile(new URL("https://github.com/cynicaloptimist/improved-initiative/blob/master/ogl_creatures.json"), new File("blocks.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }*/
        try {
            List<String> lst = Files.readAllLines(Paths.get("blocks.json"));
            StringBuilder builder = new StringBuilder();
            lst.forEach(builder::append);
            JsonArray array = new JsonParser().parse(builder.toString()).getAsJsonArray();

            for (JsonElement jsonElement : array) {
                try {
                    JsonObject block = jsonElement.getAsJsonObject();
                    StringBuilder result = new StringBuilder();

                    int value = block.getAsJsonObject("Abilities").get("Dex").getAsInt();
                    int roundingMode = (value - 10) > 0 ? BigDecimal.ROUND_DOWN : BigDecimal.ROUND_UP;
                    BigDecimal decimal = new BigDecimal(value - 10).divide(new BigDecimal(2), roundingMode);
                    int modifier = decimal.intValue();
                    int pp = modifier + 10;

                    result
                            .append(block.get("Name").getAsString()).append("\n")
                            .append("\n")
                            .append("AC " + block.getAsJsonObject("AC").get("Value").getAsString()).append("\n")
                            .append("HP " + block.getAsJsonObject("HP").get("Notes").getAsString().replaceAll("\\(", "").replaceAll("\\)", "")).append("\n")
                            .append("speed " + block.getAsJsonArray("Speed").get(0).getAsString().replaceAll(" ft.", "")).append("\n")
                            .append("PP " + pp).append("\n")
                            .append("\n")
                            .append("str " + block.getAsJsonObject("Abilities").get("Str").getAsInt()).append("\n")
                            .append("dex " + block.getAsJsonObject("Abilities").get("Dex").getAsInt()).append("\n")
                            .append("con " + block.getAsJsonObject("Abilities").get("Con").getAsInt()).append("\n")
                            .append("int " + block.getAsJsonObject("Abilities").get("Int").getAsInt()).append("\n")
                            .append("wis " + block.getAsJsonObject("Abilities").get("Wis").getAsInt()).append("\n")
                            .append("cha " + block.getAsJsonObject("Abilities").get("Cha").getAsInt()).append("\n")
                            .append("\n");

                    result.append("actions {\n\n");

                    for (JsonElement actions : block.getAsJsonArray("Actions")) {
                        result.append(actions.getAsJsonObject().get("Name").getAsString() + " =>").append("\n");
                        result.append("{").append(actions.getAsJsonObject().get("Content").getAsString()).append("}").append("\n\n");
                    }

                    result.append("}\n");


                    result.append("features {\n\n");

                    if (block.getAsJsonArray("Saves").size() > 0) {
                        Map<String, Integer> saves = new HashMap<>();
                        block.getAsJsonArray("Saves").forEach(o -> saves.put(o.getAsJsonObject().get("Name").getAsString(), o.getAsJsonObject().get("Modifier").getAsInt()));
                        result.append("Saves => {" +
                                Arrays.toString(saves.keySet().stream().map(key -> key.toLowerCase() + " " + saves.get(key)).toArray()).replaceAll("]", "").replaceAll("\\[", "")
                                + "}\n\n");
                    }

                    if (block.getAsJsonArray("Skills").size() > 0) {
                        Map<String, Integer> skills = new HashMap<>();
                        block.getAsJsonArray("Skills").forEach(o -> skills.put(o.getAsJsonObject().get("Name").getAsString(), o.getAsJsonObject().get("Modifier").getAsInt()));
                        result.append("Skills => {" +
                                Arrays.toString(skills.keySet().stream().map(key -> key.toLowerCase() + " " + skills.get(key)).toArray()).replaceAll("]", "").replaceAll("\\[", "")
                                + "}\n\n");
                    }

                    if (block.has("Reactions")) {
                        block.getAsJsonArray("Reactions").forEach(r -> {
                            result.append(r.getAsJsonObject().get("Name").getAsString() + " =>\n{" + r.getAsJsonObject().get("Content").getAsString() + "}\n\n");
                        });
                    }


                    block.getAsJsonArray("Traits").forEach(r -> {
                        result.append(r.getAsJsonObject().get("Name").getAsString() + " =>\n{" + r.getAsJsonObject().get("Content").getAsString() + "}\n\n");
                    });

                    if (block.getAsJsonArray("Senses").size() > 0) {
                        result.append("Senses => {" + block.getAsJsonArray("Senses").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    }

                    if (block.getAsJsonArray("DamageVulnerabilities").size() > 0) {
                        result.append("Damage Vulnerabilities => {" + block.getAsJsonArray("DamageVulnerabilities").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    }

                    if (block.getAsJsonArray("DamageResistances").size() > 0) {
                        result.append("Damage Resistances => {" + block.getAsJsonArray("DamageResistances").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    }

                    if (block.getAsJsonArray("DamageImmunities").size() > 0) {
                        result.append("Damage Immunities => {" + block.getAsJsonArray("DamageImmunities").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    }

                    if (block.getAsJsonArray("ConditionImmunities").size() > 0) {
                        result.append("Condition Immunities => {" + block.getAsJsonArray("ConditionImmunities").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    }


                    result.append("Languages => {" + block.getAsJsonArray("Languages").toString().replaceAll("\\[", "").replaceAll("]", "").replaceAll("\"", "") + "}\n\n");
                    result.append("Challenge => {" + block.get("Challenge").getAsString() + "}\n\n");

                    result.append("\n}");

                    String filename = block.getAsJsonObject().get("Name").getAsString().toLowerCase().replaceAll("/", "-").replaceAll(" ", "_") + ".storm";
                    BufferedWriter writer = new BufferedWriter(new FileWriter("generated_files/" + filename));
                    writer.write(result.toString());

                    writer.close();

                } catch (NullPointerException e) {
                    System.out.println("Error parsing block : " + jsonElement.getAsJsonObject().get("Name"));
                }
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
