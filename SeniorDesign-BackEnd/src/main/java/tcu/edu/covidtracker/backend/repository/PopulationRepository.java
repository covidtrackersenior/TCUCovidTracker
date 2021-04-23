package tcu.edu.covidtracker.backend.repository;


import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Arrays;

@Repository
public class PopulationRepository {

    @Autowired
    private PopulationInit populationInit;

    public String usPopulation() {
        DBCollection collection = populationInit.getCollection("United States");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(collection.find().next().toString());
        return gson.toJson(je);
    }

    public String allStatesPopulation() {
        DBCollection collection = populationInit.getCollection("All States");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        String s = StringUtils.join(collection.find().toArray());
        JsonElement je = jp.parse(s);
        return gson.toJson(je);
    }

    public String statePopulation(String name) {
        DBCollection collection = populationInit.getCollection(name);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(collection.find().next().toString());
        return gson.toJson(je);
    }
}
