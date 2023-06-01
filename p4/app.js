var map = L.map('map').setView([52.15088015338915, 18.979287672131708], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom:7,maxZoom: 7,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
var wojLayer = []
var e
function mapa(){
    for(let i=0;i<=woje.features.length-1;i++){
        var woj = woje.features[i]
        var mapwoje = L.geoJSON(woj,{color:"blue"}).addTo(map)

        
        //zmiana kolor na zielony przy najechaniu
        mapwoje.on("mouseover",(e)=>{
            console.log(wojLayer[i].options)
            //console.log(wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa)
        if(wojLayer[i].options.color=="blue"){
                wojLayer[i].setStyle({
                    color:"green",
                    weight:3,
                })
            }
        })
        //zmiana koloru na niebieski po wyjechaniu
        mapwoje.on("mouseout",(e)=>{
            if(wojLayer[i].options.color =="blue"){
                wojLayer[i].setStyle({
                    color:"blue",
                    
                })
            }
        })
        
        mapwoje.name= woje.features[i].properties.nazwa
        wojLayer.push(mapwoje)
        console.log(mapwoje)
    }
}
mapa()


var wojela = L.geoJson(woje.features).addTo(map);
wojela.setStyle({color:"none"})
var dostepneWojewodztwa = wojela.getLayers()




function losuj() {
    if (dostepneWojewodztwa.length === 0) {
        return null;
    }

    var wylosowanyIndex = Math.floor(Math.random() * dostepneWojewodztwa.length)
    var wylosowane = dostepneWojewodztwa[wylosowanyIndex]
    var nazwaWojewodztwa = wylosowane.feature.properties.nazwa

    dostepneWojewodztwa.splice(wylosowanyIndex, 1)

    return nazwaWojewodztwa
}

function wylosuj() {
    var wylosowaneWojewodztwo = losuj()
    if (wylosowaneWojewodztwo !== null) {
        document.getElementById("wojewodztwo").innerHTML = wylosowaneWojewodztwo
        for(let i=0;i<=wojLayer.length-1;i++){
            if(wojLayer[i].licznik>0){
                wojLayer[i].setStyle({color:"red"})
                wojLayer[i].options.color = "red"
            }

            if(wojLayer[i].name==wylosowaneWojewodztwo){ console.log("w")
                wojLayer[i].setStyle({color:"yellow"})
                wojLayer[i].options.color = "yellow"
                wojLayer[i].licznik = 1
            }
        }





    } else {
        document.getElementById("wojewodztwo").innerHTML = "Wszystkie województwa zostały już wylosowane."
    }
}
