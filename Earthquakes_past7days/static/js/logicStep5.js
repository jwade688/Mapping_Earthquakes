// Add console.log to confirm that the code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// Define the object that contains the overlays (this will be visible at all time)
let overlays = {
  Earthquakes: earthquakes
};

// Create the map with center, zoom leve, and defualt layer
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
  });

// Pass our map layers and overlays into our layers contol and add the layers
L.control.layers(baseMaps, overlays).addTo(map);

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4
}

// THis function determines the color of each bubble based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      style: styleInfo,

      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng) 
        },
        
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3> <hr> <h3>Location: " + feature.properties.title + "</h3>"); 
        }
    }).addTo(earthquakes);

    //Add the earthquake layer to our map.
    earthquakes.addTo(map);




    // Create a legend control object.
    let legend = L. control({
      position: "bottomright"
    });

    // Add all the details for the legend.
    legend.onAdd = function() {
      let div = L.DomUtil.create("dive", "info legend");
        const magnitudes = [0,1,2,3,4,5];
        const colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"
        ];
      // Loop through intervals to generate a label with a colored square for each interval
      for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          magnitudes[i] + (magnitudes[i+1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
      }
        return div;
    };

    legend.addTo(map);
});






// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//         console.log(feature.properties)
//         layer.bindPopup("<h1>Neighborhood: " + feature.properties.AREA_NAME + "</h1>");  
//         }
//     }).addTo(map);
// });