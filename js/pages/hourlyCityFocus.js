import * as utils from '../utils.js';

document.addEventListener("DOMContentLoaded", () => {

    // Getting the city name from the local storage as it has been set in the previous page
    const city = localStorage.getItem('current_focus_city');
    const title = utils.toTitleCase(city);
    document.getElementById("hourlyCityFocusTitle").innerHTML = title;

    // Getting current Date
    let date = new Date();

    // Adding a function to add hours to a giving date
    Date.prototype.addHours= function(hours){
        this.setHours(this.getHours()+hours);
        return this;
    }

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
    document.getElementById("current_wind_speed").innerHTML = current_wind_speed;
    document.getElementById("current_precipitation_probability").innerHTML = cityHourlyData.precipitation_probability[currentHour]+"%";

    // Setting an image depending on the weather_code for the current time
    let img = new Image();
    img.src = utils.getWeatherImage(cityHourlyData.weather_code[currentHour]);
    document.getElementById("current_weather_code_image").appendChild(img);

    // Creating an index variable for traversing the weather_data
    let index = currentHour;
    // Setting the minutes to 0 to match the weather_data
    date.setMinutes(0);

    for(let i=0; i<24; i++){

        let this_temp = cityHourlyData.temperature_2m[index];
        let this_apparent_temp = cityHourlyData.apparent_temperature[index];
        
        // If the prefered_temp_unit is set in local storage (if not set, the default is celsius)
        if ( localStorage.getItem('prefered_temp_unit') ) {
            // If the prefered_temp_unit set in local storage is fahrenheit
            if (localStorage.getItem('prefered_temp_unit') === "fahrenheit"){
                // Convert the temperture vars to fahrenheit
                this_temp = utils.celciusToFahrenheit(this_temp)+"°F";
                this_apparent_temp = utils.celciusToFahrenheit(this_apparent_temp)+"°F";
            } else {
                this_temp = this_temp+"°C";
                this_apparent_temp = this_apparent_temp+"°C";
            }
        } else {
            this_temp = this_temp+"°C";
            this_apparent_temp = this_apparent_temp+"°C";
        }

        let this_wind_speed = cityHourlyData.wind_speed_10m[index];

        // If the prefered_speed_unit is set in local storage (if not set, the default is kph)
        if ( localStorage.getItem('prefered_speed_unit') ) {
            // If the prefered_speed_unit set in local storage is mph
            if (localStorage.getItem('prefered_speed_unit') === "mph"){
                // Convert the speed vars to mph
                this_wind_speed = utils.kmpToMph(this_wind_speed)+"mph";
            } else {
                this_wind_speed = this_wind_speed+"kph";
            }
        } else {
            this_wind_speed = this_wind_speed+"kph";
        }

        // Iteratively set the elements for each displayed hour with data starting at the current hour
        document.getElementById(i+"_time").innerHTML = date.addHours(1).toLocaleTimeString('en', {timeStyle: 'short', hour12: false, timeZone: timezone});
        document.getElementById(i+"_temperature").innerHTML = this_temp;
        document.getElementById(i+"_real_feel").innerHTML = this_apparent_temp;
        document.getElementById(i+"_wind_speed").innerHTML = this_wind_speed;
        document.getElementById(i+"_precipitation_probability").innerHTML = cityHourlyData.precipitation_probability[index]+"%";
        
        // Iteratively set the weather image for each displayed hour using the weather_code data starting at the current hour
        let img = new Image();
        img.src = utils.getWeatherImage(cityHourlyData.weather_code[index]);
        document.getElementById(i+"_weather_code_image").appendChild(img);

        // Increment weather_data index (currentHour++)
        index++;
    }
});