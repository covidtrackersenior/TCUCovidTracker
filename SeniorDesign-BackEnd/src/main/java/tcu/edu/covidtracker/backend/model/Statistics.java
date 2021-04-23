package tcu.edu.covidtracker.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Statistics {

    private int cases;
    private double casesPercent;
    private int deaths;
    private double deathsPercent;
    private int hospitalized;
    private double hospitalizedPercent;
    private int hospitalizedCur;
    private int hospitalizedCum;
    private int hospitalizedInc;
    private int newCases;
    private double newCasesPercent;
    private int newDeaths;
    private double newDeathsPercent;
    private int vaccinesDistributed;
    private double distributedPercent;
    private int firstDose;
    private double firstDosePercent;
    private int secondDose;
    private double secondDosePercent;
    private int dailyVaccinated;
    private double dailyVaccinatedPercent;

    public Statistics initStatistics() {
        this.cases = 0;
        this.deaths = 0;
        this.hospitalized = 0;
        this.hospitalizedCur = 0;
        this.hospitalizedCum = 0;
        this.hospitalizedInc = 0;
        this.newCases = 0;
        this.newDeaths = 0;
        this.distributedPercent = 0;
        this.vaccinesDistributed = 0;
        this.firstDose = 0;
        this.firstDosePercent = 0;
        this.secondDose = 0;
        this.secondDosePercent = 0;
        this.dailyVaccinated = 0;
        this.dailyVaccinatedPercent = 0;
        this.casesPercent = 0;
        this.deathsPercent = 0;
        this.hospitalizedPercent = 0;
        this.newCasesPercent = 0;
        this.newDeathsPercent = 0;
        return this;
    }
}
