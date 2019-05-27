//API Keys
var googleAPIKey = "AIzaSyCQjmexIk0ui-r2JNDxbLeFyLTTABPzoio";
var OpenWeatherKey = "8fe124ac5d22d4066383c3b40d0ade7b";

// variables
var userLat = 33.748997;
var userLong = -84.387985;
var userLocation;
var activity;
var _id;
var link;
var weather;
var currentWeather;
var humidity;

//function that displays random advice
function randomAdvice(initAdviceId) {
	var currentIndex = parseInt($('#advice-number').html());
	var randomIndex;
	var randomAdvice;

	// calculate current index from page
	if (isNaN(currentIndex)) currentIndex = 0;
	else currentIndex--;

	if (initAdviceId) {
		initAdviceId = parseInt(initAdviceId);

		for (var i = 0; i < activies.length; i++) {
			if (activies[i][0] === initAdviceId) {
				randomIndex = i;
				break;
			}
		}
	}
	else {
		// select random advice
		do {
			randomIndex = Math.floor(Math.random() * activies.length);
		} while (randomIndex === currentIndex);
	}

	randomAdvice = activies[randomIndex];
	adviceHash = '/advice/' + randomAdvice[0];

	$('#advice-number').html(randomAdvice[0]);
	$('#advice-txt').html(randomAdvice[1]);

	if (history.replaceState) {
		history.replaceState(null, null, '#' + adviceHash);
	}
	else {
		window.location.hash = adviceHash;
	}
}

window.randomAdvice = randomAdvice;
window.initAdvice = function () {
	var rx = /\#\/activities\/(\d+)/g;
	var adviceHash = rx.exec(window.location.hash);
	if (adviceHash && adviceHash.length > 1) {
		randomAdvice(adviceHash[1]);
	}
	else {
		randomAdvice();
	}
};

}) (jQuery);



// ========== ON PAGE LOAD ========== //
// initially show a piece of advice on page load
displayRandomAdvice();
$("#topThree").hide();
// on "show me another thing" button click
$("#buttonNo").click(function () {
	displayRandomAdvice();
	$("#weather").hide();
	$("#topThree").hide();
	$("#map").hide();

});

// ========== GEOLOCATION ========== //

// function for finding the user's location using browser's geolocation
function geoFindMe() {
	// if the user's browser doesn't allow geolocation, console log and alertify the user.
	if (!navigator.geolocation) {
		console.log("Sorry, your browser does not support geolocation.");
	}

	// run this function if the user's browser does support geolocation
	function success(position) {
		// set the latitude and longitude from the returned response
		userLat = position.coords.latitude;
		userLong = position.coords.longitude;
		console.log(userLat, userLong);
		latLongConversion();
		getWeather();

		// let the console log and user know we've got their location
		//console.log("Thanks! Got your location.")
		alertify.success("Thanks for sharing your location.");
		//console.log("lat " + userLat + " long " + userLong);
	}

	// if we can't get the user's location, let them know.
	function error() {
		//console.log("Please allow us to locate you!");
		alertify.success("Please allow us to locate you.");
	}

	// this is actually getting the current location
	navigator.geolocation.getCurrentPosition(success, error);
}

// run the find location function on page load
geoFindMe();

// ========== FUNCTIONS ========== //

// function for displaying advice randomly from the database
// sets advice variable, adviceNumber variable, adviceLink variable (if there is a link) and adviceSearchTerm variable (if there are search terms)
function displayRandomAdvice() {
	$.ajax({
		url: "/random",
		method: "GET"
	}).done(function (data) {
		activity = data.activity;
		console.log(advice);
		// display that advice in its div
		$(".advice").html("<h1>" + advice + "</h1>");
		adviceNumber = data.thingNumber;
		// display advice number in its div
		$(".numberAdvice").html("<h3><i>advice # " + data._id + "  _____</i></h3>");
		if (data.link) {
			adviceLink = data.link;
			//console.log(adviceLink);
		} else if (data.searchTerm) {
			adviceSearchTerm = data.searchTerm;
			console.log(adviceSearchTerm);
		}
		randomGradient();
		doAdvice();
		$(".gradient-content").empty();
	});
};

// function for turning user's lat/long (from browser's geocode) to an address using google's geolocation api.
// sets userLocation variable to something more searchable
function latLongConversion(lat, long) {
	$.ajax({ url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&key=" + googleGeocodeKey, method: "GET" }).done(function (response) {
		// drills down and returns the user's city
		userLocation = response.results[4].address_components[1].short_name;
	});
};

// this function uses the user's lat/long plus the current advice's search terms from the database, plugs them into the google places api, and returns top locations nearby as well as the points on the map
var map;
var infowindow;

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
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: searchLocation,
		radius: 10000,
		keyword: [adviceSearchTerm]
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
	// this drills down and applies information from the top three closest results to the place variables
	$("#topThree").html("<h1 class='content'><i class='fa fa-globe fa-1x'></i> Top Results</h1>");
	for (var i = 0; i <= 2; i++) {
		placeName = results[i].name;
		vicinity = results[i].vicinity;
		// and displays it on the page
		$("#topThree").append("<h2 class='content'>" + placeName + "</h2><h3 class='content'>" + vicinity + "</h3>");
	};
}

function createMarker(place) {
	console.log("markers created");
	var placeLoc = place.geometry.location;
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

function placeSearch() {
	initMap();
	$("#weather").show();
	$("#topThree").show();
	$("#map").show();
};

// this function drills down into the map markers and returns information on the top three results to display via text above the map
function getPlace() {

};

// this is the app to get the user's current city weather data via the open weather map app. this is for some pieces of advice that require going outside.
function getWeather() {
	$.ajax({
		url: "https://api.wunderground.com/api/" + OpenWeatherKey + "/geolookup/q/" + userLat + "," + userLong + ".json",
		method: "GET"
	}).done(function (response) {
		$.ajax({ url: "https://api.wunderground.com/api/" + OpenWeatherKey + "/conditions/q/" + response.location.state + "/" + response.location.city + ".json", method: "GET" }).done(function (response) {
			weather = response.data.current_observation.weather;
			currentWeather = response.data.current_observation.temperature_string;
			humidity = response.data.current_observation.relative_humidity;
		});
	});
};

function displayWeather() {
	console.log(weather + " | Current Temp: " + currentWeather + " | " + humidity + " Humidity");
	$("#weather").html("<h1 class='content'><i class='fa fa-sun-o fa-1x'></i> Local Weather</h1><h3 class='content'>" + weather + " | Current Temp: " + currentWeather + " | " + humidity + " Humidity</h3>");
};