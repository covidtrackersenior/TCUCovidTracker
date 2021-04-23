package tcu.edu.covidtracker.backend.model;


import lombok.Data;
import org.bson.types.ObjectId;

import java.util.ArrayList;

@Data
public class County {
    private String population;
    private String id;
    private String fips;
    private String name;
    private ArrayList<Statistics> stats = new ArrayList<>();

    public void addStats(Statistics statistics) {
        this.stats.add(statistics);
    }

    public County() {
        id = new ObjectId().toString();
    }
}
