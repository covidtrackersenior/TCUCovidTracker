package tcu.edu.covidtracker.backend.automation.utilities;

import com.google.common.collect.Lists;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.junit.Test;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Component
public class CSVParser {

    @Test
    public void vaccinationState() {
        try {
            ArrayList<ArrayList<String>> csvLines = sortVaccinationCSV();
            LinkedHashMap<String, String> baseline = stateBaseLine("vaccination");
            LinkedHashMap<String, ArrayList> dates = new LinkedHashMap<>();
            for (ArrayList<String> line : csvLines) {
                String date = line.get(0);
                String state = line.get(1);
                if (state.equals("New York State")) {
                    state = "New York";
                }
                if (baseline.containsKey(state)) {
                    String fips = baseline.get(state).split(",")[1];
                    System.out.println(line);
                    String data = state + "," + fips + "," + line.get(3) + "," + line.get(4) + "," + line.get(7) + "," + line.get(11);
                    createMap(dates, date, data);
                }
            }
            vaccinationStateCumulative(dates, baseline);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void nytimesState() {
        try {
            LinkedHashMap<String, String> baseline = stateBaseLine("nytimes");
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/nytimes-state.csv"));
            CSVReader csvReader = new CSVReader(reader);
            LinkedHashMap<String, ArrayList> dates = new LinkedHashMap<>();
            String[] nextRecord;
            csvReader.readNext();
            while ((nextRecord = csvReader.readNext()) != null) {
                String date = nextRecord[0];
                String data = nextRecord[1] + "," + nextRecord[2] + "," + nextRecord[3] + "," + nextRecord[4];
                createMap(dates, date, data);
            }
            nytimesStateCumulative(dates, baseline);
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
    }

    public void nytimesCounty() {
        try {
            LinkedHashMap<String, String> baseline = countyBaseLine();
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/nytimes-county.csv"));
            CSVReader csvReader = new CSVReader(reader);
            LinkedHashMap<String, ArrayList> dates = new LinkedHashMap<>();
            String[] nextRecord;
            csvReader.readNext();
            while ((nextRecord = csvReader.readNext()) != null) {
                String date = nextRecord[0];
                String data = nextRecord[1] + "," + nextRecord[2] + "," + nextRecord[3] + "," + nextRecord[4] + "," + nextRecord[5];
                createMap(dates, date, data);
            }
            nytimesCountyCumulative(dates, baseline);
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
    }

    public void covidtrackingState() {
        try {
            LinkedHashMap<String, String> baseline = stateBaseLine("covidtracking");
            LinkedHashMap<String, String> stateKeys = stateAbbreviations();
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/covidtracking-state.csv"));
            CSVReader csvReader = new CSVReader(reader);
            LinkedHashMap<String, ArrayList> dates = new LinkedHashMap<>();
            String[] nextRecord;
            csvReader.readNext();
            while ((nextRecord = csvReader.readNext()) != null) {
                String date = nextRecord[0];
                String vals = stateKeys.get(nextRecord[1]);
                String[] valsArray;
                String state;
                String fips;
                if (vals != null) {
                    valsArray = vals.split(",");
                    state = valsArray[0];
                    fips = valsArray[1];
                } else {
                    continue;
                }
                String hospitalized = !nextRecord[6].equals("") ? nextRecord[6] : "0";
                String hospitalizedCum = !nextRecord[7].equals("") ? nextRecord[7] : "0";
                String hospitalizedCur = !nextRecord[8].equals("") ? nextRecord[8] : "0";
                String hospitalizedInc = !nextRecord[9].equals("") ? nextRecord[9] : "0";
                String data = state + "," + fips + "," + hospitalized + "," + hospitalizedCum + "," + hospitalizedCur + "," + hospitalizedInc;
                createMap(dates, date, data);
            }
            covidtrackingCumulative(dates, baseline);
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
    }

    private LinkedHashMap<String, String> countyBaseLine() throws IOException, CsvValidationException {
        Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/counties.csv"));
        CSVReader csvReader = new CSVReader(reader);
        LinkedHashMap<String, String> keys = new LinkedHashMap<>();
        String[] nextRecord;
        while ((nextRecord = csvReader.readNext()) != null) {
            String fips = nextRecord[2];
            String state = nextRecord[1];
            String county = nextRecord[0];
            String data = county + "," + state + "," + fips + ",0,0";
            if (!fips.equals("")) {
                if (Integer.parseInt(fips) < 57000) {
                    keys.put(fips, data);
                }
            }
        }
        return keys;
    }

    private LinkedHashMap<String, String> stateBaseLine(String source) throws IOException, CsvValidationException {
        Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/states.csv"));
        CSVReader csvReader = new CSVReader(reader);
        LinkedHashMap<String, String> keys = new LinkedHashMap<>();
        String[] nextRecord;
        while ((nextRecord = csvReader.readNext()) != null) {
            String fips = nextRecord[1];
            String state = nextRecord[0];
            String data;
            if (source.equals("nytimes")) {
                data = state + "," + fips + ",0,0";
            } else if (source.equals("vaccination")) {
                data = state + "," + fips + ",0,0,0,0";
            } else {
                data = state + "," + fips + ",0,0,0,0";
            }
            if (source.equals("vaccination")) {
                keys.put(state, data);
                continue;
            }
            if (!fips.equals("")) {
                if (Integer.parseInt(fips) < 57) {
                    keys.put(fips, data);
                }
            }
        }
        return keys;
    }

    public void createMap(LinkedHashMap<String, ArrayList> dates, String key, String data) {
        if (dates.containsKey(key)) {
            ArrayList<String> cur = dates.get(key);
            cur.add(data);
            dates.put(key, cur);
        } else {
            ArrayList<String> newData = new ArrayList<>();
            newData.add(data);
            dates.put(key, newData);
        }
    }

    public void nytimesCountyCumulative(LinkedHashMap<String, ArrayList> dates, LinkedHashMap<String, String> baseline) {
        try {
            for (Map.Entry<String, ArrayList> entry : dates.entrySet()) {
                String key = entry.getKey();
                File csv = new File("src/main/resources/csv/download/nytimes/county/" + key + ".csv");
                FileWriter fw = new FileWriter(csv);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write("county,state,fips,cases,deaths\n");
                ArrayList<String> value = entry.getValue();
                for (int i = 0; i < value.size(); i++) {
                    String cur = value.get(i);
                    String fips = cur.split(",")[2];
                    if (!fips.equals("")) {
                        if (Integer.parseInt(fips) < 57000) {
                            baseline.put(fips, cur);
                        }
                    }
                }
                for (Map.Entry<String, String> fips : baseline.entrySet()) {
                    String val = fips.getValue();
                    bw.write(val+"\n");
                }
                bw.flush();
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void nytimesStateCumulative(LinkedHashMap<String, ArrayList> dates, LinkedHashMap<String, String> baseline) {
        try {
            for (Map.Entry<String, ArrayList> entry : dates.entrySet()) {
                String key = entry.getKey();
                File csv = new File("src/main/resources/csv/download/nytimes/state/" + key + ".csv");
                FileWriter fw = new FileWriter(csv);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write("state,fips,cases,deaths\n");
                ArrayList<String> value = entry.getValue();
                for (int i = 0; i < value.size(); i++) {
                    String cur = value.get(i);
                    String fips = cur.split(",")[1];
                    if (!fips.equals("")) {
                        if (Integer.parseInt(fips) < 57) {
                            baseline.put(fips, cur);
                        }
                    }
                }
                for (Map.Entry<String, String> fips : baseline.entrySet()) {
                    String val = fips.getValue();
                    bw.write(val+"\n");
                }
                bw.flush();
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void vaccinationStateCumulative(LinkedHashMap<String, ArrayList> dates, LinkedHashMap<String, String> baseline) {
        try {
            for (Map.Entry<String, ArrayList> entry : dates.entrySet()) {
                String key = entry.getKey();
                File csv = new File("src/main/resources/csv/download/vaccination/state/" + key + ".csv");
                FileWriter fw = new FileWriter(csv);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write("state,fips,distributed,vaccinated,fully_vaccinated,daily_vaccinated\n");
                ArrayList<String> value = entry.getValue();
                for (int i = 0; i < value.size(); i++) {
                    String cur = value.get(i);
                    baseline.put(cur.split(",")[0], cur);
                }
                for (Map.Entry<String, String> fips : baseline.entrySet()) {
                    String val = fips.getValue();
                    bw.write(val+"\n");
                }
                bw.flush();
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void covidtrackingCumulative(LinkedHashMap<String, ArrayList> dates, LinkedHashMap<String, String> baseline) {
        try {
            for (Map.Entry<String, ArrayList> entry : dates.entrySet()) {
                String key = entry.getKey();
                File csv = new File("src/main/resources/csv/download/covidtracking/state/" + key + ".csv");
                FileWriter fw = new FileWriter(csv);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write("state,fips,hospitalized,hospitalizedCumulative,hospitalizedCurrently,hospitalizedIncrease\n");
                ArrayList<String> value = entry.getValue();
                System.out.println(key);
                System.out.println(value);
                for (int i = 0; i < value.size(); i++) {
                    String cur = value.get(i);
                    String fips = cur.split(",")[1];
                    baseline.put(fips, cur);
                }
                for (Map.Entry<String, String> fips : baseline.entrySet()) {
                    String val = fips.getValue();
                    bw.write(val+"\n");
                }
                bw.flush();
                bw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public LinkedHashMap<String, String> stateAbbreviations() throws IOException, CsvValidationException {
        LinkedHashMap<String,String> stateKeys = new LinkedHashMap<>();
        Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/abbrev-states.csv"));
        CSVReader csvReader = new CSVReader(reader);
        String[] nextRecord;
        while ((nextRecord = csvReader.readNext()) != null) {
            String abbreviation = nextRecord[0];
            String state = nextRecord[1];
            String fips = nextRecord[2];
            stateKeys.put(abbreviation, state + "," + fips);
        }
        return stateKeys;
    }

    public ArrayList<ArrayList<String>> sortVaccinationCSV() {
        try {
            Reader reader = Files.newBufferedReader(Paths.get("src/main/resources/csv/master/vaccination-data.csv"));
            CSVReader csvReader = new CSVReader(reader);
            ArrayList<ArrayList<String>> csvLines = new ArrayList<>();
            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                ArrayList<String> line = Lists.newArrayList(nextRecord);
                csvLines.add(line);
            }
            Comparator<ArrayList<String>> comp = Comparator.comparing(o -> o.get(0));
            Collections.sort(csvLines, comp);
            return csvLines;
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
        return null;
    }
}
