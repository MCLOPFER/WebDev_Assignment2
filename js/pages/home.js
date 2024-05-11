import * as utils from '../utils.js';

document.addEventListener("DOMContentLoaded", () => {

    // Creating an array with city's names to make a loop (for) over it length (.length)
    // They are not TitleCase, as I'll need them to get the data from weather_data.js
    const cities = ["amsterdam", "berlin", "copenhagen", "cork", "new_york", "paris", "san_francisco", "tromso", "waterford"];

    for(let i=0; i<cities.length; i++){

        // If switch checked in settings
        if(localStorage.getItem(cities[i]) === 'true') {
            // Display the box info for that city in home
            document.getElementById(cities[i] + "_tile").style.display = "block";
        } else {
            // If switch is not checked, don't display the box infor for that city
            document.getElementById(cities[i] + "_tile").style.display = 'none';
        }

        // Capitalizing the first letter of the city displayed to be able to use them in the webpage (the box title)
        document.getElementById(cities[i]).innerHTML = utils.toTitleCase(cities[i]);

        // Capturing data from weather_data.js
        let cityDataDaily = weatherData[cities[i] + "_daily"];
        const cityDailyData = cityDataDaily.daily;
        // [0], as we just need 'today's' data from this javascript file 
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
        
        // Iteratively set the min and max temperature for each city 
        document.getElementById(cities[i] + "_today_max_temp").innerHTML = max_temp;
        document.getElementById(cities[i] + "_today_min_temp").innerHTML = min_temp;

        // Iteratively setting an image depending on the weather_code for the specific city
        let img = new Image();
        img.src = utils.getWeatherImage(cityDailyData.weather_code[0]);
        document.getElementById(cities[i]+"_today_weather_code_image").appendChild(img);
    }
});