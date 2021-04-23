package tcu.edu.covidtracker.backend.automation.utilities;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.util.JSON;
import com.opencsv.CSVReader;
import org.junit.Test;
import tcu.edu.covidtracker.backend.model.*;

import java.io.FileWriter;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

public class PopulationParser {

    public void UnitedStatesPopulation(DB db) {
        try {
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/state-population.csv"));
            CSVReader csvReader = new CSVReader(reader);
            String[] nextRecord;
            csvReader.readNext();
            nextRecord = csvReader.readNext();
            String pop = nextRecord[17];
            DBCollection usCollection = db.getCollection("United States");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void StateAndCountyPopulation() {
        try {
            FileWriter allWriter = new FileWriter("src/main/resources/csv/populations/AllStates.csv");
            FileWriter writer = null;
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/county-population.csv"));
            CSVReader csvReader = new CSVReader(reader);
            String[] nextRecord;
            csvReader.readNext();
            while ((nextRecord = csvReader.readNext()) != null) {
                String state = nextRecord[5];
                String countyArray[] = nextRecord[6].split(" ");
                String county = "";
                String pop = nextRecord[18];
                if (countyArray.length == 2 && state.equals(countyArray[0] + " " + countyArray[1])) {
                    county = state;
                }
                else if (countyArray.length == 1) {
                    county = countyArray[0];
                }

                if (state.equals(county)) {
                    writer = new FileWriter("src/main/resources/csv/populations/" + state + ".csv");
                    allWriter.write(state+","+pop+"\n");
                } else {
                    for (int i = 0; i < countyArray.length; i++) {
                        if (!countyArray[i].equals("County") && !countyArray[i].equals("Parish")) {
                            county += countyArray[i] + " ";
                        }
                    }
                    writer.write(county.trim()+","+pop+"\n");
                    writer.flush();
                }

            }
            allWriter.flush();
            allWriter.close();
            writer.flush();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
