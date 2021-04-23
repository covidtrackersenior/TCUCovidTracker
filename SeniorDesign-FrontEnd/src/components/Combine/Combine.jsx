import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, News, Infos } from '..';
import range from 'lodash/range';
import { getMonth, getYear } from 'date-fns';
import '../../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'add-days';
import { Grid } from '@material-ui/core';
import SearchPage from '../SearchBar/SearchPage.js';
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from '../../api';
import styles from '../../App.module.css';

const Combine = () => {
  const [data, setData] = useState(null);
  const [statedata, setMapData] = useState(null);
  const [startDate, setStartDate] = useState(addDays(new Date(), -1));
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [test, settest] = useState(new Date());
  const currentDate = new Date(moment(startDate).format('YYYY-MM-DD'));
  const [cond, setCond] = useState(null);
  const march7 = new Date('2021-03-07');
  const jan21 = new Date('2020-01-22');
  let premarch7 = true;
  if (Date.parse(march7) < Date.parse(currentDate)) {
    premarch7 = false;
  }
  const Jan12 = new Date('2021-01-11');
  let prejan12 = false;
  if (Date.parse(Jan12) < Date.parse(currentDate)) {
    prejan12 = true;
  }
  useEffect(() => {
    // //console.log(today);
    settest((test) => test.setDate(test.getDate() - 1));
    setCond((cond) => 'cases');
  }, []);

  return (
    <div>
      {/* <div className={styles.container}> */}
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <div className={styles.search}>
            <div><SearchPage cond={cond} setCond={setCond} /></div>
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* <Grid> */}
          {/*    */}
          {/* </Grid> */}
          <div className={styles.btnContainer}>
            {/*    <div> */}
            {/* <Grid xs={2}> */}
            <div>

              <button className={`${styles.skewBtn} ${styles.blue}`} onClick={() => setCond('cases')}> Cases</button>
              {/* </Grid> */}
              {/* <Grid xs={2}> */}
              <button className={`${styles.skewBtn} ${styles.green}`} onClick={() => setCond('newcases')}> New Cases</button>
              {/* </Grid> */}
              {/* <Grid xs={2}> */}
              <button className={`${styles.skewBtn} ${styles.red}`} onClick={() => setCond('deaths')}> Deaths</button>
              {/* </Grid> */}
              {/* <Grid xs={2}> */}
              {prejan12 ? <button className={`${styles.skewBtn} ${styles.pink}`} onClick={() => setCond('vaccinations')}> Vaccinations</button> : 'Vaccinations*'}
              {/* </Grid> */}
              {/* <Grid xs={2}> */}
              {premarch7 ? (
                <button className={`${styles.skewBtn} ${styles.purple}`} onClick={() => setCond('hospitalizations')}> Hospitalizations
                </button>
              ) : 'Hospitalizations*'}
              {/* </Grid> */}

            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={styles.date}>
            <p> Change date: <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                      margin: 10,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      {'<'}
                    </button>
                  <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                          <option key={option} value={option}>
                              {option}
                            </option>
                        ))}
                    </select>

                  <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                    >
                      {months.map((option) => (
                          <option key={option} value={option}>
                              {option}
                            </option>
                        ))}
                    </select>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      {'>'}
                    </button>
                </div>
              )}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={addDays(new Date(), -1)}
              minDate={jan21}
            />
            </p>
          </div>
        </Grid>

      </Grid>
      <br />
      {/* </div> */}
      <USMap date={moment(startDate).format('YYYY-MM-DD')} cond={cond} />
    </div>
  );
};
export default Combine;
