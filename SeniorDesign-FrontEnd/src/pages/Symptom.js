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
import Support from "../img/be-kind-to-support.jpg";
import {Grid} from "@material-ui/core";
import styles from '../App.module.css';
const Symptom = () => {
  return (
    <div style={{ margin: "20px" }}>
      <Tabs>
        <TabList>
          <Tab><strong>Overview</strong></Tab>
          <Tab><strong>Symptoms</strong></Tab>
          <Tab><strong>Prevention</strong></Tab>
          <Tab><strong>Treatments</strong></Tab>
        </TabList>

        <TabPanel>
          <p>
            A coronavirus identified in 2019, SARS-CoV-2, has caused a pandemic of respiratory illness, called COVID-19.
          </p>
          <p>
            Most people who become ill from COVID-19 will experience mild to
            moderate symptoms and recover without special treatment.
          </p>
          <br/>
          <hr />
          <br/>
          <p>HOW IT SPREADS</p>
          <p>
            The virus that causes COVID-19 is mainly transmitted through
            droplets generated when an infected person coughs, sneezes, or
            exhales. These droplets are too heavy to hang in the air, and
            quickly fall on floors or surfaces.
          </p>
          <p>
            You can be infected by breathing in the virus if you are within
            close proximity of someone who has COVID-19, or by touching a
            contaminated surface and then your eyes, nose or mouth.
          </p>
          <br/>
          <img src={Spread} style={{ height: 350 }} />
        </TabPanel>
        <TabPanel>
          <p>
            COVID-19 affects different people in different ways. Most infected
            people will develop mild to moderate illness and recover without
            hospitalization.
          </p>
          <br/>
          <Tabs>
            <TabList>
              <Tab>Most common symptoms:</Tab>
              <Tab>Less common symptoms:</Tab>
              <Tab>Serious symptoms:</Tab>
            </TabList>
            <TabPanel>
              <ul>
                <li>fever</li>
                <li>dry cough</li>
                <li>tiredness</li>
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                <li>aches and pains</li>
                <li>sore throat</li>
                <li>diarrhoea</li>
                <li>conjunctivitis</li>
                <li>headache</li>
                <li>loss of taste or smell</li>
                <li>a rash on skin, or discolouration of fingers or toes</li>
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                <li>difficulty breathing or shortness of breath</li>
                <li>chest pain or pressure</li>
                <li>loss of speech or movement</li>
              </ul>
              <br/>
              <p>
                Seek immediate medical attention if you have serious symptoms.
                Always call before visiting your doctor or health facility.
              </p>
              <br/>
              <img src={Doctor} style={{ height: 350 }} />
              <p>
                People with mild symptoms who are otherwise healthy should manage
                their symptoms at home.
              </p>
              <p>
                On average it takes 5–6 days from when someone is infected with the
                virus for symptoms to show, however it can take up to 14 days.
              </p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <p>
            Protect yourself and others around you by knowing the facts and
            taking appropriate precautions. Follow advice provided by your local
            public health agency. To prevent the spread of COVID-19:
          </p>
          <br/>
          <Tabs>
            <TabList>
              <Tab>Clean hand</Tab>
              <Tab>Social Distance</Tab>
              <Tab>Don't touch eyes, nose, mouth</Tab>
              <Tab>Avoid when cough or sneeze</Tab>
              <Tab>Stay home</Tab>
              <Tab>Follow the directions of health authority</Tab>
            </TabList>
            <TabPanel>
                <p>Clean your hands often. Use soap and water, or an alcohol-based hand rub.</p>
                <br/>
                <img src={CleanHand} style={{ height: 350, width: 550 }} />
            </TabPanel>
            <TabPanel>
              <p>Maintain a safe distance from anyone who is coughing or sneezing.</p>
              <br/>
              <img src={Distance} style={{ height: 350, width: 550 }} />
            </TabPanel>
            <TabPanel>
              <p>Don’t touch your eyes, nose or mouth.</p>
              <br/>
              <img src={Touch} style={{ height: 350, width: 550 }} />
            </TabPanel>
            <TabPanel>
              <p>Cover your nose and mouth with your bent elbow or a tissue when
                you cough or sneeze.</p>
              <br/>
              <img src={Cover} style={{ height: 350, width: 550 }} />
            </TabPanel>
            <TabPanel>
              <p>Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical
                attention. Call in advance.</p>
              <br/>
              <br/>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <p/>
                </Grid>
                <Grid item xs={3}>
                <p><img src={Stayhome} style={{ height: 350, width: 550 }} /></p>
                </Grid>
                <Grid item xs={1}>
                  <p/>
                </Grid>
                <Grid item xs={3}>
                <p><img src={Call} style={{ height: 350, width: 550 }} /></p>
                </Grid>
                <Grid item xs={1}>
                  <p/>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>
                Avoiding unneeded visits to medical facilities allows healthcare
                systems to operate more effectively, therefore protecting you and
                others.
              </p>
              <br/>
              <img src={Support} style={{ height: 350, width: 550 }} />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <p>
            To date, there are no specific vaccines or medicines for COVID-19.
            Treatments are under investigation, and will be tested through
            clinical trials. World Health Organization
          </p>
          <br/>
          <hr />
          <br/>
          <p>Self-care</p>
          <p>
            If you feel sick you should rest, drink plenty of fluid, and eat
            nutritious food. Stay in a separate room from other family members,
            and use a dedicated bathroom if possible. Clean and disinfect
            frequently touched surfaces.
          </p>
          <p>
            Everyone should keep a healthy lifestyle at home. Maintain a healthy
            diet, sleep, stay active, and make social contact with loved ones
            through the phone or internet. Children need extra love and
            attention from adults during difficult times. Keep to regular
            routines and schedules as much as possible.
          </p>
          <p>
            It is normal to feel sad, stressed, or confused during a crisis.
            Talking to people you trust, such as friends and family, can help.
            If you feel overwhelmed, talk to a health worker or counsellor.
          </p>
          <p>Medical treatments</p>
          <p>
            If you have mild symptoms and are otherwise healthy, self-isolate
            and contact your medical provider or a COVID-19 information line for
            advice.
          </p>
          <p>
            Seek medical care if you have a fever, a cough, and difficulty
            breathing. Call in advance.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Symptom;
