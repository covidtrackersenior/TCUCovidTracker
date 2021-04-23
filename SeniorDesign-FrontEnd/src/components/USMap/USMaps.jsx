import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import d3tip from 'd3-tip';
import * as topojson from "topojson-client/src";
import * as d3 from 'd3';
import {fetchAllStatesByDate, fetchUSByDate, fetchCountyByDate} from '../../api/';
import axios from "axios";
import {Chart, Infos} from "../index";
import range from 'lodash/range';
import {getMonth, getYear} from 'date-fns';
import '../../App.css';
import styles from '../../App.module.css';
import stylescard from '../Cards/Cards.module.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'add-days';
import SearchPage from '../../components/SearchBar/SearchPage.js';
import {Grid} from '@material-ui/core';
import {reset} from "react-tabs/lib/helpers/uuid";
import { countyValues } from '../Legend/Legend';
import { stateValues } from '../Legend/Legend';
import CardComponent from "../Cards/Card/Card";
import "./USMaps.css";
const USMaps = ({date, cond}) => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const [check2, setcheck2] = useState(false);
    function activatelayer() {
        setcheck2(check2 => check2 == false ? true : false);
    }
    const [sname, setsname] = useState('USA');
    const [snamestate, setsnamestate] = useState(null);
    const myRef = useRef(null);
    const [statedata, setMapData] = useState(null);
    const [us, setus] = useState(null);
    const [check, setcheck] = useState(false);
    const [data2, setData2] = useState(null);
    const [check1, setcheck1] = useState(false);
    const [ccases,setccases] = useState(null);
    const [cdeath,setcdeath] = useState(null);
    const [cnewc,setcnewc] = useState(null);
    const [cvac,setcvac] = useState(null);
    const [chos,setchos] = useState(null);
    const[state, setState] = useState(null);
    const [countyName,setCounty] = useState(null);
    const[color,setColor] = useState(null);
    const[domain,setDomain] = useState(null);
    // const [cond, setCond] = useState(null);
    let countyCaseDomain = undefined;
    let countyDeathDomain = undefined;
    let countyNewDomain = undefined;
    let stateDomain = undefined;
    let blues = ['#AAFFFC', '#66D9FF', '#44ABFF', '#2372FF', '#052FFF'];
    let greens = ['#dee5d1', '#91b588', '#76b378', '#1E9F3E', '#178048'];
    let reds = ['#F08080', '#CD5C5C', '#FF0000', '#B22222', '#8b0000'];
    let purples = ['#CCCEFF', '#ABAAFF', '#A388FF', '#A966FF', '#BC44FF'];
    let pinks = ['#F5CCFF', '#ffaaff', '#FF88F2', '#FF67CF', '#FF49A2'];

    let countyColorCases = d3.scaleThreshold() //blues
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#AAFFFC', '#66D9FF', '#44ABFF', '#2372FF', '#052FFF']);

    let countyColorRecovered = d3.scaleThreshold() //greens
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#dee5d1', '#91b588', '#76b378', '#1E9F3E', '#178048']);

    let countyColorDeaths = d3.scaleThreshold() //reds
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#F08080', '#CD5C5C', '#FF0000', '#B22222', '#8b0000']);

    let countyColorVac = d3.scaleThreshold() //purples
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#CCCEFF', '#ABAAFF', '#A388FF', '#A966FF', '#BC44FF']);

    let countyColorHosp = d3.scaleThreshold() //pinks
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#F5CCFF', '#FFAAFF', '#FF88F2', '#FF67CF', '#FF49A2']);
    let county = useRef(null);
    let counties = useRef(null);
    let states = useRef(null);
    let curstate;
    let stateColor = null;
    let stage = useRef(0);
    let countyColor = null;
    const margin = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    let active = d3.select(null);
    
    function convertToSlug(Text){
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'_');
    }

    useEffect(() => {
        const condDefault = 'cases';
        var url1 = axios.get("https://raw.githubusercontent.com/BiKunTin/datastore/main/us-counties.topojson");
        Promise
            .all([url1])
            .then((usa) => {
                setus(us => usa[0].data);
            });
        setcheck(check => true);

    }, []);
    useEffect(() => {
        if(date){
            console.log(date);
            let datas;
            let data3;
            async function updatedata() {
                // if (date < moment(test1.current).format('YYYY-MM-DD'))
                datas = await fetchUSByDate(date);
                data3 = await fetchAllStatesByDate(date);
                setMapData(data3);
                setData2(data2 => datas);
                setccases(ccases => datas.stats[0].cases);
                setcdeath(cdeath => datas.stats[0].deaths);
                setcnewc(cnewc => datas.stats[0].newCases);
                setchos(chos => datas.stats[0].hospitalized);
                setcvac(cvac => datas.stats[0].secondDose);
            }
            updatedata();
        }
    },[date]);

    useEffect(() => {
        const svg = d3.select(myRef.current);
        if (us && myRef.current && date && statedata && cond) {
            setcheck1(false);
            setcheck2(false);
            for (var i = 1; i < 100; i++) {
                svg.select("g").remove();
            }

            let width = 960 - margin.left - margin.right;
            let height = 600 - margin.left - margin.right;
            svg.append('svg')
                .attr('class', 'center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right);


            svg.append('rect')
                .attr('class', 'background center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .on('click', clicked);

            const projection = d3.geoAlbersUsa()
                .translate([width / 2, height / 2])
                .scale(width);

            const path = d3.geoPath()
                .projection(projection);
            const g = svg.append("g")
                .attr('class', 'center-container center-items us-state')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
            counties = topojson.feature(us, us.objects.counties).features;
            states = topojson.feature(us, us.objects.states).features;
            states.forEach(function (f) {
                f.props = statedata.states.find(function (d) {
                    return d.fips * 1000 / 1000 === f.id
                })

            })
            g.append("g")
                .selectAll("path")
                .data(counties)
                .enter().append("path")
                .attr("d", path)
                .attr("class", "county-boundary")
                .attr("id", function (d) { // set id to lowercase county name eg. "bexar_county"
                    if (d.props) {
                        return convertToSlug(d.props.name.toLowerCase());
                    } else return "";
                })
                .on("click", function(d)
                {
                    setsname(d.props.name);
                    setCounty(d.props.name);
                    setccases(ccases => d.props.stats[0].cases);
                    setcdeath(cdeath => d.props.stats[0].deaths);
                    setcnewc(cnewc => d.props.stats[0].newCases);
                    setchos(chos => d.props.stats[0].hospitalized);
                    setcvac(cvac => d.props.stats[0].secondDose);
                })
                .on("contexmenu",reset)
                .on("mouseover", function (d) {
                    countytip.show(d, this);
                })
                .on("mouseout", function (d) {
                    countytip.hide(d, this);
                });
            if (cond === 'cases') {
                stateDomain = stateValues(statedata, 'casesPercent');
                setColor({
                    color0: blues[0],
                    color1: blues[1],
                    color2: blues[2],
                    color3: blues[3],
                    color4: blues[4]
                });
                stateColor = d3.scaleThreshold()
                    .domain(stateDomain)
                    .range(blues);
            } else if (cond === 'newcases') {
                stateDomain = stateValues(statedata, 'newCasesPercent');
                setColor({
                    color0: greens[0],
                    color1: greens[1],
                    color2: greens[2],
                    color3: greens[3],
                    color4: greens[4]
                });
                stateColor = d3.scaleThreshold()
                    .domain(stateDomain)
                    .range(greens);
            } else if (cond === 'deaths') {
                stateDomain = stateValues(statedata, 'deathsPercent');
                setColor({
                    color0: reds[0],
                    color1: reds[1],
                    color2: reds[2],
                    color3: reds[3],
                    color4: reds[4]
                });
                console.log(stateDomain);
                console.log(reds);
                stateColor = d3.scaleThreshold()
                    .domain(stateDomain)
                    .range(reds);
            } else if (cond === 'hospitalizations') {
                stateDomain = stateValues(statedata, 'hospitalizedPercent');
                setColor({
                    color0: purples[0],
                    color1: purples[1],
                    color2: purples[2],
                    color3: purples[3],
                    color4: purples[4]
                });
                console.log(stateDomain);
                stateColor = d3.scaleThreshold()
                    .domain(stateDomain)
                    .range(purples);
            } else if (cond === 'vaccinations') {
                stateDomain = stateValues(statedata, 'secondDosePercent');
                setColor({
                    color0: pinks[0],
                    color1: pinks[1],
                    color2: pinks[2],
                    color3: pinks[3],
                    color4: pinks[4]
                });
                console.log(stateDomain);
                console.log(pinks);
                stateColor = d3.scaleThreshold()
                    .domain(stateDomain)
                    .range(pinks);
            }
            setDomain({
                domain0: stateDomain[0].toFixed(2) + "%",
                domain1: stateDomain[1].toFixed(2) + "%",
                domain2: stateDomain[2].toFixed(2) + "%",
                domain3: stateDomain[3].toFixed(2) + "%",
                domain4: stateDomain[4].toFixed(2) + "%"
            });
            g.append("g")
                .attr("id", "states")
                .selectAll("path")
                .data(states)
                .enter().append("path")
                .style('fill', function (d) {
                    if (d.props && cond === 'cases') {
                        return stateColor(d.props.stats[0].casesPercent);
                    } else if (d.props && cond === 'newcases') {
                        return stateColor(d.props.stats[0].newCasesPercent);
                    } else if (d.props && cond === 'deaths') {
                        return stateColor(d.props.stats[0].deathsPercent);
                    } else if (d.props && cond === 'vaccinations') {
                        return stateColor(d.props.stats[0].secondDosePercent);
                    } else if (d.props && cond === 'hospitalizations') {
                        return stateColor(d.props.stats[0].hospitalizedPercent);
                    } else {
                        return "black";
                    }
                })
                .attr("d", path)
                .attr("id", function (d) { // set id to lowercase state name eg. "texas"
                    if (d.props) {
                        return d.props.name.toLowerCase();
                    } else return "";
                })
                .attr("class", "state")
                .on("click", clicked)
                .on("mouseover", function (d) {
                    statetip.show(d, this);
                })
                .on("mouseout", function (d) {
                    statetip.hide(d, this);
                });
            g.append("path")
                .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                    return a !== b;
                }))
                .attr("id", "state-borders")
                .attr("d", path);


            const statetip = d3tip()
                .attr('class', 'd3-tip')
                .offset([140, 140])
                .html(function (d) {
                    if (cond === 'cases' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Cases: " + d.props.stats[0].cases + "<br/>" +
                            "Percent of State: " + d.props.stats[0].casesPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'newcases' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "New Cases: " + d.props.stats[0].newCases + "<br/>" +
                            "Percent of State: " + d.props.stats[0].newCasesPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'deaths' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Deaths: " + d.props.stats[0].deaths + "<br/>" +
                            "Percent of State: " + d.props.stats[0].deathsPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'vaccinations' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Daily Vaccinations: " + d.props.stats[0].dailyVaccinated + "<br/>" +
                            "Percent of State Vaccinated: " + d.props.stats[0].secondDosePercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'hospitalizations' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Hospitalized: " + d.props.stats[0].hospitalized + "<br/>" +
                            "Percent of State: " + d.props.stats[0].hospitalizedPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.id + "<br/>" +
                            "Cases: " + 0 + "<br/>" +
                            "</div>";
                    }
                });
            g.call(statetip);
            const countytip = d3tip()
                .attr('class', 'd3-tip')
                .offset([140, 140])
                .html(function (d) {
                    if (cond === 'cases' && d.props) {
                        setColor({
                            color0: blues[0],
                            color1: blues[1],
                            color2: blues[2],
                            color3: blues[3],
                            color4: blues[4]
                        });
                        setDomain({
                            domain0: countyCaseDomain[0].toFixed(2) + "%",
                            domain1: countyCaseDomain[1].toFixed(2) + "%",
                            domain2: countyCaseDomain[2].toFixed(2) + "%",
                            domain3: countyCaseDomain[3].toFixed(2) + "%",
                            domain4: countyCaseDomain[4].toFixed(2) + "%"
                        });
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {
                                    return countyColorCases(d.props.stats[0].casesPercent)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.props.name + "<br/>" +
                            "Cases: " + d.props.stats[0].cases + "<br/>" +
                            "Percent of County: " + d.props.stats[0].casesPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'newcases' && d.props) {
                        setColor({
                            color0: greens[0],
                            color1: greens[1],
                            color2: greens[2],
                            color3: greens[3],
                            color4: greens[4]
                        });
                        setDomain({
                            domain0: countyNewDomain[0].toFixed(2) + "%",
                            domain1: countyNewDomain[1].toFixed(2) + "%",
                            domain2: countyNewDomain[2].toFixed(2) + "%",
                            domain3: countyNewDomain[3].toFixed(2) + "%",
                            domain4: countyNewDomain[4].toFixed(2) + "%"
                        });
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {
                                    return countyColorRecovered(d.props.stats[0].newCasesPercent)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.props.name + "<br/>" +
                            "New Cases: " + d.props.stats[0].newCases + "<br/>" +
                            "Percent of County: " + d.props.stats[0].newCasesPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'deaths' && d.props) {
                        setColor({
                            color0: reds[0],
                            color1: reds[1],
                            color2: reds[2],
                            color3: reds[3],
                            color4: reds[4]
                        });
                        setDomain({
                            domain0: countyDeathDomain[0].toFixed(2) + "%",
                            domain1: countyDeathDomain[1].toFixed(2) + "%",
                            domain2: countyDeathDomain[2].toFixed(2) + "%",
                            domain3: countyDeathDomain[3].toFixed(2) + "%",
                            domain4: countyDeathDomain[4].toFixed(2) + "%"
                        });
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {
                                    return countyColorDeaths(d.props.stats[0].deathsPercent)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.props.name + "<br/>" +
                            "Death: " + d.props.stats[0].deaths + "<br/>" +
                            "Percent of County: " + d.props.stats[0].deathsPercent.toFixed(2) + "%<br/>" +
                            "</div>";
                    } else if (cond === 'vaccinations' && d.props) {
                        setDomain(null);
                        setColor(null);
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {
                                    return countyColorVac(d.props.stats[0].peopleVaccinated)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.props.name + "<br/>" +
                            "No County Vaccination Data" +
                            "</div>";
                    } else if (cond === 'hospitalizations' && d.props) {
                        setDomain(null);
                        setColor(null);
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {
                                    return countyColorHosp(d.props.stats[0].hospitalized)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.props.name + "<br/>" +
                            "No County Hospitalization Data" +
                            "</div>";
                    } else {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "County: " + d.id + "<br/>" +
                            "Cases: " + 0 + "<br/>" +
                            "</div>";
                    }
                });
            g.call(countytip);

            function clicked(d) {
                setcheck1(check1 => true);
                if (typeof d !== "undefined") {
                    setccases(ccases => d.props.stats[0].cases);
                    setcdeath(cdeath => d.props.stats[0].deaths);
                    setcnewc(cnewc => d.props.stats[0].newCases);
                    setchos(chos => d.props.stats[0].hospitalized);
                    setcvac(cvac => d.props.stats[0].secondDose);
                    setsname(sname => d.props.name);
                    setsnamestate(snamestate=> d.props.name);

                    setState(state => d.props.name);

                    async function updatedata() {
                        county = await fetchCountyByDate(d.props.name, date);
                        counties.forEach(function (f) {
                            // ////console.log(parseInt(f.id/1000));
                            curstate = parseInt(d.id)
                            if (parseInt(f.id / 1000) === d.id * 1000 / 1000) {
                                ////console.log(county);
                                f.props = county.state.counties.find(function (e) {
                                    // ////console.log(e.fips + "@@" + f.id);
                                    return e.fips * 1000 / 1000 === f.id
                                })
                            }
                        })
                        countyCaseDomain = countyValues(county, 'casesPercent');
                        countyColorCases = d3.scaleThreshold()
                            .domain(countyCaseDomain)
                            .range(blues);
                        countyDeathDomain = countyValues(county, 'deathsPercent');
                        countyColorDeaths = d3.scaleThreshold()
                            .domain(countyDeathDomain)
                            .range(reds);
                        countyNewDomain = countyValues(county, 'newCasesPercent');
                        countyColorRecovered = d3.scaleThreshold()
                            .domain(countyNewDomain)
                            .range(greens);
                    }

                    updatedata();


                    // tip.show(d);
                    // ////console.log("ok");
                    if (d3.select('.background').node() === this) return reset();

                    if (active.node() === this) return reset();

                    active.classed("active", false);
                    active = d3.select(this).classed("active", true);

                    var bounds = path.bounds(d),
                        dx = bounds[1][0] - bounds[0][0],
                        dy = bounds[1][1] - bounds[0][1],
                        x = (bounds[0][0] + bounds[1][0]) / 2,
                        y = (bounds[0][1] + bounds[1][1]) / 2,
                        scale = .9 / Math.max(dx / width, dy / height),
                        translate = [width / 2 - scale * x, height / 2 - scale * y];

                    g.transition()
                        .duration(800)
                        .style("stroke-width", 1.5 / scale + "px")
                        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
                }
            }

            function reset() {
                async function updatedata() {
                    setCounty(null);
                    setccases(ccases => data2.stats[0].cases);
                    setcdeath(cdeath => data2.stats[0].deaths);
                    setcnewc(cnewc => data2.stats[0].newCases);
                    setchos(chos => data2.stats[0].hospitalized);
                    setcvac(cvac => data2.stats[0].secondDose);
                    setsname(sname => "USA");
                    setState(state => "USA");
                    setcheck1(check1 => false);
                    setcheck2(check2 => false);
                    setsnamestate(snamestate=>null);
                    if (cond === 'cases')
                        stateDomain = stateValues(statedata, 'casesPercent');
                    if (cond === 'newcases')
                        stateDomain = stateValues(statedata, 'newCasesPercent');
                    if (cond === 'deaths')
                        stateDomain = stateValues(statedata, 'deathsPercent');
                    if (cond === 'vaccinations')
                        stateDomain = stateValues(statedata, 'secondDosePercent');
                    if (cond === 'hospitalizations')
                        stateDomain = stateValues(statedata, 'hospitalizedPercent');
                    setDomain({
                        domain0: stateDomain[0].toFixed(2) + "%",
                        domain1: stateDomain[1].toFixed(2) + "%",
                        domain2: stateDomain[2].toFixed(2) + "%",
                        domain3: stateDomain[3].toFixed(2) + "%",
                        domain4: stateDomain[4].toFixed(2) + "%"
                    });
                }

                updatedata();
                active.classed("active", false);
                active = d3.select(null);

                g.transition()
                    .delay(100)
                    .duration(800)
                    .style("stroke-width", "1.5px")
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                g.selectAll("path")
                    .style('fill', function (d) {
                        if (d.props && cond === 'cases') {

                            return stateColor(d.props.stats[0].casesPercent);
                        } else if (d.props && cond === 'newcases') {
                            return stateColor(d.props.stats[0].newCasesPercent);
                        } else if (d.props && cond === 'deaths') {
                            return stateColor(d.props.stats[0].deathsPercent);
                        } else if (d.props && cond === 'vaccinations') {
                            return stateColor(d.props.stats[0].secondDosePercent);
                        } else if (d.props && cond === 'hospitalizations') {
                            return stateColor(d.props.stats[0].hospitalizedPercent);
                        }
                    })
            }
            window.oncontextmenu = function () {
                reset();
                return false;
            }
        }
        d3.select('svg').select('g').exit().remove();
    }, [us, myRef.current, cond, date,statedata]);
    if (!statedata) {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <div>
            <Grid container spacing={1} justify="center">
                <CardComponent
                    className={stylescard.infected}
                    cardTitle= {sname + " cases"}
                    value={ccases}
                    cardSubtitle="Total number of active cases"
                    //           buttonTitle="Infected"
                    //           buttFunction= { (cond) => buttClickInfected() }
                />
                <CardComponent
                    className={stylescard.recovered}
                    cardTitle= {sname + " new cases"}
                    value={cnewc}
                />
                <CardComponent
                    className={stylescard.deaths}
                    cardTitle= {sname + " death"}
                    value={cdeath}
                />
                {cvac!=0 ?
                    <CardComponent
                        className={stylescard.vaccinated}
                        cardTitle= {sname + " vaccinated"}
                        value={cvac}
                    />:null}
                {chos!=0 ?
                    <CardComponent
                        className={stylescard.hospitalized}
                        cardTitle= {sname + " hospitalized"}
                        value={chos}
                    />
                    :null}
            </Grid>
            <br/>
            <div className={styles.container}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        {/* {data && date && <Chart nbdate={date} data={data} country="US" cond={cond} />} */}
                        {check2 ?
                            <Chart nbdate={date} sname={sname} country={state} countyName={countyName} cond={cond} width={"600px"} height={"600px"}/> : null}
                    </Grid>
                    <Grid item xs={6}>
                        <div className="container">
                            <div className="bloc-tabs">
                                <button
                                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(1)}
                                >
                                    Maps
                                </button>
                                {!check1 ? <button
                                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(2)}
                                >
                                    USA Chart
                                </button>:null}
                            </div>
                            <div className="content-tabs">
                                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                            <div className={styles.details}>
                                                {check1 ?
                                                    <button className={styles.button1} onClick={activatelayer}> Get Details </button> : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {color && domain ?
                                                <div className={styles.legend}>
                                                    <div className={styles.mylegend}>
                                                    <div className={styles.legendtitle}>Percent of Population</div>
                                                        <div className={styles.legendscale}>
                                                            <ul className={styles.legendlabels}>
                                                                <li><span style={{background: color.color0}}></span>{domain.domain0}</li>
                                                                <li><span style={{background: color.color1}}></span>{domain.domain1}</li>
                                                                <li><span style={{background: color.color2}}></span>{domain.domain2}</li>
                                                                <li><span style={{background: color.color3}}></span>{domain.domain3}</li>
                                                                <li><span style={{background: color.color4}}></span>{domain.domain4}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null }
                                        </Grid>
                                    </Grid>
                                    {/*<div className={styles.maps}>*/}
                                        <svg
                                            className="d3-component"
                                            width={900}
                                            height={600}
                                            ref={myRef}
                                        />
                                    {/*</div>*/}
                                </div>

                                {!check1 ? <div
                                    className={toggleState === 2 ? "content  active-content" : "content"}
                                >
                                    {!check1 ?
                                        // <div className={styles.maps}>
                                        <Chart nbdate={date} sname={sname} country={state} countyName={countyName} cond={cond} width={"950px"} height={"400px"}/>
                                        : null}
                                </div> :null}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        {check2 ? <Infos nbdate={date} sname={sname} snamestate={snamestate}/> : null}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default USMaps;
