import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const url1 = 'http://ec2-3-83-230-148.compute-1.amazonaws.com:8080/'
const mapurl = '/api/data/';


// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async() => {
    try {
        const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async() => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
};

//= ================================================================================================================================================================//
// Map data//
// Chart Data 1 Date
export const fetchUSByDate = async(date) => {
    let changeableUrl = url1;

    if (date) {
        changeableUrl = `${url1}${mapurl}USByDate?date=${date}`;
        // console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        return data.data;
    } catch (error) {
        return error;
    }
};
// Chart US Data by Date Range
export const fetchUSByDateRange = async(startDate, endDate) => {
    let changeableUrl = mapurl;

    if (startDate && endDate) {
        changeableUrl = `${url1}${mapurl}USByDateRange?start=${startDate}&&end=${endDate}`;
        // console.log(changeableUrl);
    }

    try {
        let { data } = await axios.get(changeableUrl);
        // const { stats } = data;
//        console.log(data);
//        console.log(data[0].stats[0].cases);
        data = data.map(({ stats, date }) => ({ stats, date }));
        //removed data.reverse()
        return data;
    } catch (error) {
        return error;
    }
};

//
export const fetchStateNoCountiesByDateRange = async(startDate, endDate, stateName) => {
    let changeableUrl = mapurl;

    if (startDate && endDate && stateName) {
        changeableUrl = `${url1}${mapurl}StateNoCountiesByDateRange?start=${startDate}&&end=${endDate}&&state=${stateName}`;
//        console.log(changeableUrl);
    }

    try {
        const { data } = await axios.get(changeableUrl);
//        console.log(data);
//        console.log(data[0]);
        // data.map(({ stats, date }) => ({ stats, date }));
        //removed data.reverse()
        return data;
    } catch (error) {
        return error;
    }
};

// Chart US Data by Date Range using One State by Date
export const fetchOneStateByDateRange = async(endDate, stateName) => {
    let changeableUrl = mapurl;
    // const stateDates = [];
    // const stateCases = [];
    const stateArray = [];
    let curDate = new Date();
    const yyyy = '2021';
    const mm = '03';
    let dayCount = 1;
    curDate = `${yyyy}-${mm}-0${dayCount}`;

    if (endDate && stateName) {
        changeableUrl = `${url1}${mapurl}OneStateByDate?date=${curDate}&&state=${stateName}`;
        // console.log(changeableUrl);
    }

    try {
        let i = 0;
        let data = await axios.get(changeableUrl);
        while (curDate !== endDate) {
            // console.log(data);
            stateArray[i] = data;
            // console.log(stateArray);
            i += 1;
            dayCount += 1;
            curDate = `${yyyy}-${mm}-${dayCount}`;
            if (dayCount < 10) {
                curDate = `${yyyy}-${mm}-0${dayCount}`;
            }
            changeableUrl = `${url1}${mapurl}OneStateByDate?date=${curDate}&&state=${stateName}`;
            data = await axios.get(changeableUrl);
        }
        // const { data } = await axios.get(changeableUrl);
        // return data.reverse();
        return stateArray;
    } catch (error) {
        return error;
    }
};

export const fetchAllStatesByDate = async(date) => {
    let changeableUrl = mapurl;

    if (date) {
        changeableUrl = `${url1}${mapurl}AllStatesByDate?date=${date}`;
        // console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        return data.data;
        console.log(data.data);
    } catch (error) {
        return error;
    }
};

export const fetchCountyByDate = async(state, date) => {
    let changeableUrl = mapurl;
    if (date) {
        changeableUrl = `${url1}${mapurl}OneStateByDate?date=${date}&&state=${state}`;
        console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        console.log(data.data);
        console.log(data.data.state);
        return data.data;
    } catch (error) {
        return error;
    }
};

export const fetchCountyByDateRange = async(startDate, endDate, stateName, countyName) => {
    let changeableUrl = mapurl;
    if(startDate && endDate && countyName){
        changeableUrl = `${url1}${mapurl}CountyByDateRange?start=${startDate}&&end=${endDate}&&state=${stateName}&&county=${countyName}`;
        console.log(changeableUrl);
    }
    try {
        const data = await axios.get(changeableUrl);
        console.log(data);
        return data.data;
    } catch (error){
        return error;
    }
};