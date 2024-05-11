import * as utils from '../utils.js';

document.addEventListener("DOMContentLoaded", () => {

    // Creating an array of city names to iterate over
    // They are not TitleCase, as I'll need them to match the data headings from weather_data.js 
    const cities = ["amsterdam", "berlin", "copenhagen", "cork", "new_york", "paris", "san_francisco", "tromso", "waterford"];

    for(let i=0; i<cities.length; i++){
        // Capitalizing the first letter of each word in the city name (convert to title case)
        document.getElementById(cities[i]).innerHTML = utils.toTitleCase(cities[i]);
        
        // Capturing the city specific daily data from weather_data.js
        let cityDataDaily = weatherData[cities[i] + "_daily"];
        const cityDailyData = cityDataDaily.daily;
        // [0], as we just need 'today's' temperature values from the daily data
        let min_temp = cityDailyData.temperature_2m_min[0];
        let max_temp = cityDailyData.temperature_2m_max[0];
        
        // If the prefered_temp_unit is set in local storage (if not set, the default is celsius)
        if ( localStorage.getItem('prefered_temp_unit') ) {
            // If the prefered_temp_unit set in local storage is fahrenheit
            if (localStorage.getItem('prefered_temp_unit') === "fahrenheit"){
                // Convert the temperture vars to fahrenheit
                min_temp = utils.celciusToFahrenheit(min_temp)+"°F";
                max_temp = utils.celciusToFahrenheit(max_temp)+"°F";
            } else {
                 min_temp = min_temp+"°C";
                 max_temp = max_temp+"°C";
            }
        } else {
            min_temp = min_temp+"°C";
            max_temp = max_temp+"°C";
        }
        
        // Setting values for today (Sunday)
        document.getElementById(cities[i] + "_today_max_temp").innerHTML = max_temp;
        document.getElementById(cities[i] + "_today_min_temp").innerHTML = min_temp;

        // Setting an image depending on the weather_code for today (Sunday)
        let img = new Image();
        img.src = utils.getWeatherImage(cityDailyData.weather_code[0]);
        document.getElementById(cities[i]+"_today_weather_code_image").appendChild(img);
    }
});