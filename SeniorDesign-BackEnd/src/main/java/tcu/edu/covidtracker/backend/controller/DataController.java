package tcu.edu.covidtracker.backend.controller;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcu.edu.covidtracker.backend.automation.Scheduler;
import tcu.edu.covidtracker.backend.repository.CovidTrackerRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/data")
@Api(produces = "application/json", value = "Data needed to populate map of data pertaining to COVID-19")
public class DataController {

    @Autowired
    private CovidTrackerRepository mongoRepository;

    @Autowired
    private Scheduler scheduler;

    @PutMapping("/UpToDate")
    @ApiOperation(value = "Add the new day of data to the database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added new day of data.")
    }
    )
    public void addNewDay() {
        try {
            scheduler.downloadFiles();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/USByDate")
    @ApiOperation(value = "Get data for all of the United States", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved United States data.")
    }
    )
    public String USByDate(@ApiParam(value = "Date of the data you would like to retrieve") String date ) {
        return mongoRepository.USByDate(date);
    }

    @GetMapping("/USByDateRange")
    @ApiOperation(value = "Get data for all of the United States", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved United States data.")
    }
    )
    public String USByDateRange(@ApiParam(value = "Start Date") String start,
                                @ApiParam(value = "End Date") String end) {
        return mongoRepository.USByDateRange(start, end);
    }

    @GetMapping("/AllStatesByDate")
    @ApiOperation(value = "Get All data for a certain state", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved State data.")
    }
    )
    public String allStatesByDate(@ApiParam(value = "Date of the data you would like to retrieve") String date) {
        return mongoRepository.allStatesByDate(date);
    }


    @GetMapping("/OneStateByDate")
    @ApiOperation(value = "Get data for a certain state", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved State data.")
    }
    )
    public String oneStateByDate(@ApiParam(value = "Date of the data you would like to retrieve") String date,
                                         @ApiParam(value = "The id of the State") String state){
        return mongoRepository.oneStateByDate(date, state);
    }


    @GetMapping("/StateWithCountiesByDateRange")
    @ApiOperation(value = "Get data for a state between certain dates", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrived county data.")
    })
    public String stateWithDateRange(@ApiParam(value = "Start date") String start,
                                                    @ApiParam(value = "End date") String end,
                                                    @ApiParam(value = "The id of the State") String state) {
        return mongoRepository.stateWithByDateRange(start, end, state);
    }

    @GetMapping("/StateNoCountiesByDateRange")
    @ApiOperation(value = "Get data for a state between certain dates", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrived county data.")
    })
    public String stateWithoutDateRange(@ApiParam(value = "Start date of the data you would like to retrieve") String start,
                                         @ApiParam(value = "End date of the data you would like to retrieve") String end,
                                         @ApiParam(value = "The id of the State") String state) {
        return mongoRepository.stateWithoutByDateRange(start, end, state);
    }

    @GetMapping("/CountyByDate")
    @ApiOperation(value = "Get data for a certain county", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved State data.")
    }
    )
    public String countyByDate(@ApiParam(value = "Date of the data you would like to retrieve") String date,
                                 @ApiParam(value = "The id of the State") String state,
                                  @ApiParam(value = "The name of the county") String county){
        return mongoRepository.countyByDate(date, state, county);
    }

    @GetMapping("/CountyByDateRange")
    @ApiOperation(value = "Get data for a certain county", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved State data.")
    }
    )
    public String countyByDateRange(@ApiParam(value = "Start date of the data you would like to retrieve") String start,
                                  @ApiParam(value = "End date of the data you would like to retrieve") String end,
                                  @ApiParam(value = "The id of the State") String state,
                                  @ApiParam(value = "The name of the county") String county){
        return mongoRepository.countyByDateRange(start, end, state, county);
    }

}
