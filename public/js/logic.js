//API Keys
var googleAPIKey = "AIzaSyCQjmexIk0ui-r2JNDxbLeFyLTTABPzoio";
var OpenWeatherKey = "64b87f674a5617c161ea40740a6dc2f9";

//Main information variables
var activity;
var activity_id;
var link;

//Default latitude and longitude (Prototype Prime)
var userLat = 33.963491;
var userLong = -84.221050;
var userLocation;
var map;
var infowindow;

//Weather API variables
var weather;
var temperature;
var humidity;

//display initial activity
displayActivity();

//When "next" button is clicked
$("#next-btn").click(function () {
	displayActivity();
	$("#weather").hide();
	$("#map").hide();
});

$("#info-btn").click(function () {
	$("#weather").show();
	$("#map").show();
});


// function for finding the user's location using browser's geolocation
function geoFindMe() {
	// if the user's browser doesn't allow geolocation, alertify the user.
	if (!navigator.geolocation) {
		console.log("Sorry, your browser does not support geolocation.");
		alertify.success("Sorry, your browser does not support geolocation.");
	}
	// run this function if the user's browser does support geolocation
	function success(position) {
		// set the latitude and longitude from the returned response
		userLat = position.coords.latitude;
		userLong = position.coords.longitude;
		console.log(userLat, userLong);
		latLongConversion();
		getWeather();
		console.log("Thank you! We got your location.")
		alertify.success("Thank you for sharing your location.");
		console.log("lat: " + userLat + ", long: " + userLong);
	}
	function error() {
		console.log("Please allow us to locate you!");
		alertify.success("Please allow us to locate you.");
	}
	navigator.geolocation.getCurrentPosition(success, error);
}
geoFindMe();

//function to display random activity with database
function displayActivity() {
	$.ajax({
		url: "/activity",
		method: "GET"
	}).done(function (data) {
		activity = data.activity;
		console.log(activity);
		// display it to the html
		$("#activity_title").html("<h1>" + activity + "</h1>");
		activity_id = data._id;
		// display activity number in its div
		$("#activity_id").html("<h2> Activity number: #" + data._id + " </h2>");
	});
};

// function for converting the user's lat/long to an address using Google's Geolocation API
function latLongConversion(lat, long) {
	$.ajax({ url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&key=" + googleAPIKey, method: "GET" }).done(function (response) {
		// return the user's city
		userLocation = response.results[0].address_components[2].short_name;
		console.log(userLocation);
		console.log(response.results[0].formatted_address);
	});
};


function initMap() {
	var searchLocation = { lat: userLat, lng: userLong };
	map = new google.maps.Map(document.getElementById('map'), {
		center: searchLocation,
		zoom: 11,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f5f5"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#bdbdbd"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#757575"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#616161"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e5e5e5"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#eeeeee"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#c9c9c9"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#9e9e9e"
					}
				]
			}
		]
	});

	$("#map").hide();

	infowindow = new google.maps.InfoWindow();
}

//View how many results pop up and create markers for each one
function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

//Function to create markers for each place
function createMarker(place) {
	console.log("markers created");
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|eaa085'
	});

	google.maps.event.addListener(marker, 'click', function () {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
};

//function that retrieves the current weather of user location
function getWeather(lat, long) {
	// $.ajax({
	// 	url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&key=" + googleAPIKey,
	// 	method: "GET"
	// }).then(function (response) {
	// 	var city = response.results[0].address_components[2].short_name;
	// 	var state = response.results[0].address_components[4].short_name;
	// 	console.log("City: " + city, "State: " + state);
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&key=" + OpenWeatherKey,
		method: "GET"
	}).then(function (result) {
		console.log(result);
	})
}
// };

