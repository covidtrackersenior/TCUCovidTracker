package tcu.edu.covidtracker.backend.automation;

import com.google.common.base.Charsets;
import com.google.common.io.ByteSource;
import org.springframework.stereotype.Component;
import java.io.*;

@Component
public class CurlExecutor {

    public void executeCurl(String url, String fileName) throws IOException {
        String command = "curl " + url;
        ProcessBuilder processBuilder = new ProcessBuilder(command.split(" " ));
        Process process = processBuilder.start();

        InputStream inputStream = process.getInputStream();
        ByteSource byteSource = new ByteSource() {
            @Override
            public InputStream openStream() {
                return inputStream;
            }
        };

        String text = byteSource.asCharSource(Charsets.UTF_8).read();

        File county = new File("src/main/resources/csv/master/" + fileName + ".csv");
        BufferedWriter writer = new BufferedWriter(new FileWriter(county));

        writer.write(text);
        writer.flush();
        writer.close();

        process.destroy();
    }

}
