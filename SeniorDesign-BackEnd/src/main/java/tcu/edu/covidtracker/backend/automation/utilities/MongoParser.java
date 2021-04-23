package tcu.edu.covidtracker.backend.automation.utilities;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.util.JSON;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.junit.Test;
import org.springframework.stereotype.Component;
import tcu.edu.covidtracker.backend.model.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;

@Component
public class MongoParser {


    public HashMap<String, String>  stateMap() throws IOException, CsvValidationException {
        HashMap<String, String> pops = new HashMap<>();
        Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/populations/AllStates.csv"));
        CSVReader csvReader = new CSVReader(reader);
        String[] nextRecord;
        while ((nextRecord = csvReader.readNext()) != null) {
            pops.put(nextRecord[0], nextRecord[1]);
        }
        return pops;
    }

    public HashMap<String, HashMap<String, String>> countiesMap() throws IOException, CsvValidationException {
        Reader reader;
        HashMap<String, HashMap<String, String>> pops = new HashMap<>();
        File folder = new File("src/main/resources/csv/populations");
        String[] pathnames = folder.list();
        for (String pathname : pathnames) {
            if (!pathname.equals("AllStates")) {
                HashMap<String, String> county = new HashMap<>();
                reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/populations/" + pathname));
                CSVReader csvReader = new CSVReader(reader);
                String[] nextRecord;
                while ((nextRecord = csvReader.readNext()) != null) {
                    county.put(nextRecord[0], nextRecord[1]);
                }
                pops.put(pathname.substring(0,pathname.length() - 4), county);
            }
        }
        return pops;
    }

    @Test
    public void dailyState() throws IOException, CsvValidationException {
        MongoClientURI uri = new MongoClientURI(
                "mongodb://root:4x7NOpp0OFnpl1qD@cluster0-shard-00-00.i4jnr.mongodb.net:27017,cluster0-shard-00-01.i4jnr.mongodb.net:27017,cluster0-shard-00-02.i4jnr.mongodb.net:27017/CovidTracker?ssl=true&replicaSet=atlas-11ucwv-shard-0&authSource=admin&retryWrites=true&w=majority");
        MongoClient mongoClient = new MongoClient(uri);
        DB db = mongoClient.getDB("CovidTracker");
        String nyTimesState = "src/main/resources/csv/download/nytimes/state/";
        String nyTimesCounty = "src/main/resources/csv/download/nytimes/county/";
        String covidTrackingState = "src/main/resources/csv/download/covidtracking/state/";
        String vaccinationState = "src/main/resources/csv/download/vaccination/state/";
        HashMap<String, HashMap<String, String>> countiesPops = countiesMap();
        HashMap<String, String> statePops = stateMap();
        HashMap<String, String> countiesPop;
        boolean covidTrackingFlag;
        boolean vaccinationFlag;
        int size = new File(nyTimesState).list().length;
        System.out.println(size);
        for (int i = 0; i < size - 1; i++) {
            LocalDate firstDay = LocalDate.now().minusDays(1 + i);
            LocalDate secondDay = firstDay.minusDays(1);
            File covidTrackerFile = new File(covidTrackingState + firstDay + ".csv");
            covidTrackingFlag = covidTrackerFile.exists();
            File vaccinationFile = new File(vaccinationState + firstDay + ".csv");
            vaccinationFlag = vaccinationFile.exists();
            Reader reader1 = Files.newBufferedReader(Paths.get(nyTimesState + firstDay + ".csv"));
            Reader reader2 = Files.newBufferedReader(Paths.get(nyTimesState + secondDay + ".csv"));
            CSVReader todayStateCSVReader = new CSVReader(reader1);
            CSVReader todayStateCSVReader2 = null;
            CSVReader todayStateCSVReader3 = null;
            CSVReader yesterdayStateCSVReader = new CSVReader(reader2);
            String[] todayStateData;
            String[] todayStateData2;
            String[] todayStateData3;
            String[] yesterdayStateData;
            todayStateCSVReader.readNext();
            yesterdayStateCSVReader.readNext();
            DBCollection usCollection;
            if (!db.collectionExists("United States")) {
                usCollection = db.createCollection("United States", null);
            } else {
                usCollection = db.getCollection("United States");
            }
            UnitedStates unitedStates = new UnitedStates();
            unitedStates.setDate(firstDay.toString());
            Statistics totalStats = new Statistics().initStatistics();
            StatesDate statesDate = new StatesDate();
            statesDate.setDate(firstDay.toString());
            if (covidTrackingFlag) {
                Reader reader3 = Files.newBufferedReader(Paths.get(covidTrackingState + firstDay + ".csv"));
                todayStateCSVReader2 = new CSVReader(reader3);
                todayStateCSVReader2.readNext();
            }
            if (vaccinationFlag) {
                Reader reader4 = Files.newBufferedReader(Paths.get(vaccinationState + firstDay + ".csv"));
                todayStateCSVReader3 = new CSVReader(reader4);
                todayStateCSVReader3.readNext();
            }
            while ((todayStateData = todayStateCSVReader.readNext()) != null) {
                yesterdayStateData = yesterdayStateCSVReader.readNext();

                StateDate stateDate = new StateDate();
                stateDate.setDate(firstDay.toString());

                Reader todayCountyReader = Files.newBufferedReader(Paths.get(nyTimesCounty + firstDay + ".csv"));
                Reader yesterdayCountyReader = Files.newBufferedReader(Paths.get(nyTimesCounty + secondDay + ".csv"));
                CSVReader todayCountyCSVReader = new CSVReader(todayCountyReader);
                CSVReader yesterdayCountyCSVReader = new CSVReader(yesterdayCountyReader);

                String tState = todayStateData[0];
                String tCases = todayStateData[2];
                String tDeaths = todayStateData[3];

                String yCases = yesterdayStateData[2];
                String yDeaths = yesterdayStateData[3];

                String stateFIPS = todayStateData[1];

                todayStateData2 = new String[]{tState, stateFIPS, "0", "0", "0", "0"};
                if (covidTrackingFlag) {
                    todayStateData2 = todayStateCSVReader2.readNext();
                }

                todayStateData3 = new String[]{tState, stateFIPS, "0.0", "0.0", "0.0", "0.0"};
                if (vaccinationFlag) {
                    todayStateData3 = todayStateCSVReader3.readNext();
                }

                String distributed = todayStateData3[2].split("\\.")[0];
                String firstDose = todayStateData3[3].split("\\.")[0];
                String secondDose = todayStateData3[4].split("\\.")[0];
                String dailyVaccinated = todayStateData3[5].split("\\.")[0];

                distributed = distributed.equals("") ? "0" : distributed;
                firstDose = firstDose.equals("") ? "0" : firstDose;
                secondDose = secondDose.equals("") ? "0" : secondDose;
                dailyVaccinated = dailyVaccinated.equals("") ? "0" : dailyVaccinated;

                String hospitalized = todayStateData2[2];
                String hospitalizedCum = todayStateData2[3];
                String hospitalizedCur = todayStateData2[4];
                String hospitalizedInc = todayStateData2[5];

                int nCases = Integer.parseInt(tCases) - Integer.parseInt(yCases);
                int nDeaths = Integer.parseInt(tDeaths) - Integer.parseInt(yDeaths);

                //TODO
                //Write reflection method for statistics
                totalStats.setHospitalized(totalStats.getHospitalized() + Integer.parseInt(hospitalized));
                totalStats.setHospitalizedCum(totalStats.getHospitalizedCum() + Integer.parseInt(hospitalizedCum));
                totalStats.setHospitalizedCur(totalStats.getHospitalizedCur() + Integer.parseInt(hospitalizedCur));
                totalStats.setHospitalizedInc(totalStats.getHospitalizedInc() + Integer.parseInt(hospitalizedInc));
                totalStats.setCases(totalStats.getCases() + Integer.parseInt(tCases));
                totalStats.setDeaths(totalStats.getDeaths() + Integer.parseInt(tDeaths));
                totalStats.setNewCases(totalStats.getNewCases() + nCases);
                totalStats.setNewDeaths(totalStats.getNewDeaths() + nDeaths);
                totalStats.setVaccinesDistributed(totalStats.getVaccinesDistributed() + Integer.parseInt(distributed));
                totalStats.setFirstDose(totalStats.getFirstDose() + Integer.parseInt(firstDose));
                totalStats.setSecondDose(totalStats.getSecondDose() + Integer.parseInt(secondDose));
                totalStats.setDailyVaccinated(totalStats.getDailyVaccinated() + Integer.parseInt(dailyVaccinated));

                State state = new State();
                state.setName(tState);
                state.setFips(stateFIPS);

                int statePop = 0;
                if (!tState.equals("District of Columbia")) {
                    statePop = Integer.parseInt(statePops.get(tState));
                }


                Statistics stats = new Statistics().initStatistics();
                stats.setCases(Integer.parseInt(tCases));
                stats.setDeaths(Integer.parseInt(tDeaths));
                stats.setNewCases(nCases);
                stats.setNewDeaths(nDeaths);
                stats.setHospitalized(Integer.parseInt(hospitalized));
                stats.setHospitalizedCum(Integer.parseInt(hospitalizedCum));
                stats.setHospitalizedCur(Integer.parseInt(hospitalizedCur));
                stats.setHospitalizedInc(Integer.parseInt(hospitalizedInc));

                stats.setVaccinesDistributed(Integer.parseInt(distributed));
                stats.setFirstDose(Integer.parseInt(firstDose));
                stats.setSecondDose(Integer.parseInt(secondDose));
                stats.setDailyVaccinated( Integer.parseInt(dailyVaccinated));

                double casePercent = statePop > 0 ? (double) stats.getCases() / statePop : 0;
                double deathPercent = statePop > 0 ? (double) stats.getDeaths() / statePop : 0;
                double hospitalPercent = statePop > 0 ? (double) stats.getHospitalized() / statePop : 0;
                double newCasePercent = statePop > 0 ? (double) stats.getNewCases() / statePop : 0;
                double newDeathPercent = statePop > 0 ? (double) stats.getNewDeaths() / statePop : 0;
                double distributedPercent = statePop > 0 ? (double) stats.getVaccinesDistributed() / statePop : 0;
                double firstDosePercent = statePop > 0 ? (double) stats.getFirstDose() / statePop : 0;
                double secondDosePercent = statePop > 0 ? (double) stats.getSecondDose() / statePop : 0;
                double dailyVaccinatedPercent = statePop > 0 ? (double) stats.getDailyVaccinated() / statePop : 0;
                stats.setCasesPercent(casePercent * 100);
                stats.setDeathsPercent(deathPercent * 100);
                stats.setHospitalizedPercent(hospitalPercent * 100);
                stats.setNewCasesPercent(newCasePercent * 100);
                stats.setNewDeathsPercent(newDeathPercent * 100);
                stats.setDistributedPercent(distributedPercent * 100);
                stats.setFirstDosePercent(firstDosePercent * 100);
                stats.setSecondDosePercent(secondDosePercent * 100);
                stats.setDailyVaccinatedPercent(dailyVaccinatedPercent * 100);

                state.addStats(stats);

                String[] todayCountyNext;
                String[] yesterdayCountyNext;
                todayCountyCSVReader.readNext();
                yesterdayCountyCSVReader.readNext();

                DBCollection stateCollection;
                if (!db.collectionExists(tState)) {
                    stateCollection = db.createCollection(tState, null);
                } else {
                    stateCollection = db.getCollection(tState);
                }

                countiesPop = countiesPops.get(tState);
                while ((yesterdayCountyNext = yesterdayCountyCSVReader.readNext()) != null) {
                    todayCountyNext = todayCountyCSVReader.readNext();
                    String tState2 = yesterdayCountyNext[1];
                    if (tState.equals(tState2)) {
                        String tCounty = todayCountyNext[0];
                        String tCases2 = todayCountyNext[3];
                        String tDeaths2 = todayCountyNext[4];

                        String yCases2 = yesterdayCountyNext[3];
                        String yDeaths2 = yesterdayCountyNext[4];

                        int nCases2 = Integer.parseInt(tCases2) - Integer.parseInt(yCases2);
                        int nDeaths2 = Integer.parseInt(tDeaths2) - Integer.parseInt(yDeaths2);

                        String countyFIPS = todayCountyNext[2];

                        County county = new County();
                        county.setName(tCounty);
                        county.setFips(countyFIPS);

                        int countyPop = 0;
                        if (!tState.equals("District of Columbia")) {
                            if (countiesPop.get(tCounty) != null) {
                                countyPop = Integer.parseInt(countiesPop.get(tCounty));
                            }
                        }

                        Statistics stats2 = new Statistics();
                        stats2.setCases(Integer.parseInt(tCases2));
                        stats2.setDeaths(Integer.parseInt(tDeaths2));
                        stats2.setNewCases(nCases2);
                        stats2.setNewDeaths(nDeaths2);

                        casePercent = countyPop > 0 ? (double) stats2.getCases() / countyPop : 0;
                        deathPercent = countyPop > 0 ? (double) stats2.getDeaths() / countyPop : 0;
                        newCasePercent = countyPop > 0 ? (double) stats2.getNewCases() / countyPop : 0;
                        newDeathPercent = countyPop > 0 ? (double) stats2.getNewDeaths() / countyPop : 0;

                        stats2.setCasesPercent(casePercent * 100);
                        stats2.setDeathsPercent(deathPercent * 100);
                        stats2.setNewCasesPercent(newCasePercent * 100);
                        stats2.setNewDeathsPercent(newDeathPercent * 100);

                        county.addStats(stats2);
                        state.addCounty(county);
                    }
                }
                stateDate.setState(state);
                if (!stateCollection.find(new BasicDBObject("date", firstDay.toString())).hasNext()) {
                    Gson gson = new Gson();
                    BasicDBObject obj = (BasicDBObject) JSON.parse(gson.toJson(stateDate));
                    stateCollection.insert(obj);
                    statesDate.addState(state);
                }
            }
            DBCollection allStateCollection;
            if (!db.collectionExists("All States")) {
                allStateCollection = db.createCollection("All States", null);
            } else {
                allStateCollection = db.getCollection("All States");
            }
            if (!allStateCollection.find(new BasicDBObject("date", firstDay.toString())).hasNext()) {
                Gson allStateGson = new Gson();
                BasicDBObject allStates = (BasicDBObject) JSON.parse(allStateGson.toJson(statesDate));
                allStateCollection.insert(allStates);
            }
            if (!usCollection.find(new BasicDBObject("date", firstDay.toString())).hasNext()) {
                unitedStates.addStats(totalStats);
                Gson gson = new Gson();
                BasicDBObject obj = (BasicDBObject) JSON.parse(gson.toJson(unitedStates));
                usCollection.insert(obj);
            } else {
                return;
            }
        }
    }

}
