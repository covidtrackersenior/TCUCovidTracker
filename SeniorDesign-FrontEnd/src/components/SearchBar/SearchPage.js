import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountyList from './CountyList';
import { Info, Chart, USMap, News } from '../../components';


const stateData = require('./StateData.json');
const countyData = require('./CountyData.json');
// const countyData = require('./CountyData.json');

function hasClass( target, className ) {
  if(target == null) {
    return false;
  }
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'_')
        ;
}

const SearchPage = ({cond, setCond}) => {
  const [input, setInput] = useState('');
  const [countyListDefault, setCountyListDefault] = useState();
  const [countyList, setCountyList] = useState();

  const [stateListDefault, setStateListDefault] = useState();
  const [stateList, setStateList] = useState();
  //const [cond, setCond] = useState(null);


  const fetchData = async () => {
    var countylist_temp = []
    var entries = Object.entries(countyData)
    for(const [state, counties] of entries ) {
      for(const county of counties) {
        countylist_temp.push(county + ", " + state)
      }
    }
    setCountyList([])
    setCountyListDefault(countylist_temp)
    setStateList([])
    setStateListDefault(stateData.data)
  }

    /* 
  * onSearchBlur 
  * Triggers on SearchBar blur event
  */
  const onSearchBlur = function(e) {
    console.log(e);
    stateZoom(e);
    document.getElementById("dropdown_option_div").classList.add('dropdown_hidden')
  }

  /* 
  * onSearchKeyUp 
  * Triggers on SearchBar onKeyUp event
  */
  const onSearchKeyUp = function(e) {
    document.getElementById("dropdown_option_div").classList.remove('dropdown_hidden')
    if(e.key === "Enter") {
      e.target.blur();
    }
  }

  /** 
  * stateZoom 
  * Zoom into state on USMap. Takes search string as input.
  * Input syntax: "STATE (CONDITION)"
  * OR
  *               "COUNTY, STATE (CONDITION)"
  * where STATE is any U.S. state (case insensitive)
  * and COUNTY is any U.S county (case insensitive)
  * and CONDITION is the data type to search for eg. "deaths" (case insensitive)
  */
  const stateZoom = function(input) {
    if(!input.includes(',')) {
      var state_str = input.slice(0, input.indexOf('(')).toLowerCase(); // first word of input
      var cond_str = input.slice(input.indexOf('(')+1, input.indexOf(')')).toLowerCase(); // word between parenthesis in input
    }
    else {
      var county_str = convertToSlug(input.slice(0,input.indexOf(',')).toLowerCase());
      var state_str = input.slice(input.indexOf(',') + 2, input.indexOf('(')).toLowerCase();
      var cond_str = input.slice(input.indexOf('(')+1, input.indexOf(')')).toLowerCase(); // word between parenthesis in input
    }
    state_str = state_str.replace(/^\s+|\s+$/g, ""); // remove trailing or leading spaces
    cond_str = cond_str.replace(/\s/g, ''); //remove spaces in condition string
    var state;
    var county;
    if(cond_str === "cases" || cond_str ==="newcases" || cond_str ==="deaths" || cond_str === "vaccinations") {
      setCond(cond_str);
    }
    if(state_str){ // click on state if there is a state string
      setTimeout(() => { 
        state = document.getElementById(state_str); 
        if(state) {
          state.dispatchEvent(new Event('click')); 
          setTimeout(() => {
            console.log("clicking detail button")
            console.log(document.getElementById('get_details_btn'))
            document.getElementById('get_details_btn').dispatchEvent(new Event('click')); 
          }, 1000);
        }
      }, 1000);
    }
    if(input.includes(',') && county_str) { // click on county is the input is for counties
      setTimeout(() => { 
        county = document.getElementById(county_str);
        if(county) {
          county.dispatchEvent(new Event('click')); 
          setTimeout(() => {
            document.getElementById('get_details_btn').dispatchEvent(new Event('click')); 
          }, 1000);
        }
      }, 1000);
    }
  }

  /* 
  * updateInput 
  * Set the list of suggested options in CountyList that appears under SearchBar
  * Triggered on SearchBar onChange event
  */
  const updateInput = async (input) => {
    const filtered = stateListDefault.filter(state => {
      return state.toLowerCase().startsWith(input.toLowerCase())
    }).concat(countyListDefault.filter(county => {
      return county.toLowerCase().includes(input.toLowerCase())
    }))
    setInput(input);
    setStateList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <SearchBar 
       input={input} 
       onChange={updateInput}
       onBlur={onSearchBlur}
       onKeyPress={onSearchKeyUp}
      />
      <CountyList countyList={stateList}/>
    </>
   );
}

export default SearchPage
