import * as utils from '../utils.js';

document.addEventListener("DOMContentLoaded", () => {

    // Getting the title's page from the URL from cityTile.njk (/cityFocus/?city={{ city }})
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");
    const title = utils.toTitleCase(city);
    // Storing the city name in local storage, this way I can use it in hourlyCityFocus.js
    localStorage.setItem('current_focus_city', city);
    // Printing title where id: cityFocusTitle 
    document.getElementById("cityFocusTitle").innerHTML = title;

    // Creating an array of days, as they'll be used to call the ids from cityFocusTile.njk
    const days = ["today", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // Capturing data from weather_data.js
    const cityDataDaily = weatherData[city + "_daily"];
    const cityDailyData = cityDataDaily.daily;

    // [i] and days.length - data for the 7 days of the week will be required in cityFocus.njk
    for(let i = 0; i < days.length; i++){

        let min_temp = cityDailyData.temperature_2m_min[i];
        let max_temp = cityDailyData.temperature_2m_max[i];
        
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

        let wind_speed = cityDailyData.wind_speed_10m_max[i];

        // If the prefered_speed_unit is set in local storage (if not set, the default is kph)
        if ( localStorage.getItem('prefered_speed_unit') ) {
            // If the prefered_speed_unit set in local storage is mph
            if (localStorage.getItem('prefered_speed_unit') === "mph"){
                // Convert the speed vars to mph
                wind_speed = utils.kmpToMph(wind_speed)+"mph";
            } else {
                wind_speed = wind_speed+"kph";
            }
        } else {
            wind_speed = wind_speed+"kph";
        }

        // Iteratively setting the daily specific values in the cityFocusTile.njk
        document.getElementById(days[i]+"_max_temp").innerHTML = max_temp;
        document.getElementById(days[i]+"_min_temp").innerHTML = min_temp;
        document.getElementById(days[i]+"_wind_speed").innerHTML = wind_speed;
        document.getElementById(days[i]+"_precipitation_probability").innerHTML = cityDailyData.precipitation_probability_max[i]+"%";
        
        // Iteratively setting an image depending on the weather_code for the specific day
        let img = new Image();
        img.src = utils.getWeatherImage(cityDailyData.weather_code[i]);
        document.getElementById(days[i]+"_weather_code_image").appendChild(img);
    }
});