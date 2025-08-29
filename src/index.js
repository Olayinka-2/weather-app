import "./style.css";
import './dom.js';
import {getWeatherInSIUnit, getWeatherInEnglishUnit} from './dom.js';


export let useSIunit = true;

let submitCity = document.querySelector('.submitCity');
let mainContent = document.querySelector('#main-content');
let unitToggle = document.querySelector('#unitToggle');
let cityName = document.querySelector('#cityName');
const cityNameInputElement = document.querySelector('#city-name');


document.addEventListener("DOMContentLoaded", function() {
   getWeatherInSIUnit("Nigeria", useSIunit);
   cityName.textContent = "Nigeria";
});


submitCity.addEventListener('click', () => {
   let cityNameInput = cityNameInputElement.value;
   if(!cityNameInput) return;
   if(cityNameInput) {
      mainContent.classList.add('hidden');  // Hide content when search starts
      if(useSIunit) {
         getWeatherInSIUnit(cityNameInput, useSIunit);
      } else {
         getWeatherInEnglishUnit(cityNameInput, useSIunit)
      }
      cityName.textContent = cityNameInput;
      cityNameInput = '';
   }
});


unitToggle.addEventListener('click', () => {
   let cityNameInput = cityNameInputElement.value  || "Nigeria";

   useSIunit = !useSIunit;

   unitToggle.textContent = useSIunit ? 'Switch to Imperial' : 'Switch to Metric';

      if (useSIunit) {
         getWeatherInSIUnit(cityNameInput, useSIunit);
      } else {
         getWeatherInEnglishUnit(cityNameInput, useSIunit);
      }
});
