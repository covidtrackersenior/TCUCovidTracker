import React from 'react';
import { Card, Paper, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
//import '../../../App.css'

import styles from './Card.module.css';

const CardComponent = ({ className, cardTitle, value, lastUpdate, cardSubtitle }) => (
  <Grid item xs={12} md={2} component={Paper} className={cx(styles.card, className)}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h5" gutterBottom style={{marginBottom:"2em"}}>
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>

    </CardContent>
  </Grid>
);



export default CardComponent;

