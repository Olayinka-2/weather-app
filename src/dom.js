const apiKey = 'HVYC7M37F6HLP5DUBXBLR9R4U';

let weatherData;

let weatherIcons = ['cloud.svg', 'rain.svg', 'sun.svg'];

function getWeatherInSIUnit(location) {
   let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json`;

   getWeather(apiURL)
}

function getWeatherInEnglishUnit(location) {
   let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

   getWeather(apiURL);
}

async function getWeather(apiURL) {
   try {
      const response = await fetch(apiURL);
      
      if(!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      weatherData = data;
      console.log(weatherData);
      getWeatherData(data);
      
   } catch(error) {
      console.error('Error fetching weather data:', error);
   }
}


getWeatherInEnglishUnit('lagos');
// getWeatherInSIUnit('lagos');

function getWeatherData(data) {
   let temperature = document.querySelector('#temperature');
   let humidity = document.querySelector('.humidity');
   let speed = document.querySelector('.wind-speed');
   let description = document.querySelector('.description');
   let date = document.querySelector('.date');
   let conditions = document.querySelector('.condition');
   let maxTemp = document.querySelector('.max-temp');
   let minTemp = document.querySelector('.min-temp');

   let temp = data.currentConditions.temp;
   let humidityData = data.currentConditions.humidity;
   let speedData = data.currentConditions.windspeed;
   let descriptionData = data.description;
   let dateData = data.currentConditions.datetimeEpoch;
   let conditionData = data.currentConditions.conditions;
   let maxTempData = data.days[0].tempmax;
   let minTempData = data.days[0].tempmin;

   temperature.textContent = `${temp}°`;
   humidity.textContent = `Hum: ${humidityData}%`;
   speed.textContent = `speed: ${speedData}mph`;
   description.textContent = descriptionData;
   date.textContent = getMonthAndDay(dateData);
   conditions.textContent = conditionData;
   maxTemp.textContent = `Max: ${maxTempData}°C`;
   minTemp.textContent = `Min: ${minTempData}°C`;
   let icon = document.querySelector('.icon');
   getIconType(conditionData);
   
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

function getIconType(description) {
   let icon = document.querySelector('.icon');
   weatherIcons.forEach(element => {
      if(description.includes(element.split('.')[0])) {
         icon.src = `../src/img/${element}`;
         icon.alt = element.split('.')[0]
      }
   })
}
