package tcu.edu.covidtracker.backend;

import com.google.common.base.Charsets;
import com.google.common.io.ByteSource;
import org.junit.Test;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CurlTest {

    @Test
    public void countyTest() throws IOException {
        String command = "curl https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv > today.csv";
        ProcessBuilder processBuilder = new ProcessBuilder(command.split(" " ));

//        processBuilder.directory(new File("src/main/resources/csv"));
        Process process = processBuilder.start();

        InputStream inputStream = process.getInputStream();
        ByteSource byteSource = new ByteSource() {
            @Override
            public InputStream openStream() throws IOException {
                return inputStream;
            }
        };

        String text = byteSource.asCharSource(Charsets.UTF_8).read();

        Date today = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fileName = dateFormat.format(today);
        File county = new File("src/main/resources/csv/" + fileName + ".csv");
        BufferedWriter writer = new BufferedWriter(new FileWriter(county));
        writer.write(text);
        writer.flush();
        writer.close();

        System.out.println(text);

        process.destroy();
    }
}
