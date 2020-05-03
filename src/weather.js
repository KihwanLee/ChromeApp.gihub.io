const COORDS = 'coords';
const apiKey = 'edee97c852dcef6a32a69f796e0fbe17';

function saveCoords(coordsObj) {
    console.log(JSON.stringify(coordsObj));
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
        // getWeather
    }
}

function init() {
    loadCoords();
}

init();