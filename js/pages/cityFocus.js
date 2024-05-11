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

    // Getting current Date
    let date = new Date();

    // Getting the current hour to use later as an index for the weather_data
    let currentHour = date.getHours();

    // Getting the local time zone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Getting the current time in a short 24hr format
    const currentTime = date.toLocaleTimeString('en', {timeStyle: 'short', hour12: false, timeZone: timezone})

    // Creating a single variable(cityHourlyData) to store city specific hourly data
    const cityDataHourly = weatherData[city + "_hourly"];
    const cityHourlyData = cityDataHourly.hourly;

    let current_temp = cityHourlyData.temperature_2m[currentHour];
    let current_apparent_temp = cityHourlyData.apparent_temperature[currentHour];
    
    // If the prefered_temp_unit is set in local storage (if not set, the default is celsius)
    if ( localStorage.getItem('prefered_temp_unit') ) {
        // If the prefered_temp_unit set in local storage is fahrenheit
        if (localStorage.getItem('prefered_temp_unit') === "fahrenheit"){
            // Convert the temperture vars to fahrenheit
            current_temp = utils.celciusToFahrenheit(current_temp)+"°F";
            current_apparent_temp = utils.celciusToFahrenheit(current_apparent_temp)+"°F";
        } else {
            current_temp = current_temp+"°C";
            current_apparent_temp = current_apparent_temp+"°C";
        }
    } else {
        current_temp = current_temp+"°C";
        current_apparent_temp = current_apparent_temp+"°C";
    }

    let current_wind_speed = cityHourlyData.wind_speed_10m[currentHour];

    // If the prefered_speed_unit is set in local storage (if not set, the default is kph)
    if ( localStorage.getItem('prefered_speed_unit') ) {
        // If the prefered_speed_unit set in local storage is mph
        if (localStorage.getItem('prefered_speed_unit') === "mph"){
            // Convert the speed vars to mph
            current_wind_speed = utils.kmpToMph(current_wind_speed)+"mph";
        } else {
            current_wind_speed = current_wind_speed+"kph";
        }
    } else {
        current_wind_speed = current_wind_speed+"kph";
    }

    // Setting values for current time
    document.getElementById("current_time").innerHTML = "Current Time: " + currentTime;
    document.getElementById("current_temperature").innerHTML = current_temp;
    document.getElementById("current_real_feel").innerHTML = current_apparent_temp;

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