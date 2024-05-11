// This utils file contains multiple helper functions (for now or in the future), which will be used in other javascript files

// Making the navbar-burger (navbar-menu) work when click on the hamburger menu button (used in home, index and settings)
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
$navbarBurgers.forEach(page => {
    page.addEventListener("click", () => {

        const target = page.dataset.target;
        const $target = document.getElementById(target);
        
        // Adding/removing "is-active" to the class when click
        page.classList.toggle("is-active");
        $target.classList.toggle("is-active");

        
    })
});

// Export: needed to export and use the function in different files

// Creating a function to TitleCase the input
export function toTitleCase(input){
    if(!input){
        return "";
    }

    let title = '';
    // split the input string into an array on any non alphanumeric chars
    const titleArray = input.split(/[^A-Za-z0-9]/);

    // if the array has at least 1 element, process the first word
    if ( titleArray.length > 0 ) {
        title = titleArray[0].charAt(0).toUpperCase() + titleArray[0].slice(1);
    }

    // if the array has more than 1 element, process the all remaining words
    if ( titleArray.length > 1 ) {
        for (let i = 1; i < titleArray.length; i++){
            title = title+' '+titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1);
        }
    }

    return title;
}

// Depending on the weather_code value, 1 of 8 different images will be displayed
// The values have been taken from the pdf provided (data-definition.pdf, pages 19-20)
export function getWeatherImage(weatherCode){
    
    // Creating weatherImage variable
    let weatherImage = "";
    
    if(weatherCode == 0){
        weatherImage = "../images/sun.png";
    } else if(weatherCode >= 1 && weatherCode <= 3){
        weatherImage = "../images/cloudy.png";
    } else if(weatherCode >= 45 && weatherCode <= 48){
        weatherImage = "../images/fog.png";
    } else if(weatherCode >= 51 && weatherCode <= 55){
        weatherImage = "../images/drizzle.png";
    } else if(weatherCode >= 56 && weatherCode <= 57){
        weatherImage = "../images/snow.png";
    } else if(weatherCode >= 61 && weatherCode <= 65){
        weatherImage = "../images/rain.png";
    } else if(weatherCode >= 66 && weatherCode <= 67){
        weatherImage = "../images/snow-shower.png";
    } else if(weatherCode >= 71 && weatherCode <= 77){
        weatherImage = "../images/snow.png";
    } else if(weatherCode >= 80 && weatherCode <= 82){
        weatherImage = "../images/rain.png";
    } else if(weatherCode >= 85 && weatherCode <= 86){
        weatherImage = "../images/snow-shower.png";
    } else if(weatherCode >= 95 && weatherCode <= 96){
        weatherImage = "../images/thunderstorm.png";
    }

    return weatherImage;
}

// Creating a function to switch from kph to mph
export function kmpToMph(kilometers){
    var miles = kilometers * 0.621371;
    // Using Math.round() to return the value of the number rounded to the nearest integer (avoiding long numbers)
    miles = Math.round(miles);
    return miles;
}

// Creating a function to switch from celsius to fahrenheit
export function celciusToFahrenheit(celsius) {
    var fahrenheit = ((celsius * 9.0 / 5.0) + 32.0);
    // Using Math.round() to return the value of the number rounded to the nearest integer (avoiding long numbers)
    fahrenheit = Math.round(fahrenheit);
    return fahrenheit;
}