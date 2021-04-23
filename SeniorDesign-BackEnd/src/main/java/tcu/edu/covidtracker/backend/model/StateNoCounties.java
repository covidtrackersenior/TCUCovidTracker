package tcu.edu.covidtracker.backend.model;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.ArrayList;

@Data
public class StateNoCounties {
    private String id;
    private String fips;
    private String name;
    private String population;
    private ArrayList<Statistics> stats;

    public StateNoCounties(String name, ArrayList stats, String fips) {
        this.name = name;
        this.fips = fips;
        this.stats = stats;
        id = new ObjectId().toString();
    }

}
