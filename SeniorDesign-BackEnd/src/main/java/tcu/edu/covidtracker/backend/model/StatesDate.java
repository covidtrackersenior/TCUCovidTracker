package tcu.edu.covidtracker.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class StatesDate {
    private String date;
    private List<StateNoCounties> states = new ArrayList<>();

    public void addState(State state) {
        StateNoCounties stateNoCounties = new StateNoCounties(state.getName(), state.getStats(), state.getFips());
        this.states.add(stateNoCounties);
    }

}
