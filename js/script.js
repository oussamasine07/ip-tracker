const seachInput = document.getElementById("search_input");
const seachBtn = document.getElementById("search");

const ip = document.getElementById("ip");
const adress = document.getElementById("adress");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");


let mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3Vzc2FzaW4iLCJhIjoiY2t0YzEwcjJhMGFzZjJ4cndvcm92ZHVpdSJ9.AyVZsc8aTGIfx5MKLoBxBw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3Vzc2FzaW4iLCJhIjoiY2t0YzEwcjJhMGFzZjJ4cndvcm92ZHVpdSJ9.AyVZsc8aTGIfx5MKLoBxBw'
}).addTo(mymap);

const updateMap = (updateMarker = [100, 100]) => {
    mymap.setView(updateMarker, 13);
    L.marker(updateMarker).addTo(mymap)
}

let ipAdressURL;

const adressURL = "https://geo.ipify.org/api/"
const ipfyKey = "at_89ABCuWgIpo16si5MknfPNgrY94zI"
const version = "v1";


const searchMap = async (defaultIP) => {
    if (defaultIP === null || defaultIP === undefined) {
        ipAdressURL = `${adressURL}${version}?apiKey=${ipfyKey}`
    } else {
        
`https://geo.ipify.org/api/v1?apiKey=at_89ABCuWgIpo16si5MknfPNgrY94zI&ipAddress=8.8.8.8`
        ipAdressURL = `${adressURL}${version}?apiKey=${ipfyKey}&ipAddress=${defaultIP}`
    }
    console.log(ipAdressURL)
    fetch(ipAdressURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            ip.innerText = data.ip;
            adress.innerText = `${data.location.country} ${data.location.city}, ${data.location.region}`;
            timezone.innerText = data.location.timezone;
            isp.innerText = data.isp
            updateMap([data.location.lat, data.location.lng])
        })
   
}

searchMap();

seachBtn.addEventListener("click", () => {

    if (seachInput.value != "" || seachInput.value != undefined) {
        searchMap(seachInput.value);
    }
    
});