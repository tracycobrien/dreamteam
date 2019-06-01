//API Keys
var googleAPIKey = "AIzaSyCQjmexIk0ui-r2JNDxbLeFyLTTABPzoio";
var OpenWeatherKey = "166a433c57516f51dfab1f7edaed8413";

//Default latitude and longitude (Prototype Prime)
var userLat = 33.963491;
var userLong = -84.221050;
var userLocation;
var map;
var infowindow;

// //display initial activity
// displayActivity();

// //When "next" button is clicked
// $("#next-btn").click(function () {
// 	displayActivity();
// 	$("#weather").hide();
// 	$("#map").hide();
// });

// $("#info-btn").click(function () {
// 	$("#weather").show();
// 	$("#map").show();
// });


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
// function displayActivity() {
// 	$.ajax({
// 		url: "/activity",
// 		method: "GET"
// 	}).done(function (data) {
// 		activity = data.activity;
// 		console.log(activity);
// 		// display it to the html
// 		$("#activity_title").html("<h1>" + activity + "</h1>");
// 		activity_id = data._id;
// 		// display activity number in its div
// 		$("#activity_id").html("<h2> Activity number: #" + data._id + " </h2>");
// 	});
// };

// function for converting the user's lat/long to an address using Google's Geolocation API
function latLongConversion(lat, long) {
	$.ajax({ url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&key=" + googleAPIKey, method: "GET" }).done(function (response) {
		// return the user's city
		userLocation = response.results[0].address_components[2].short_name;
		console.log(userLocation);
		console.log(response.results[0].formatted_address);
	});
};

function myMap() {
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

//function that retrieves the current weather of Atlanta
function getWeather() {
	var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
		"q=Atlanta,Atlanta&units=imperial&appid=" + OpenWeatherKey;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		// Transfer content to HTML
		$(".city").html("<h1>" + response.name + " Weather Details</h1>");
		$(".wind").text("Wind Speed: " + response.wind.speed);
		$(".humidity").text("Humidity: " + response.main.humidity);
		$(".temp").text("Temperature (F) " + response.main.temp);

		// Log the data in the console as well
		console.log("Wind Speed: " + response.wind.speed);
		console.log("Humidity: " + response.main.humidity);
		console.log("Temperature (F): " + response.main.temp);
	})
}
getWeather();

const activities = [
	{
		_id: 1,
		activity: 'Are you a history nerd?',
		description: "Founded in 1926, the Atlanta History Center located in Buckhead is an all-inclusive 32-acre destination featuring the Atlanta History Museum, one of the Southeast's largest history museums; two historic houses, the 1928 Swan House and the Smith Family Farm. It features 32 acres of gardens, wildlife trails and woodland areas.",
		link: "www.atlantahistorycenter.com"
	},

	{
		_id: 2,
		activity: 'Get some sunshine',
		description: "Piedmont Park is an urban park located about 1 mile northeast of Downtown, between the Midtown and Virginia Highland neighborhoods. Originally the land was owned by Dr. Benjamin Walker, who used it as his out-of-town gentleman's farm and residence.",
		link: "www.piedmontpark.org"
	},
	{
		_id: 3,
		activity: 'Run through some sprinklers',
		description: "Centennial Olympic Park is a 21-acre park located in downtown Atlanta, and operated by the Georgia World Congress Center Authority. It was built by the Atlanta Committee for the Olympic Games (ACOG) as part of the infrastructure improvements for the 1996 Summer Olympics.",
		link: "www.gwcca.org/park"
	},
	{
		_id: 4,
		activity: 'Smell the roses',
		description: "The Atlanta Botanical Garden is a 30 acre botanical garden located adjacent to Piedmont Park in Midtown Atlanta. It was incorporated in 1976, the garden's mission is to develop and maintain plant collections for the purposes of display, education, conservation, research and enjoyment.",
		link: "atlantabg.org"
	},
	{
		_id: 5,
		activity: "I mean I get it, but I also don't",
		description: "The High Museum",
		link: "www.high.org"
	},
	{
		_id: 6,
		activity: 'Go Wild!',
		description: "Zoo Atlanta is one of the oldest zoos in the United States. While animal displays draw visitors, animal research and conservation studies are also important activities of the zoo. An abundance of animals and plant species are found at the zoo, including 50 species of bird and 40 species of mammal -- over 1,300 animals in total.",
		link: "zooatlanta.org"
	},

	{
		_id: 7,
		activity: "Fake News",
		description: "CNN Studio Tours Journey into the heart of CNN Worldwide and get an up-close look at global news in the making! Inside CNN is a 55 minute guided walking tour with exclusive views of Atlanta's CNN studios and an exciting glimpse of news and broadcasting in action from the world headquarters of the Worldwide Leader in News.",
		link: "tours.cnn.com"
	},

	{
		_id: 8,
		activity: 'Prehistoric Times',
		description: "Fernbank Museum of Natural History - Where Science, Nature and Fun Make History.",
		link: "www.fernbankmuseum.org"
	},

	{
		_id: 9,
		activity: "Let's do some scenic biking",
		description: "The Beltline is a sustainable redevelopment project. When completed it will connect 45 intown neighborhoods via a 22-mile loop of multi-use trails, modern streetcar, and parks – all based on railroad corridors that formerly encircled Atlanta.",
		link: "www.beltline.org"
	},
	{
		_id: 10,
		activity: 'Wanna watch muppets?',
		description: "The Center for Puppetry Arts, is the largest organization in America dedicated to the art form of puppetry. It focuses on three areas: performance, education and museum. It is one of the last of these museums in the World.",
		link: "www.puppet.org"
	},

	{
		_id: 11,
		activity: 'I got my boat shoes on',
		description: "Catch a beautiful sunset at Morgan Falls Overlook Park. The 30-acre riverside park includes picnic pavilions, a playground, restrooms, boat dock, hiking trail, fire pit, porch swings and scenic views. High Country Outfitters operates a seasonal waterside paddle shack, offering stand up paddleboard, kayak and canoe rentals. Private groups of 60 or more people can be accommodated in the Pavilion at Morgan Falls Overlook Park with rental.",
		link: "www.sandyspringsga.gov"
	},
	{
		_id: 12,
		activity: 'Crank the edge or hit the ledge',
		description: "Stone Summit Climbing and Fitness Center. A fitness center that offers Pilates, yoga and rock climbing to people of all ages. ",
		link: "www.ssclimbing.com"
	},
	{
		_id: 13,
		activity: "Let's get zen",
		description: "Gibb's Garden is 220 acres of artistically landscaped gardens, spring-fed ponds, streams, waterfalls and bridge crossings. Created by over 37 years by Jim Gibb. This garden is wonderful anytime of year.",
		link: "www.gibbsgardens.com"
	},
	{
		_id: 14,
		activity: 'Naruto run without the judgement',
		description: "Nitro Zone offers multiple activities along with food and alcoholic beverages. You can bowl, climb a ropes course, drive go karts, jump on their trampolines, play games at the arcade and/or play a round of bazooka ball. It is fun for the whole family.",
		link: "www.nitrozone.com"
	},

	{
		_id: 15,
		activity: 'Broke college art students live here',
		description: "SCAD Museum of Fashion and Film. This is the only museum in the Southeast dedicated to fashion and film.",
		link: "www.round1usa.com"
	},
	{
		_id: 16,
		activity: 'Bring your quarters',
		description: "Round One Entertainmentis a Japan-based amusement store chain. The amusement centers offer a variety of bowling, karaoke, video game arcade cabinets and redemption games, billiards, darts, and ping pong while serving a variety of food and beverages.",
		link: "www.battleandbrew.com"
	},
	{
		_id: 17,
		activity: 'Nothing beats gaming and beer',
		description: "Battle and Brew. Gamers' bar for Xbox & PC tournaments plus weekly geek trivia, with a full bar & pub-grub men",
		link: "www.scadfash.org"
	},

	{
		_id: 18,
		activity: 'Sip coffee, pet cats',
		description: "Java Cats. A coffee house that partners with Humane Society of Cobb County, a no-kill animal shelter. All of their kitties are adoptable! Sip and mingle.",
		link: "www.javacatscafe.com"
	},
	{
		_id: 19,
		activity: 'Filthy fish',
		description: "The Georgia Aquarium is one of the largest aquariums in the world. It houses more than a hundred thousand animals and represents several thousand species, all of which reside in 10 million gallons of marine and salt water.",
		link: "www.georgiaaquarium.org"
	},

	{
		_id: 20,
		activity: "How 'bout some football?",
		description: "College Football Hall of Fame. This museum includes 95,000 square feet of space dedicated to the greatest players and coaches who ever played or coached the game. It also has a 45-yard indoor football field and more than 50 interactive exhibits.",
		link: "www.cfbhall.com"
	},
	{
		_id: 21,
		activity: 'Business happens here',
		description: "Topgolf is a game that anyone can play. Score points by hitting micro-chipped golf balls at giant dartboard-like targets on an outfield. The closer you get your ball to the centre or 'bullseye' and the further the distance, the more points earned. You can enjoy food and beverages brought to you while playing by the friendly staff.",
		link: "www.topgolf.com"
	},
	{
		_id: 22,
		activity: 'This stuff is like coke',
		description: "The World of Coca Cola is fun for the whole family, from the vault where they secure their secret formula, to world-class art and memorabilia. While there you can sample more than 100 beverages from around the world. You can also meet the Coca-Cola Polar Bear.",
		link: "www.worldofcoca-cola.com"
	},
	{
		_id: 23,
		activity: 'History. Your story, my story.',
		description: "The National Center for Civil and Human Rights is a museum dedicated to the achievements of both the civil rights movement in the United States and the broader worldwide human rights movement",
		link: "www.civilandhumanrights.org"
	},
	{
		_id: 24,
		activity: 'Hidden Gem',
		description: "A 2,500 acre, year-round horticultural display garden that offers the Virginia Hand Callaway Discovery Center, Birds of Prey Show, Cecil B. Day Butterfly Center, Walking Trails, Ida Cason Callaway Memorial Chapel and Pioneer Log Cabin as well as golf, tennis, fishing, fly fishing and biking.",
		link: "www.callawaygardens.com"
	},
	{
		_id: 25,
		activity: 'Bring a compass',
		description: "Stone Mountain Park. Vast, scenic park with activities, golf, lodging & a cable car ride to a historic, carved peak. During the 1996 Summer Olympics, Stone Mountain Park provided venues for Olympic events in tennis, archery and track cycling.",
		link: "www.stonemountainpark.com"
	},
	{
		_id: 26,
		activity: 'Duck',
		description: "Bad Axe throwing, It's an Urban Axe throwing club that has brought the Canadian backyard pastime to the states. In addition to having leagues and group events they are invested in the community by giving back through local charities and organizations.",
		link: "www.badaxethrowing.com"
	},
	{
		_id: 27,
		activity: "Let's open up this mosh pit",
		description: "Located in the heart of downtown Atlanta, the Masquerade is one of the most uniquely designed, and diversely programmed live music venues in the country.",
		link: "www.masqueradeatlanta.com"
	},

	{
		_id: 28,
		activity: "Glock, cock, ready to rock",
		description: "Power Ops Airsoft, Paintball, and Laser Tag. This is the largest airsoft field in Atlanta. They also offer the newest laser tags games that are tactical oriented. This makes them more realistic and more action packed.",
		link: "www.poweropsairsoft.com"
	},
]

var randomizedActivity = activities[Math.floor(Math.random() * activities.length)];
console.log(randomizedActivity);

var activity_id = randomizedActivity._id;
var title = randomizedActivity.activity;
var description = randomizedActivity.description;
var link = randomizedActivity.link;

$("#next-btn").on("click", function () {
	//reset the random activity
	randomizedActivity = activities[Math.floor(Math.random() * activities.length)];

	console.log(randomizedActivity);

	activity_id = randomizedActivity._id;
	title = randomizedActivity.activity;
	description = randomizedActivity.description;
	link = randomizedActivity.link;

	$("#activity_description").html("<p>" + description + "</p>");
	$("#activity_id").html("<h2>Activity number: # " + activity_id + "</h2>");
	$("#activity_title").html("<h1>" + title + "</h1>");
	$("#activity_link").attr('href', link);
	$("#activity_link").html(link);

});

$("#activity_description").append("<p>" + description + "</p>");
$("#activity_id").append("<h2>Activity number: # " + activity_id + "</h2>");
$("#activity_title").append("<h1>" + title + "</h1>");
$("#activity_link").attr('href', link);
$("#activity_link").append(link);

