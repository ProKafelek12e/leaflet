var map = L.map('map',{dragging: false,scrollWheelZoom: "center",}).setView([52.15088015338915, 18.979287672131708], 6.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var fmarker = L.marker([52.186570236764446, 21.571465520662873]).addTo(map);
map.on('click', function (e) {

    console.log(e.latlng)
    //getData(e)
    mark(e)
});

/*async function getData(e){
    const lat = e.latlng.lat
    const lng = e.latlng.lng 
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    console.log(url)
    
    const data = await fetch(url)
    const json = await data.json()
    console.log(json)
}*/

function mark(e){
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    const lat = e.latlng.lat
    const lng = e.latlng.lng 

    //distance(52.186570236764446,lat,21.571465520662873,lng)
}
function distance(lat1,
    lat2, lon1, lon2)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
console.log(c * r+"KM");
}


