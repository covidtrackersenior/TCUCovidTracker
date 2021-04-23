import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, News } from '../../components';
import './SearchBar.css';

const CountyList = ({countyList=[]}) => {
  const dropdownClicked = function(e) {
    //do nothing
  }
  return (
    <div id='dropdown_option_div' className='dropdown_hidden'>
    { countyList.map((data,index) => {
        if (data) {
          return (
            <div>
              <div class='dropdown_option' key={data + " (Cases)"} data-innput={data + " (Cases)"} onClick={(e) => dropdownClicked(e)} tabindex="0">
                <span>{data}</span> <span class='dropdown_option_cond cond_cases'>(Cases)</span>
              </div>
              <div class='dropdown_option' key={data + " (New Cases)"} data-innput={data + " (New Cases)"} onClick={(e) => dropdownClicked(e)} tabindex="0">
                <span>{data}</span> <span class='dropdown_option_cond cond_new_cases'>(New Cases)</span>
              </div>
              <div class='dropdown_option' key={data + " (Deaths)"} data-innput={data + " (Deaths)"} onClick={(e) => dropdownClicked(e)} tabindex="0">
                <span>{data}</span> <span class='dropdown_option_cond cond_deaths'>(Deaths)</span>
              </div>
              <div class='dropdown_option' key={data + " (Vaccinations)"} data-innput={data + " (Vaccinations)"} onClick={(e) => dropdownClicked(e)} tabindex="0">
                <span>{data}</span> <span class='dropdown_option_cond cond_vacc'>(Vaccinated)</span>
              </div>
            </div>
    	   )	
    	 }
    	 return null
    }) }
    </div>

  );
}

export default CountyList
