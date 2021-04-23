import React from "react";
import "../App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CleanHand from "../img/bob_covid_large.jpg";
import Distance from "../img/social-distancing-together-6-feet.webp";
import Doctor from "../img/cartoon.jpg";
import Spread from "../img/spread.png";
import Touch from "../img/touch.jpg";
import Cover from "../img/Coronavirus-EN-2.png";
import Stayhome from "../img/download.jfif";
import Call from "../img/original.jfif";
const Symptom = () => {
  return (
    <div style={{ margin: "20px" }}>
      <Tabs>
        <TabList>
          <Tab><strong>General Use</strong></Tab>
          <Tab><strong>lossary</strong></Tab>
          <Tab><strong>Sources</strong></Tab>
        </TabList>

        <TabPanel>
          <p><strong>
            Here are some helpful tips for using this Covid Tracker:
          </strong></p>
          <br/>
          <br/>
          <ul>
            <li>Begin by clicking on the date displayed on the home page. This will display a calendar for you to select what day you would like to see data for.
              The most recently available day will always be yesterday because it takes some time for public data sources to update.
              By default, the home page will load data for the most recent day. NOTE: The oldest data begins at January 21st, 2020.<br/></li>
            <br/>
            <li>There are green buttons at the top of the page that correspond to different types of data.
              Click any of the buttons to modify the map and graphs according to the data you would like to display.
              For visual clarity, each data type uses a unique color theme.
              NOTE: The data source for hospitalization data has been discontinued, and that button is not available after March 7th 2021.
              Similarly, publicly available vaccine data began on January 12th, and therefore is not available before then.<br/></li>
            <br/>
            <li> Once you select the date and data you would like to see, please scroll across our interactive map of the U.S.!
              The map begins in the U.S. view.
              Hover the mouse over any state to see a tooltip representing the number of the data for that day, as well as what percentage of the population in that state is represented by the data.
              Left-click on any state to zoom into the state view and see a similar display for all the individual counties. Right-click within the map to zoom back out to the U.S. view.
              As you zoom into a state, a button will pop up nearby. Clicking this button will open additional tabs that display graphs and news for that state.
              If you click on a county, the graphs and news will update relative to the county that was selected.
              The map displays a legend with a choropleth effect that shades states and counties based on the percentage of people affected in those areas relative to its population.</li>
            <br/>
            <li>There is also a graph on the home page that displays data for the entire U.S.!
              All graphs provide the option to view trends for the last week, month, or year based on the date selected.<br/></li>
            <br/>
            <li> The News tab queries articles related to Covid in the state/county that is selected.
              The date selected determines what date the most recent article must be published by to be shown.
              NOTE: News articles older than a month before the present date will not be returned.<br/></li>
            <br/>
            <li>Finally, we have a search bar that allows users to quickly find the information they are interested in.
              Begin typing a state or county name to narrow down the search bar to a list of options that when chosen will handle selecting the data options for you.
              This feature is especially useful if you know the name of a state or county but not the location of it on the map.<br/></li>
          </ul>
        </TabPanel>
        <TabPanel>
          <p>
            <strong>NOTE:</strong>  All data types display stats relative to the currently selected day and map region being viewed, and update accordingly.
            For dates when either Hospitalization or Vaccination data is not available, the button will be replaced with an asterisk to indicate this is the reason.
            Also, these two data types were not provided for county data, and indicate that within the map.
          </p>
        <br/>
          <ul>
            <li><p>
              Cases: Total cases of Covid-19 up to the selected date within the current region (including both confirmed and probable).
            </p></li>
            <br/>
            <li> <p>
              New Cases: Total new cases of Covid-19 recorded in just the current day selected.
            </p></li>
            <br/>
            <li> <p>
              Deaths: Total deaths from Covid-19 up the selected date (including both confirmed and probable).
            </p></li>
            <br/>
            <li><p>
              Hospitalizations: Total number of people hospitalized due to Covid-19.
            </p></li>
            <br/>
            <li><p>
              Vaccinations: Total number of people who are documented as fully vaccinated (having received second or final dose).
              Our vaccination data contains multiple stats which are all displayed in the vaccination graphs.
            </p></li>
            <br/>
            <li> <p>
              Vaccines Distributed: Total number of all vaccines delivered.
            </p></li>
            <br/>
            <li><p>
              Daily Vaccinations: Total number of people who were vaccinated that day.
            </p></li>
            <br/>
            <li><p>
              Second Dose: Total number of people who have received their second or last vaccine dose.
            </p></li>
            <br/>
            <li><p>
              First Dose: Total number of people who have received the first dose of their vaccine.
            </p></li>
          </ul>
        </TabPanel>
        <TabPanel>
          <p>
            <strong>DATA SOURCES</strong>
          </p>
          <br />
          <ul>
            <li>The New York times: https://github.com/nytimes/covid-19-data</li>
            <li>Our World in Data: https://github.com/owid/covid-19-data</li>
            <li>The COVID Tracking Project: https://covidtracking.com/</li>
          </ul>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default Symptom;
