//TODO:
//     - Include my location on the map (google API?)
//     - Create an alert (email/pop-up) when ISS is close to home/me


// Map and tiles
const myMap = L.map('issMap').setView([0, 0], 2);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(myMap);


// Marker with custom icon
const issIcon = L.icon({
    iconUrl: 'images/iss.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(myMap);


// API for the location of ISS
const baseURL = 'https://api.wheretheiss.at/v1/satellites/25544';


let firstTime = true;


// Gets location, converts to JSON, selects desired data, updates markers location
// and dom elements for lat&lon
async function getIss() {
  const response = await fetch(baseURL);
  const data = await response.json();
  const { latitude, longitude } = data;


// Sets initial zoom to 5, but only first time
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    myMap.setView([latitude, longitude], 5);
    firstTime = false;
  }

  document.getElementById('lat').textContent = latitude.toFixed(2);
  document.getElementById('lon').textContent = longitude.toFixed(2);
}

// run
getIss();
setInterval(getIss, 1000);
