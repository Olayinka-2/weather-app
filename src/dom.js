import cloudIcon from './img/cloud.png';
import rainIcon from './img/rain.png';
import sunIcon from './img/sun.png';

let weatherIcons = {
   cloud: cloudIcon,
   rain: rainIcon,
   sun: sunIcon
};


const apiKey = 'HVYC7M37F6HLP5DUBXBLR9R4U';

let weatherData;

export function getWeatherInEnglishUnit(location, useSIunit) {
   let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json`;
   getWeather(apiURL, useSIunit);
   console.log(useSIunit);
}

export function getWeatherInSIUnit(location, useSIunit) {
   let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;
   getWeather(apiURL, useSIunit);
   console.log(useSIunit);
}


async function getWeather(apiURL, useSIunit) {
   const loadingSpinner = document.querySelector('#loading');
   const mainContent = document.querySelector('#main-content');

   loadingSpinner.classList.remove('hidden');
   mainContent.classList.add('hidden');

   try {
      const response = await fetch(apiURL);

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      weatherData = data;

      loadingSpinner.classList.add('hidden');

      getWeatherData(data, useSIunit);

      mainContent.classList.remove('hidden');

   } catch (error) {
      console.error('Error fetching weather data:', error);
      loadingSpinner.classList.add('hidden');
   }
}

function getWeatherData(data, useSIunit) {
   const currentConditions = data.currentConditions;
   const forecastDays = data.days;

   const UNIT_CONFIG = useSIunit ? {
      temp: "°C",
      speed: "km/h",
   } : {
      temp: "°F",
      speed: "mph",
   };

   // Query all elements that need updating once
   const temperature = document.querySelector('#temperature');
   const humidity = document.querySelector('.humidity');
   const speed = document.querySelector('.wind-speed');
   const description = document.querySelector('.description');
   const date = document.querySelector('.date');
   const conditions = document.querySelector('.condition');
   const maxTemp = document.querySelector('.max-temp');
   const minTemp = document.querySelector('.min-temp');
   const icons = document.querySelectorAll('.icon');

   // Update main forecast (today)
   updateForecast({
      temp: currentConditions.temp,
      humidity: currentConditions.humidity,
      speed: currentConditions.windspeed,
      description: data.description,
      date: currentConditions.datetimeEpoch,
      condition: currentConditions.conditions,
      maxTemp: forecastDays[0].tempmax,
      minTemp: forecastDays[0].tempmin,
      icon: icons[0] // Assuming the first icon is for today
   }, UNIT_CONFIG);

   // Update other forecast days
   updateOtherForecasts(forecastDays.slice(1), icons, UNIT_CONFIG);

   console.log("Weather data updated successfully.");
}

function updateForecast({ temp, humidity, speed, description, date, condition, maxTemp, minTemp, icon }, UNIT_CONFIG) {
   const unit = UNIT_CONFIG;

   setTextContent('#temperature', `${temp}${unit.temp}`);
   setTextContent('.humidity', `Hum: ${humidity}%`);
   setTextContent('.wind-speed', `Speed: ${speed} ${unit.speed}`);
   setTextContent('.description', description);
   setTextContent('.date', getMonthAndDay(date));
   setTextContent('.condition', condition);
   setTextContent('.max-temp', `Max: ${maxTemp}${unit.temp}`);
   setTextContent('.min-temp', `Min: ${minTemp}${unit.temp}`);

   getIconType(icon, condition);
}


function updateOtherForecasts(forecastDays, icons, UNIT_CONFIG) {
   const unit = UNIT_CONFIG;

   forecastDays.forEach((day, index) => {
      setTextContentAll('.date', getMonthAndDay(day.datetimeEpoch), index + 1);
      setTextContentAll('.condition', day.conditions, index + 1);
      setTextContentAll('.max-temp', `Max: ${day.tempmax}${unit.temp}`, index + 1);
      setTextContentAll('.min-temp', `Min: ${day.tempmin}${unit.temp}`, index + 1);

      getIconType(icons[index + 1], day.conditions);
   });
}


// Helper function to set text content to a single element
function setTextContent(selector, text) {
   const element = document.querySelector(selector);
   if (element) element.textContent = text;
}

// Helper function to set text content to a collection of elements (used for updating other forecasts)
function setTextContentAll(selector, text, index) {
   const elements = document.querySelectorAll(selector);
   if (elements[index]) elements[index].textContent = text;
}

function getMonthAndDay(epochTime) {
   const date = new Date(epochTime * 1000);
   const monthNames = [
     "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];

   const month = monthNames[date.getMonth()];

   const day = date.getDate();

   return `${month} ${day}`;

 }

 function getIconType(iconElement, condition) {
   if (!iconElement) {
      console.warn('Icon element not found for the condition:', condition);
      return;
   }

   // Set the correct icon based on the condition
   Object.keys(weatherIcons).forEach(key => {
      if (condition.toLowerCase().includes(key)) {
         iconElement.src = weatherIcons[key];
         iconElement.alt = key;
      }
   });
}
