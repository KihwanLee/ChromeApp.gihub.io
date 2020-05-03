const COORDS = 'coords';
const apiKey = 'edee97c852dcef6a32a69f796e0fbe17';

const weather = document.querySelector('.js-weather')

function getWeather(lat, long) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
    ).then((res) => {
        return res.json();
    }).then((jsonObj) => {
        const temperature = jsonObj.main.temp;
        const place = jsonObj.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't access geo locations");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    
    if (loadedCords === null) {
        askForCoords();
    }   
    else {
        const parsedCoords = JSON.parse(loadedCords);
        // getWeather
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();