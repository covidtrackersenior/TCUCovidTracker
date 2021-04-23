package tcu.edu.covidtracker.backend.automation;


import com.opencsv.exceptions.CsvValidationException;
import org.junit.Test;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tcu.edu.covidtracker.backend.automation.utilities.CSVParser;
import tcu.edu.covidtracker.backend.automation.utilities.MongoParser;

import java.io.IOException;

@Component
@EnableScheduling
public class Scheduler {

//    @Scheduled(cron = "0 0 2 * * *", zone = "CST")
    @Test
    public void downloadFiles() throws IOException, CsvValidationException {
        CSVParser csvParser = new CSVParser();
        cumulativeCountyTest();
        cumulativeStateTest();
        vaccineTest();
        csvParser.nytimesCounty();
        csvParser.nytimesState();
        csvParser.vaccinationState();
        MongoParser mongoParser = new MongoParser();
        mongoParser.dailyState();
    }

    @Test
    public void cumulativeCountyTest() throws IOException {
        CurlExecutor curlExecutor = new CurlExecutor();
        String url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";
        curlExecutor.executeCurl(url, "nytimes-county");
    }

    @Test
    public void cumulativeStateTest() throws IOException {
        CurlExecutor curlExecutor = new CurlExecutor();
        String url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";
        curlExecutor.executeCurl(url, "nytimes-state");
    }

    public void vaccineTest() throws IOException {
        CurlExecutor curlExecutor = new CurlExecutor();
        String url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/us_state_vaccinations.csv";
        curlExecutor.executeCurl(url, "vaccination-data");
    }

}
