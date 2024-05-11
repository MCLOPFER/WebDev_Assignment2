document.addEventListener("DOMContentLoaded", () => {

    // Setting local storage for favourite cities from the user
    document.querySelectorAll("[id^=favCity_]").forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
        const city = event.target.id.replace('favCity_','');
        const isFavourite =  event.target.checked;
        localStorage.setItem(city, isFavourite);
        })
    });

    document.querySelectorAll("[id^=favCity_]").forEach(checkbox => {
        const city = checkbox.id.replace('favCity_','');
        const isFavourite = localStorage.getItem(city) === 'true';
        checkbox.checked = isFavourite;
    });

    // Setting local storage for speed units, as user is able to pick 2 different speed units
    const speedSelect = document.getElementById('favSpeed');
    speedSelect.addEventListener('change', (event) => {
        let speedUnit = event.target.value;
        localStorage.setItem('prefered_speed_unit', speedUnit);
    });

    if ( localStorage.getItem('prefered_speed_unit') ) {
        speedSelect.value = localStorage.getItem('prefered_speed_unit'); 
    }

    // Setting local storage for temperature units, as user is able to pick 2 different temperature units
    const tempSelect = document.getElementById('favTemp');
    tempSelect.addEventListener('change', (event) => {
        let tempUnit = event.target.value;
        localStorage.setItem('prefered_temp_unit', tempUnit);
    });

    if ( localStorage.getItem('prefered_temp_unit') ) {
        tempSelect.value = localStorage.getItem('prefered_temp_unit'); 
    }
});