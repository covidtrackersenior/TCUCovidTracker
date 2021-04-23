package tcu.edu.covidtracker.backend.repository;

import com.google.gson.*;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CovidTrackerRepository {

    @Autowired
    private CovidTrackerInit mongoInit;

    public String USByDate(String date) {
        DBCollection collection = mongoInit.getCollection("United States");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(collection.find(new BasicDBObject("date", date)).next().toString());
        return gson.toJson(je);
    }

    public String USByDateRange(String startDate, String endDate) {
        DBCollection collection = mongoInit.getCollection("United States");
        return getDateRange(startDate, endDate, collection);
    }

    public String allStatesByDate(String date){
        DBCollection collection = mongoInit.getCollection("All States");
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(collection.find(new BasicDBObject("date", date)).next().toString());
        return gson.toJson(je);
    }

    public String oneStateByDate(String date, String state){
        DBCollection collection = mongoInit.getCollection(state);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(collection.find(new BasicDBObject("date", date)).next().toString());
        return gson.toJson(je);
    }

    public String stateWithByDateRange(String startDate, String endDate, String state) {
        DBCollection collection = mongoInit.getCollection(state);
        return getDateRange(startDate, endDate, collection);
    }

    //THIS ONE
    public String stateWithoutByDateRange(String startDate, String endDate, String state) {
        DBCollection collection = mongoInit.getCollection(state);
        DBObject dateRange = new BasicDBObject("$gte", startDate);
        dateRange.put("$lte", endDate);
        BasicDBObject query = new BasicDBObject("date", dateRange);
        BasicDBObject fields = new BasicDBObject("state.counties", 0);
        JsonArray array = getJSONString(collection, query, fields);
        for (JsonElement el : array) {
            JsonObject obj = el.getAsJsonObject();
            JsonObject stateObj = obj.get("state").getAsJsonObject();
            JsonElement stats = stateObj.get("stats").deepCopy();
            obj.remove("state");
            obj.add("stats", stats);
        }
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(array);
    }

    public String countyByDate(String date, String state, String county) {
        DBCollection collection = mongoInit.getCollection(state);
        BasicDBObject query = new BasicDBObject("date", date);
        query.put("state.counties.name", county);
        BasicDBObject projection = new BasicDBObject("state.counties.$", 1);
        projection.put("date", 1);
        JsonElement je = getJSONString(collection, query, projection);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(je);
    }

    //THIS ONE
    public String countyByDateRange(String startDate, String endDate, String state, String county) {
        DBCollection collection = mongoInit.getCollection(state);
        DBObject dateRange = new BasicDBObject("$gte", startDate);
        dateRange.put("$lte", endDate);
        BasicDBObject query = new BasicDBObject("date", dateRange);
        query.put("state.counties.name", county);
        BasicDBObject projection = new BasicDBObject("state.counties.$", 1);
        projection.put("date", 1);
        JsonArray array = getJSONString(collection, query, projection);
        for (JsonElement el : array) {
            JsonObject obj = el.getAsJsonObject();
            JsonObject stateObj = obj.get("state").getAsJsonObject();
            JsonObject countyObj = stateObj.get("counties").getAsJsonArray().get(0).getAsJsonObject();
            JsonElement stats = countyObj.get("stats").deepCopy();
            obj.remove("state");
            obj.add("stats", stats);
        }
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(array);
    }

    private String getDateRange(String startDate, String endDate, DBCollection collection) {
        DBObject dateRange = new BasicDBObject("$gte", startDate);
        dateRange.put("$lte", endDate);
        BasicDBObject query = new BasicDBObject("date", dateRange);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        DBCursor cursor = collection.find(query).sort(new BasicDBObject("date", 1));
        String result = cursor.toArray().toString();
        JsonElement je = jp.parse(result);
        return gson.toJson(je);
    }

    private JsonArray getJSONString(DBCollection collection, BasicDBObject query, BasicDBObject projection) {
        DBCursor cursor = collection.find(query, projection).sort(new BasicDBObject("date", 1));
        String result = cursor.toArray().toString();
        JsonElement je = new JsonParser().parse(result.trim());
        return je.getAsJsonArray();
    }

}
