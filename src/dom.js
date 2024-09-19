const apiKey = 'HVYC7M37F6HLP5DUBXBLR9R4U';

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
      console.log(data);
      
   } catch(error) {
      console.error('Error fetching weather data:', error);
   }
}

getWeatherInEnglishUnit('lagos');
getWeatherInSIUnit('lagos');