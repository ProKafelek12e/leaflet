var greenIcon = L.icon({
    iconUrl: 'https://mks-korona-kielce.pl/wp-content/uploads/2018/11/logo_3-e1551964982598.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var map = L.map('map',{dragging: false}).setView([52.15088015338915, 18.979287672131708], 6.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
var fmarker = L.marker([52.186570236764446, 21.571465520662873],{icon: greenIcon}).addTo(map);
map.on('click', function (e) {
    const lat = e.latlng.lat
    const lng = e.latlng.lng 
    console.log(e.latlng)
    //mark(e)
});


function mark(e){
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    const lat = e.latlng.lat
    const lng = e.latlng.lng 

}
for(let i =0 ;i<=powiaty.features.length-1;i++){
    var powiat = powiaty.features[i]
    if(powiat.properties.nazwa=="powiat miński"){
        var mappowiat = L.geoJSON(powiat,{color:'blue'}).addTo(map)
        mappowiat.bindTooltip(powiat.properties.nazwa)
    }
    if(powiat.properties.nazwa!="powiat miński"){
        var mappowiat = L.geoJSON(powiat,{color:'gray'}).addTo(map)
        mappowiat.bindTooltip(powiat.properties.nazwa)
        L.geoJSON(powiat,{color:'green'})
    }
}