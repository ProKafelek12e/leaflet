var map = L.map('map',{dragging: false}).setView([52.15088015338915, 18.979287672131708], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

var punkty = 0
var zycia = 3

var wojLayer = []
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

function genWoje(){
    if(document.getElementById("h1") != undefined) document.getElementById("h1").remove()
    const h1 = document.createElement("h1")
    h1.innerHTML = "Kliknij województwo: "+woje.features[random()].properties.nazwa
    h1.id = "h1"
    document.getElementById("menu").appendChild(h1)
}
genWoje()

function check(i,e){
    srodekL()
    if(document.getElementById("h1").innerHTML=="Kliknij województwo: "+wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa){
        console.log("sukces")
        punkty++
    }
    else{ 
        console.log("nopek")
        zycia--    
    }
    kolejnaRunda()
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

function srodekL(){

}