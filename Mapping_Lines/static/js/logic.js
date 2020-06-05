// Add console.log to confirm that the code is working
console.log("working");

// Create the map object with a ceter and zoom level.
let map = L.map('mapid').setView([37.6872, -97.3301], 5);

// Alternate way of creating map (useful when adding multiple tile layers
// or background image of maps)
// let map = L.map("mapid", {
//     center: [
//         40.7, -94.5
//     ],
//     zoom: 4
// });

// Create a marker
// let marker = L.circle([34.0522, -118.2437], {
// 	radius: 300,
// 	color: 'black',
//     fillColor: 'yellow',
//  }).addTo(map);

// Create a cities array
// Moved this to cities.js

// Coordinates for each point to be used in polyline
let line = [
	[40.6413, -73.7781],
	[43.6777, -79.6248],
  	[30.1975, -97.6664],
  	[45.5898, -122.5951]
];

// Create a polyline using the line coordinates and make the line red
L.polyline(line, {
	color: "blue",
	weight: 4,
	dashArray: '5, 5',
	opacity: .5
}).addTo(map);

// Get data from cities.js
// let cityData = cities;

// // Loop through the cities array and create a marker for each city.
// cityData.forEach(function(city) {
// 	console.log(city)
// 	L.circleMarker(city.location, {
// 		radius: city.population/100000,
// 		color: 'orange',
// 		fillColor: 'orange',
// 		weight: 4
// 	})
// 	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// 	.addTo(map);
// });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);