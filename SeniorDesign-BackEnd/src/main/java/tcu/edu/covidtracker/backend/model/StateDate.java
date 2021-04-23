package tcu.edu.covidtracker.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StateDate {
    private String date;
    private State state;

    public void setState(State state) {this.state = state; }

}
