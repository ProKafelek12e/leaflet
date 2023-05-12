var map = L.map('map',{dragging: false}).setView([52.15088015338915, 18.979287672131708], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 7,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
var punkty = 0
var zycia = 3
var wojLayer = []
var runda = 1
var wynik
function mapa(){
    for(let i =0 ;i<=woje.features.length-1;i++){
        var woj = woje.features[i]
        var mapwoje = L.geoJSON(woj,{color: "blue"}).addTo(map)
        mapwoje.on("click", (e)=>{
            console.log(wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa)
            check(i,e)
            wojLayer[i].setStyle({
                color:"red",
                weight:2,
            })
        })

        wojLayer.push(mapwoje)
    }
}
function random(){
    return Math.floor((Math.random() * woje.features.length))
}
var los
function genWoje(){
    los = woje.features[random()].properties.nazwa
    if(document.getElementById("h1") != undefined) document.getElementById("h1").remove()
    const h1 = document.createElement("h1")
    h1.innerHTML = "Kliknij województwo: "+los
    h1.id = "h1"
    document.getElementById("menu").appendChild(h1)
}
genWoje()
function check(i,e){
    if(document.getElementById("h1").innerHTML=="Kliknij województwo: "+wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa){
        wynik = "w"
        console.log("sukces")
        punkty++
    }
    else{ 
        wynik = "l"
        console.log("nopek")
        zycia--    
    }
    if(wynik=="l"){
    srodekG(wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa)
    srodekC(los)
    linia()
    }
    kolejnaRunda()
    runda++
}
mapa()
function kolejnaRunda(){
    for(let i =0 ;i<=woje.features.length-1;i++){
        wojLayer[i].setStyle({
            color:"blue",
            weight:2,
        })
    }
    genWoje()
    console.log(`z:${zycia} p:${punkty}`)
    document.getElementById("punkty").innerHTML ="Punkty: "+punkty
    document.getElementById("zycia").innerHTML = "Życia: "+zycia
    gameOver()
}
function gameOver(){
    if(zycia==0){
        const div = document.createElement("div")
        div.id= "gameOver"
        div.setAttribute("onclick", "restart()")
        
        const h2 = document.createElement("h2")
        h2.innerHTML="Game Over"
        const info = document.createElement("h3")
        info.innerHTML = "Points: "+punkty
        const h3 = document.createElement("h3")
        h3.innerHTML="click to restart game"
        div.appendChild(h2)
        div.appendChild(info)
        div.appendChild(h3)
        document.getElementById("body").appendChild(div)
    }
}
function restart(){
    document.getElementById("gameOver").remove()
    punkty = 0
    zycia = 3
    kolejnaRunda()
}
function srodekG(t){
    var tp =0
    var bp = 100
    var rp =0
    var lp = 100
    var r=0
    var l
    for(l =0;l<=woje.features.length-1;l++){
        if(t==woje.features[l].properties.nazwa){
            r= l
        }
    } console.log(r)

    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][0]>tp) tp = woje.features[r].geometry.coordinates[0][j][0]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][0]<bp) bp = woje.features[r].geometry.coordinates[0][j][0]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][1]>rp) rp = woje.features[r].geometry.coordinates[0][j][1]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][1]<lp) lp = woje.features[r].geometry.coordinates[0][j][1]
    }
    var w = (rp-lp)/2+lp
    var h = (tp-bp)/2+bp
    Gmark(w,h)
}
function Gmark(w,h){
    var Gmarker = L.marker([w, h]).addTo(map);
    latlngs.push({lat:w,lng:h})
}
function srodekC(t){
    var tp =0
    var bp = 100
    var rp =0
    var lp = 100
    var r=0
    var l
    for(l =0;l<=woje.features.length-1;l++){
        if(t==woje.features[l].properties.nazwa){
            r= l
        }
    } console.log(r)

    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][0]>tp) tp = woje.features[r].geometry.coordinates[0][j][0]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][0]<bp) bp = woje.features[r].geometry.coordinates[0][j][0]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][1]>rp) rp = woje.features[r].geometry.coordinates[0][j][1]
    }
    for(let j=0;j<= woje.features[r].geometry.coordinates[0].length-1;j++){
        if(woje.features[r].geometry.coordinates[0][j][1]<lp) lp = woje.features[r].geometry.coordinates[0][j][1]
    }
    var cw = (rp-lp)/2+lp
    var ch = (tp-bp)/2+bp
    Cmark(cw,ch)
}
function Cmark(cw,ch){
    var Cmarker = L.marker([cw, ch]).addTo(map);
    latlngs.push({lat:cw,lng:ch})
}
var latlngs = [];
function linia(){
    console.log("linia")
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
}
