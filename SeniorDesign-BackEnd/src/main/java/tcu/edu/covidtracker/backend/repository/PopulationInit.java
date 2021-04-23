package tcu.edu.covidtracker.backend.repository;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.stereotype.Component;

@Component
public class PopulationInit {

    MongoClientURI uri = new MongoClientURI(
            "mongodb://root:4x7NOpp0OFnpl1qD@cluster0-shard-00-00.i4jnr.mongodb.net:27017,cluster0-shard-00-01.i4jnr.mongodb.net:27017,cluster0-shard-00-02.i4jnr.mongodb.net:27017/Population?ssl=true&replicaSet=atlas-11ucwv-shard-0&authSource=admin&retryWrites=true&w=majority");
    MongoClient mongoClient = new MongoClient(uri);
    DB db = mongoClient.getDB("Population");

    public DBCollection getCollection(String name) {
        return db.getCollection(name);
    }
}
