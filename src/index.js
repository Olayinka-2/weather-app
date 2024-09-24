import "./style.css";
import './dom.js';
import {getWeatherInSIUnit, getWeatherInEnglishUnit} from './dom.js';

let submitCity = document.querySelector('.submitCity');
let mainContent = document.querySelector('#main-content');
let unitToggle = document.querySelector('#unitToggle');
let cityName = document.querySelector('#cityName');
let useSIunit = true;

submitCity.addEventListener('click', () => {
   let cityNameInput = document.querySelector('#city-name').value;
   if(cityNameInput) {
      mainContent.classList.add('hidden');  // Hide content when search starts
      if(useSIunit) {
         getWeatherInSIUnit(cityNameInput);
      } else {
         getWeatherInEnglishUnit(cityNameInput)
      }
      cityName.textContent = cityNameInput;
      cityNameInput = '';
   }
});


unitToggle.addEventListener('click', () => {

   useSIunit = !useSIunit;

   unitToggle.textContent = useSIunit ? 'Switch to Imperial' : 'Switch to Metric';

   const cityNameInput = document.querySelector('#city-name').value;
   if (cityNameInput) {
      if (useSIunit) {
         getWeatherInSIUnit(cityNameInput);
      } else {
         getWeatherInEnglishUnit(cityNameInput);
      }
   }
});
