// Add console.log to confirm that the code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map with center, zoom leve, and defualt layer
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
  });

// Pass our map layers into our layers contol and add the layers
L.control.layers(baseMaps).addTo(map);

// Accessing airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jwade688/Mapping_Earthquakes/master/majorAirports.json"

d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
    onEachFeature: function(feature, layer) {
        // console.log(feature.properties)
        layer.bindPopup("<h1>Airport Code: " + feature.properties.faa + "</h1> <hr> <h2>Airport Name: " + feature.properties.name + "</h2>");  
        }
    }).addTo(map);
});