import React from 'react';
import '../App.css';
import Spread from '../img/spread.png';
import cuong from '../img/cuong.png';
import zach from '../img/zach.png';
import nick from '../img/nick.png';
import joe from '../img/joe.png';
import damon from '../img/damon.png';
import {Grid} from "@material-ui/core";

const About = () => (
  <div
    style={{
      backgroundColor: 'white',
      textAlign: 'center',
    }}
  >
    <br />
      <h2>About us</h2>
      <br/>
      <Grid container spacing={1}>
          <Grid item xs={1}>
              <p/>
          </Grid>
          <Grid item xs={2}>
              <img src={cuong} style={{ height: 250, width: 250 }} />
              <p> Cuong Nguyen </p>
          </Grid>
          <Grid item xs={2}>
              <img src={zach} style={{ height: 250, width: 250 }} />
              <p> Zach Macadam </p>
          </Grid>
          <Grid item xs={2}>
              <img src={nick} style={{ height: 250, width: 250 }} />
              <p> Nicholas Bell </p>
          </Grid>
          <Grid item xs={2}>
              <img src={damon} style={{ height: 250, width: 250 }} />
              <p> Damon Ramirez </p>
          </Grid>
          <Grid item xs={2}>
              <img src={joe} style={{ height: 250, width: 250 }} />
              <p> Joe Donoghue </p>
          </Grid>
      </Grid>
      <br/>
      <br/>
    <div
      style={{
        padding: '20px',
        backgroundColor: 'grey',
        color: 'white',
        margin: '20px',
        borderRadius: '20px',
      }}
    >
      <h4>We are Covid Tracker Team</h4>
      <div style={{ fontSize: '20px' }}>
        Our team aims to support users in the United States by providing accurate and timely information regarding COVID-19. We understand this issue concerns everybody in the US right now, and that’s why our primary goal is to create software that emphasizes user-friendliness and reliability. Information this important needs to be accessible for all, and that knowledge allows us to make wiser decisions. To achieve this, our software features a web dashboard which displays an interactive map of the US, along with supplementary analysis and additional news.
      </div>
      <br />
      <h4>Want to know more about us?</h4>
      <div style={{ fontSize: '20px' }}>
        {' '}
        <a
          href="http://riogrande.cs.tcu.edu/2021CovidTracker/"
          target="_blank"
        >
          Click here
        </a>{' '}
      </div>
      <br />
    </div>
  </div>
);

export default About;
