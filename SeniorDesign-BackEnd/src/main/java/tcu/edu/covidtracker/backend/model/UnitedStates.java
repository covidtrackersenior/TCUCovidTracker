package tcu.edu.covidtracker.backend.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
public class UnitedStates {

    private String population;
    private String date;
    private List<Statistics> stats = new ArrayList<>();
    public void addStats(Statistics statistics) {
        this.stats.add(statistics);
    }
}
