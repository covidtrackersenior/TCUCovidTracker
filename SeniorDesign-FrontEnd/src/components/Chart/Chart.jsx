import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { fetchDailyData, fetchUSByDate, fetchUSByDateRange, fetchStateNoCountiesByDateRange, fetchCountyByDateRange } from '../../api';
import styles from './Chart.module.css';

// Temporary var for state name, should be changed from const to var later
const stateName = 'Texas';
let test = new Date();
let test1 = new Date();
let test2 = new Date();
// let testLastWeek = new Date("2021/04/11");
// let testLastMonth = new Date("2021/03/18");
let testLastWeek = new Date();
let testLastMonth = new Date();
let testLastYear = new Date();
// const { date } = this.props;
test = '2021-03-20';
test1 = '2020-03-20';
test2 = '2021-03-22';
// testLastWeek = '2021-04-11';
// testLastMonth = '2021-03-18';


let ifState = false;
let ifCounty = false;

function dataMap(data) {
    if(data.hasOwnProperty('state'))
        return data.map((index) => index.state.stats[0].cases);
    else
        return data.map((index) => index.stats[0].cases);
 }

function setDateBackMonth(date){
    let year = parseInt(date.substring(0,4));
    let month = parseInt(date.substring(5,7)-1);
    let day = parseInt(date.substring(8,10));

    if(month < 1){
        year--;
        month = 12;
    }

    if(month.toString().length<2)
        month = '0' + month;
    if(day.toString().length<2)
        day = '0' + day;

    return year + '-'+month+'-'+day;
}

function setDateBackYear(date){
    let year = parseInt(date.substring(0,4)-1);
    let month = parseInt(date.substring(5,7));
    let day = parseInt(date.substring(8,10));

    if(month.toString().length<2)
            month = '0' + month;
        if(day.toString().length<2)
            day = '0' + day;

        return year + '-'+month+'-'+day;
}

function setDateBackWeek(date){
    let year = parseInt(date.substring(0,4));
    let month = parseInt(date.substring(5,7));
    let day = parseInt(date.substring(8,10)-7);

    if(day < 1){
        month--;
        let temp = 31 + day;
        day = temp;
    }

    if(month < 1){
        year--;
        month = 12;
    }

    if(month.toString().length<2)
            month = '0' + month;
    if(day.toString().length<2)
            day = '0' + day;

    return year + '-'+month+'-'+day;

}


const Chart = ({country, nbdate, cond, countyName, sname, width, height}) => {


    const [dailyData, setDailyData] = useState({});
    const [weekData, setWeekData] = useState({});
    const [monthData, setMonthData] = useState({});


    testLastMonth = setDateBackMonth(nbdate);
    testLastWeek = setDateBackWeek(nbdate);
    testLastYear = setDateBackYear(nbdate);


//     console.log(cond);
//     console.log(country);
    if(sname !== 'USA')
        ifState = true;
    else
        ifState = false;

    if(countyName !== null){
        ifCounty = true;
    }
    else
        ifCounty = false;

    useEffect(() => {
        const fetchMyAPI = async () => {

            const nbDataRange = await fetchUSByDateRange(testLastYear, nbdate);
            const nbDataRangeWeek = await fetchUSByDateRange(testLastWeek, nbdate);
            const nbDataRangeMonth = await fetchUSByDateRange(testLastMonth, nbdate);
//             console.log(nbDataRange);
//             console.log(nbDataRange[367].stats[0]);






//             console.log(countyData);

//             console.log(dataMap(nbStateData));

              console.log(countyName);


            if(countyName !== null){
                            const countyDataWeek = await fetchCountyByDateRange(testLastWeek, nbdate, country, countyName);
                            const countyDataMonth = await fetchCountyByDateRange(testLastMonth, nbdate, country, countyName);
                            const countyData = await fetchCountyByDateRange(testLastYear, nbdate, country, countyName);
                            console.log(countyData);

                            setWeekData(countyDataWeek);
                            setMonthData(countyDataMonth);
                            setDailyData(countyData);
                        }
                        else if(ifState){
                            const nbStateDataWeek = await fetchStateNoCountiesByDateRange(testLastWeek, nbdate, country);
                            const nbStateDataMonth = await fetchStateNoCountiesByDateRange(testLastMonth, nbdate, country);
                            const nbStateData = await fetchStateNoCountiesByDateRange(testLastYear, nbdate, country);
                            setWeekData(nbStateDataWeek);
                            setMonthData(nbStateDataMonth);
                            setDailyData(nbStateData);
                        }
                        else{
                            setWeekData(nbDataRangeWeek);
                            setMonthData(nbDataRangeMonth);
                            setDailyData(nbDataRange);
                        }



        };

        fetchMyAPI();
    }, [country, countyName]);

    useEffect(() => {
        const fetchMyAPI = async () => {

            if(sname !== 'USA'){
                ifState = true;
            }
            else
                ifState = false;

            if(countyName !== null){
                ifCounty = true;
            }
            else
                ifCounty = false;

            const nbDataRangeWeek = await fetchUSByDateRange(testLastWeek, nbdate);
            const nbDataRangeMonth = await fetchUSByDateRange(testLastMonth, nbdate);
            const nbDataRange = await fetchUSByDateRange(testLastYear, nbdate);


            // console.log(nbdate);
//              console.log(nbDataRange);
//              console.log(nbStateData);




//             console.log(countyData);

            console.log(countyName);
            console.log(country);

            if(countyName !== null){
                const countyDataWeek = await fetchCountyByDateRange(testLastWeek, nbdate, country, countyName);
                const countyDataMonth = await fetchCountyByDateRange(testLastMonth, nbdate, country, countyName);
                const countyData = await fetchCountyByDateRange(testLastYear, nbdate, country, countyName);
                console.log(countyData);
                setWeekData(countyDataWeek);
                setMonthData(countyDataMonth);
                setDailyData(countyData);
            }
            else if(ifState){
                const nbStateDataWeek = await fetchStateNoCountiesByDateRange(testLastWeek, nbdate, country);
                const nbStateDataMonth = await fetchStateNoCountiesByDateRange(testLastMonth, nbdate, country);
                const nbStateData = await fetchStateNoCountiesByDateRange(testLastYear, nbdate, country);
                setWeekData(nbStateDataWeek);
                setMonthData(nbStateDataMonth);
                setDailyData(nbStateData);
            }
            else{
                setWeekData(nbDataRangeWeek);
                setMonthData(nbDataRangeMonth);
                setDailyData(nbDataRange);
            }



        };

        fetchMyAPI();
    }, [nbdate, country, countyName]);
    // Uncomment the block of line charts below to display a range of US Total Data By DateRange
    let lineChart1 = null;
    let lineChart2 = null;
    let lineChart3 = null;

//     console.log(dailyData[0]);
// data: dailyData.map(({ stats }) => stats[0].cases),
    const lineChart1Cases = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].cases),
                        label: 'Cases',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Cases by Year` },
                }}
            />
        ) : null
    );



    const lineChart2Cases = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].cases),
                        label: 'Cases',
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `${sname} Cases by Month` },
                }}
            />
        ) : null
    );

    const lineChart3Cases = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].cases),
                        label: 'Cases',
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Cases by Week` },
                }}
            />
        ) : null
    );
    const lineChart1Deaths = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Deaths by Year` },
                }}
            />
        ) : null
    );
    const lineChart2Deaths = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Deaths by Month` },
                }}
            />
        ) : null
    );
    const lineChart3Deaths = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Deaths by Week` },
                }}
            />
        ) : null
    );

    const lineChart1NewCases = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].newCases),
                        label: 'New Cases',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} New Cases by Year` },
                }}
            />
        ) : null
    );
    const lineChart2NewCases = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].newCases),
                        label: 'New Cases',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} New Cases by Month` },
                }}
            />
        ) : null
    );
    const lineChart3NewCases = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].newCases),
                        label: 'New Cases',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} New Cases by Week` },
                }}
            />
        ) : null
    );

//old vaccine charts
//     const lineChart1Vaccinations = (
//         dailyData[0] ? (
//             <Line width={width} height={height}
//                 data={{
//                     labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
//                     datasets: [{
//                         data: dailyData.map(({ stats }) => stats[0].peopleVaccinated),
//                         label: 'Vaccinations',
//                         borderColor: 'rgba(60, 0, 200, 0.5)',
//                         backgroundColor: 'rgba(60, 0, 200, 0.5)',
//                         fill: true,
//                     },
//                     ],
//                 }}
//                 options={{
//                     legend: { display: false, reverse: true },
//                     title: { display: true, text: `${sname} Vaccinations by Year` },
//                 }}
//             />
//         ) : null
//     );
//     const lineChart2Vaccinations = (
//         monthData[0] ? (
//             <Line width={width} height={height}
//                 data={{
//                     labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
//                     datasets: [{
//                         data: monthData.map(({ stats }) => stats[0].peopleVaccinated),
//                         label: 'Vaccinations',
//                         borderColor: 'rgba(60, 0, 200, 0.5)',
//                         backgroundColor: 'rgba(60, 0, 200, 0.5)',
//                         fill: true,
//                     },
//                     ],
//                 }}
//                 options={{
//                     legend: { display: false, reverse: true },
//                     title: { display: true, text: `${sname} Vaccinations by Month` },
//                 }}
//             />
//         ) : null
//     );
//     const lineChart3Vaccinations = (
//         weekData[0] ? (
//             <Line width={width} height={height}
//                 data={{
//                     labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
//                     datasets: [{
//                         data: weekData.map(({ stats }) => stats[0].peopleVaccinated),
//                         label: 'Vaccinations',
//                         borderColor: 'rgba(60, 0, 200, 0.5)',
//                         backgroundColor: 'rgba(60, 0, 200, 0.5)',
//                         fill: true,
//                     },
//                     ],
//                 }}
//                 options={{
//                     legend: { display: false, reverse: true },
//                     title: { display: true, text: `${sname} Vaccinations by Week` },
//                 }}
//             />
//         ) : null
//     );
    const LineChart1VaccNew = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [
                        {
                            data: dailyData.map(({ stats }) => stats[0].vaccinesDistributed),
                            label: 'Vaccines Distributed',
                            borderColor: 'rgba(0, 255, 0, 0.5)',
                            fill: false,
                        },
                        {
                            data: dailyData.map(({ stats }) => stats[0].firstDose),
                            label: 'First Dose',
                            borderColor: 'rgba(255, 0, 0, 0.5)',
                            fill: false,
                        },
                        {
                            data: dailyData.map(({ stats }) => stats[0].secondDose),
                            label: 'Second Dose',
                            borderColor: 'rgba(0, 0, 255, 0.5)',
                            fill: false,
                        },
                        {
                            data: dailyData.map(({ stats }) => stats[0].dailyVaccinated),
                            label: 'Daily Vaccinations',
                            borderColor: 'rgba(60, 0, 200, 0.5)',
                            fill: false
                        },
                    ],
                }}
                options={{
                    legend: { display: true, reverse: true },
                    title: { display: true, text: `${sname} Vaccination Data` },
                }}
            />
        ) : null
    );
    const LineChart2VaccNew = (
            monthData[0] ? (
                <Line width={width} height={height}
                    data={{
                        labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                        datasets: [
                            {
                                data: monthData.map(({ stats }) => stats[0].vaccinesDistributed),
                                label: 'Vaccines Distributed',
                                borderColor: 'rgba(0, 255, 0, 0.5)',
                                fill: false,
                            },
                            {
                                data: monthData.map(({ stats }) => stats[0].firstDose),
                                label: 'First Dose',
                                borderColor: 'rgba(255, 0, 0, 0.5)',
                                fill: false,
                            },
                            {
                                data: monthData.map(({ stats }) => stats[0].secondDose),
                                label: 'Second Dose',
                                borderColor: 'rgba(0, 0, 255, 0.5)',
                                fill: false,
                            },
                            {
                                data: monthData.map(({ stats }) => stats[0].dailyVaccinated),
                                label: 'Daily Vaccinations',
                                borderColor: 'rgba(60, 0, 200, 0.5)',
                                fill: false
                            },
                        ],
                    }}
                    options={{
                        legend: { display: true, reverse: true },
                        title: { display: true, text: `${sname} Vaccination Data By Month` },
                    }}
                />
            ) : null
        );
        const LineChart3VaccNew = (
                weekData[0] ? (
                    <Line width={width} height={height}
                        data={{
                            labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                            datasets: [
                                {
                                    data: weekData.map(({ stats }) => stats[0].vaccinesDistributed),
                                    label: 'Vaccines Distributed',
                                    borderColor: 'rgba(0, 255, 0, 0.5)',
                                    fill: false,
                                },
                                {
                                    data: weekData.map(({ stats }) => stats[0].firstDose),
                                    label: 'First Dose',
                                    borderColor: 'rgba(255, 0, 0, 0.5)',
                                    fill: false,
                                },
                                {
                                    data: weekData.map(({ stats }) => stats[0].secondDose),
                                    label: 'Second Dose',
                                    borderColor: 'rgba(0, 0, 255, 0.5)',
                                    fill: false,
                                },
                                {
                                    data: weekData.map(({ stats }) => stats[0].dailyVaccinated),
                                    label: 'Daily Vaccinations',
                                    borderColor: 'rgba(60, 0, 200, 0.5)',
                                    fill: false
                                },
                            ],
                        }}
                        options={{
                            legend: { display: true, reverse: true },
                            title: { display: true, text: `${sname} Vaccination Data By Week` },
                        }}
                    />
                ) : null
            );

    const lineChart1Hosp = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Hospitalizations by Year` },
                }}
            />
        ) : null
    );
    const lineChart2Hosp = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Hospitalizations by Month` },
                }}
            />
        ) : null
    );
    const lineChart3Hosp = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${sname} Hospitalizations by Week` },
                }}
            />
        ) : null
    );



    if(cond === 'cases'){
//         console.log(cond);
        lineChart1 = lineChart1Cases;
        lineChart2 = lineChart2Cases;
        lineChart3 = lineChart3Cases;
    }
    else if(cond === 'deaths'){
        //set lineChart1 2 and 3 to a deaths chart
//         console.log(cond);
        lineChart1 = lineChart1Deaths;
        lineChart2 = lineChart2Deaths;
        lineChart3 = lineChart3Deaths;
    }
    else if(cond === 'newcases'){
//         console.log(cond);
        lineChart1 = lineChart1NewCases;
        lineChart2 = lineChart2NewCases;
        lineChart3 = lineChart3NewCases;
    }
    else if(cond === 'vaccinations'){
//         console.log(cond);
//         lineChart1 = lineChart1Vaccinations;

//         lineChart2 = lineChart2Vaccinations;
//         lineChart3 = lineChart3Vaccinations;
        lineChart1 = LineChart1VaccNew;
        lineChart2 = LineChart2VaccNew;
        lineChart3 = LineChart3VaccNew;
    }
    else if(cond === 'hospitalizations'){
//         console.log(cond);
        lineChart1 = lineChart1Hosp;
        lineChart2 = lineChart2Hosp;
        lineChart3 = lineChart3Hosp;
    }



    return (
        <div>
            <div style={{ margin: "20px" }}>
                <Tabs>
                    <TabList>
                        <Tab>By Week</Tab>
                        <Tab>By Month</Tab>
                        <Tab>By Year</Tab>
                    </TabList>

                    <TabPanel>
                        {sname && lineChart3}
                    </TabPanel>
                    <TabPanel>
                            {sname && lineChart2}
                    </TabPanel>
                    <TabPanel>
                        {sname && lineChart1}
                    </TabPanel>
                </Tabs>
            </div>
            {/* {country ? barChart : lineChart} */}
            {/*{country ? lineChart1 : barChart}*/}
            {/*{country ? lineChart2 : barChart}*/}
            {/*{country ? lineChart3 : barChart}*/}
        </div>
    );
};

export default Chart;
