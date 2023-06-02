var map = L.map('map').setView([52.21959538181896, 23.08635048903569], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom:7,maxZoom: 7,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
var wojLayer = []
var wojDoCheck = ""

var PoprODP = []
var bleODP = []
var nieODP = []

function mapa(){
    for(let i=0;i<=woje.features.length-1;i++){
        var woj = woje.features[i]
        var mapwoje = L.geoJSON(woj,{color:"blue"}).addTo(map)

        
        //zmiana kolor na zielony przy najechaniu
        mapwoje.on("mouseover",(e)=>{
            //console.log(wojLayer[i]._layers[e.layer._leaflet_id].feature.properties.nazwa)
        if(wojLayer[i].options.color=="blue"){
                wojLayer[i].setStyle({
                    color:"gray",
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
        wojDoCheck =  wylosowaneWojewodztwo
        for(let i=0;i<=wojLayer.length-1;i++){
            if(wojLayer[i].licznik==1&& wojLayer[i].options.color =="yellow"){
                wojLayer[i].setStyle({color:"black"})
                wojLayer[i].options.color = "black"
                nieODP.push(wojLayer[i].name)
            }
            if(wojLayer[i].name==wylosowaneWojewodztwo){
                wojLayer[i].setStyle({color:"yellow"})
                wojLayer[i].options.color = "yellow"
                wojLayer[i].licznik = 1
            }
        }




    } else {
    }
}

function check(){ 
        for(let i=0;i<=wojLayer.length-1;i++){
            console.log(wojLayer[i].name)
            if(wojLayer[i].name == wojDoCheck){
                
            if(document.getElementById("wojewodztwoInp").value==wojDoCheck){
                wojLayer[i].setStyle({color:"green"})
                wojLayer[i].options.color = "green"
                PoprODP.push(wojLayer[i].name)
            }
            else{
                wojLayer[i].setStyle({color:"red"})
                wojLayer[i].options.color = "red"
                bleODP.push(wojLayer[i].name)
            }
            }
        }
        console.log(nieODP.length)
        if(PoprODP.length + bleODP.length + nieODP.length ==16){
            const div = document.createElement("div")
            div.innerHTML = "Koniec gry"
            div.classList.add("win")
            div.id = "win"
            document.getElementById("body").appendChild(div)
            console.log(bleODP,PoprODP,nieODP)


            const ulp = document.createElement("ul")
            for(let i=0;i<=PoprODP.length-1;i++){
                console.log("p")
                const lip = document.createElement("li")
                lip.innerHTML = PoprODP[i]
                ulp.appendChild(lip)
            }
            ulp.classList.add("ulp")
            document.getElementById("win").appendChild(ulp)
            const ulb = document.createElement("ul")
            for(let i=0;i<=bleODP.length-1;i++){
                const lib = document.createElement("li")
                lib.innerHTML = bleODP[i]
                ulb.appendChild(lib)
            }
            ulb.classList.add("ulb")
            document.getElementById("win").appendChild(ulb)
            const uln = document.createElement("ul")
            for(let i=0;i<=nieODP.length-1;i++){
                const lin = document.createElement("li")
                lin.innerHTML = nieODP[i]
                uln.appendChild(lin)
            }
            uln.classList.add("uln")
            document.getElementById("win").appendChild(uln)
        }
}

function start(){
    document.getElementById("start").remove()
}