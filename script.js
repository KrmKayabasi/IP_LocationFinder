/*UI Elements */

let ipaddress_ui = document.getElementById("ipadress")
let location_ui = document.getElementById("location")
let timezone_ui = document.getElementById("timezone")
let ISP_ui = document.getElementById("ISP")
let ipaddress_textbox = document.getElementById("ipadress_textbox")
let ipaddress_submit = document.getElementById("submit")


/* Inıtial Map Variables and Settings */
var map = L.map('map')

var anchor = L.icon({
    iconUrl: 'images/icon-location.svg',
    shadowUrl: '',

    iconSize:     [40, 48.69], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [20, 48.69], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

ipaddress_submit.addEventListener('click',getDatafromIP)



async function getDatafromIP() {
    let ip_adress =ipaddress_textbox.value
    let value = await fetchData(ip_adress)
    
    console.log(value)
    ipaddress_ui.innerText = value.ip
    location_ui.innerText = value.location.city + value.location.postalCode
    timezone_ui.innerText = "GMT " + value.location.timezone
    ISP_ui.innerText = (value.isp).substring(0,20) + "."
    map.setView([value.location.lat,  value.location.lng], 18);
    L.marker([value.location.lat,value.location.lng], {icon: anchor}).addTo(map);
    console.log(value)



}

async function fetchData(ipadress) {
    
    const apiKey= "at_Ck0OC8M8r9OnlGZ10ZEFLbzyJnyu9"
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipadress}`
    let response = await fetch(url)
    let value = await response.json()
    return value
        
    
}

async function getIP() {

    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip
    
}

getDatafromIP(getIP())
