//API Keys
var googleAPIKey = "AIzaSyCQjmexIk0ui-r2JNDxbLeFyLTTABPzoio";
var OpenWeatherKey = "166a433c57516f51dfab1f7edaed8413";

//Default latitude and longitude (Prototype Prime)
var userLat = 33.963491;
var userLong = -84.221050;
var userLocation;
var map;
var infowindow;

const activities = [
	{
		_id: 1,
		activity: 'Are you a history nerd?',
		description: "Founded in 1926, the Atlanta History Center located in Buckhead is an all-inclusive 32-acre destination featuring the Atlanta History Museum, one of the Southeast's largest history museums; two historic houses, the 1928 Swan House and the Smith Family Farm. It features 32 acres of gardens, wildlife trails and woodland areas.",
		address: "130 W Paces Ferry Rd NW, Atlanta, GA 30305",
		link: "www.atlantahistorycenter.com",
		googleMapsInfo: '<strong>Atlanta History Center</strong><br>\
		130 W Paces Ferry Rd NW<br> Atlanta, GA 30305<br>\
		<a href="https://goo.gl/maps/MJjAmcfJ9cH2">Get Directions</a>',
		lat: 33.842328,
		long: -84.386308
	},
	{
		_id: 2,
		activity: 'Get some sunshine',
		description: "Piedmont Park is an urban park located about 1 mile northeast of Downtown, between the Midtown and Virginia Highland neighborhoods. Originally the land was owned by Dr. Benjamin Walker, who used it as his out-of-town gentleman's farm and residence.",
		address: "400 Park Dr, Atlanta, GA 30306",
		link: "www.piedmontpark.org",
		googleMapsInfo: '<strong>Piedmont Park</strong><br>\
		400 Park Dr<br> Atlanta, GA 30306<br>\
		<a href="https://goo.gl/maps/kJaPXvrnhFH2">Get Directions</a>',
		lat: 33.785064,
		long: -84.374261
	},
	{
		_id: 3,
		activity: 'Run through some sprinklers',
		description: "Centennial Olympic Park is a 21-acre park located in downtown Atlanta, and operated by the Georgia World Congress Center Authority. It was built by the Atlanta Committee for the Olympic Games (ACOG) as part of the infrastructure improvements for the 1996 Summer Olympics.",
		link: "www.gwcca.org/park",
		address: "265 Park Ave NW, Atlanta, GA 30313",
		googleMapsInfo: '<strong>Centennial Olympic Park</strong><br>\
		265 Park Ave NW<br> Atlanta, GA 30313<br>\
		<a href="https://goo.gl/maps/xe2aLm4UnaL2">Get Directions</a>',
		lat: 33.763415,
		long: -84.393654
	},
	{
		_id: 4,
		activity: 'Smell the roses',
		description: "The Atlanta Botanical Garden is a 30 acre botanical garden located adjacent to Piedmont Park in Midtown Atlanta. It was incorporated in 1976, the garden's mission is to develop and maintain plant collections for the purposes of display, education, conservation, research and enjoyment.",
		link: "atlantabg.org",
		address: "1345 Piedmont Ave NE, Atlanta, GA 30309",
		googleMapsInfo: '<strong>Atlanta Botanical Garden</strong><br>\
		1345 Piedmont Ave NE<br> Atlanta, GA 30309<br>\
		<a href="https://goo.gl/maps/6zBQ54q5chm">Get Directions</a>',
		lat: 33.789625,
		long: -84.372546
	},
	{
		_id: 5,
		activity: "I mean I get it, but I also don't",
		description: "High Museum of Art",
		link: "www.high.org",
		address: "1280 Peachtree St NE, Atlanta, GA 30309",
		googleMapsInfo: '<strong>High Museum of Art</strong><br>\
		1280 Peachtree St NE<br> Atlanta, GA 30309<br>\
		<a href="https://goo.gl/maps/p1dbp97FGuu">Get Directions</a>',
		lat: 33.790268,
		long: -84.385520
	},
	{
		_id: 6,
		activity: 'Go Wild!',
		description: "Zoo Atlanta is one of the oldest zoos in the United States. While animal displays draw visitors, animal research and conservation studies are also important activities of the zoo. An abundance of animals and plant species are found at the zoo, including 50 species of bird and 40 species of mammal -- over 1,300 animals in total.",
		link: "zooatlanta.org",
		address: "800 Cherokee Ave SE, Atlanta, GA 30315",
		googleMapsInfo: '<strong>Zoo Atlanta</strong><br>\
		800 Cherokee Ave SE<br> Atlanta, GA 30315<br>\
		<a href="https://goo.gl/maps/EYe5goKAyJx">Get Directions</a>',
		lat: 33.734232,
		long: -84.372279
	},
	{
		_id: 7,
		activity: "Fake News",
		description: "CNN Studio Tours Journey into the heart of CNN Worldwide and get an up-close look at global news in the making! Inside CNN is a 55 minute guided walking tour with exclusive views of Atlanta's CNN studios and an exciting glimpse of news and broadcasting in action from the world headquarters of the Worldwide Leader in News.",
		link: "tours.cnn.com",
		address: "190 Marietta St NW, Atlanta, GA 30303",
		googleMapsInfo: '<strong>CNN Studio Tours</strong><br>\
		190 Marietta St NW<br> Atlanta, GA 30303<br>\
		<a href="https://goo.gl/maps/DmkiyPZyw8S2">Get Directions</a>',
		lat: 33.758121,
		long: -84.395074
	},
	{
		_id: 8,
		activity: 'Prehistoric Times',
		description: "Fernbank Museum of Natural History - Where Science, Nature and Fun Make History.",
		link: "www.fernbankmuseum.org",
		address: "767 Clifton Rd NE, Atlanta, GA 30307",
		googleMapsInfo: '<strong>Fernbank Museum of Natural History</strong><br>\
		767 Clifton Rd NE<br> Atlanta, GA 30307<br>\
		<a href="https://goo.gl/maps/hoaxUjXzSZA2">Get Directions</a>',
		lat: 33.773980,
		long: -84.328060
	},
	{
		_id: 9,
		activity: "Let's do some scenic biking",
		description: "The Beltline is a sustainable redevelopment project. When completed it will connect 45 intown neighborhoods via a 22-mile loop of multi-use trails, modern streetcar, and parks – all based on railroad corridors that formerly encircled Atlanta.",
		link: "www.beltline.org",
		address: "650 Irwin St, Atlanta, GA 30312",
		googleMapsInfo: '<strong>The Beltline</strong><br>\
		650 Irwin St<br> Atlanta, GA 30312<br>\
		<a href="https://goo.gl/maps/vua9n1iA71T2">Get Directions</a>',
		lat: 33.769091,
		long: -84.362372
	},
	{
		_id: 10,
		activity: 'Wanna watch muppets?',
		description: "The Center for Puppetry Arts, is the largest organization in America dedicated to the art form of puppetry. It focuses on three areas: performance, education and museum. It is one of the last of these museums in the World.",
		link: "www.puppet.org",
		address: "1404 Spring St NW, Atlanta, GA 30309",
		googleMapsInfo: '<strong>Center for Puppetry Arts</strong><br>\
		1404 Spring St NW<br> Atlanta, GA 30309<br>\
		<a href="https://goo.gl/maps/oy7Enf3X8G12">Get Directions</a>',
		lat: 33.792720,
		long: -84.389366
	},
	{
		_id: 11,
		activity: 'I got my boat shoes on',
		description: "Catch a beautiful sunset at Morgan Falls Overlook Park. The 30-acre riverside park includes picnic pavilions, a playground, restrooms, boat dock, hiking trail, fire pit, porch swings and scenic views. High Country Outfitters operates a seasonal waterside paddle shack, offering stand up paddleboard, kayak and canoe rentals. Private groups of 60 or more people can be accommodated in the Pavilion at Morgan Falls Overlook Park with rental.",
		link: "www.sandyspringsga.gov",
		address: "200 Morgan Falls Rd, Sandy Springs, GA 30350",
		googleMapsInfo: '<strong>Morgan Falls Overlook Park</strong><br>\
		200 Morgan Falls Rd<br> Sandy Springs, GA 30350<br>\
		<a href="https://goo.gl/maps/7VGRtUp61yv">Get Directions</a>',
		lat: 33.971215,
		long: -84.379369
	},
	{
		_id: 12,
		activity: 'Crank the edge or hit the ledge',
		description: "Stone Summit Climbing and Fitness Center. A fitness center that offers Pilates, yoga and rock climbing to people of all ages. ",
		link: "www.ssclimbing.com",
		address: "3701 Presidential Pkwy, Atlanta, GA 30341",
		googleMapsInfo: '<strong>Stone Summit Climbing and Fitness Center</strong><br>\
		3701 Presidential Pwky<br> Atlanta, GA 30341<br>\
		<a href="https://goo.gl/maps/YC78jC7UJHq">Get Directions</a>',
		lat: 33.884364,
		long: -84.267541
	},
	{
		_id: 13,
		activity: "Let's get zen",
		description: "Gibb's Garden is 220 acres of artistically landscaped gardens, spring-fed ponds, streams, waterfalls and bridge crossings. Created by over 37 years by Jim Gibb. This garden is wonderful anytime of year.",
		link: "www.gibbsgardens.com",
		address: "1987 Gibbs Dr, Ball Ground, GA 30107",
		googleMapsInfo: "<strong>Gibb's Garden</strong><br>\
		1987 Gibbs Dr<br> Ball Ground, GA 30107<br>\
		<a href='https://goo.gl/maps/hjMaV7UtZVH2'>Get Directions</a>",
		lat: 34.379274,
		long: -84.279157
	},
	{
		_id: 14,
		activity: 'Naruto run without the judgement',
		description: "Nitro Zone offers multiple activities along with food and alcoholic beverages. You can bowl, climb a ropes course, drive go karts, jump on their trampolines, play games at the arcade and/or play a round of bazooka ball. It is fun for the whole family.",
		link: "www.nitrozone.com",
		address: "6344 Cash Ct NW, Peachtree Corners, GA 30071",
		googleMapsInfo: '<strong>Nitro Zone</strong><br>\
		6344 Cash Ct NW<br> Peachtree Corners, GA 30071<br>\
		<a href="https://goo.gl/maps/fWoydZQ2gjD2">Get Directions</a>',
		lat: 33.942011,
		long: -84.239864
	},
	{
		_id: 15,
		activity: 'Broke college art students live here',
		description: "SCAD Museum of Fashion and Film. This is the only museum in the Southeast dedicated to fashion and film.",
		link: "www.scadfash.org",
		address: "1600 Peachtree St Fl 4, Atlanta, GA 30309",
		googleMapsInfo: '<strong>SCAD Museum of Fashion and Film</strong><br>\
		1600 Peachtree St Fl 4<br> Atlanta, GA 30309<br>\
		<a href="https://goo.gl/maps/6cj3wmMNoBN2">Get Directions</a>',
		lat: 33.796745,
		long: -84.391288
	},
	{
		_id: 16,
		activity: 'Bring your quarters',
		description: "Round One Entertainment is a Japan-based amusement store chain. The amusement centers offer a variety of bowling, karaoke, video game arcade cabinets and redemption games, billiards, darts, and ping pong while serving a variety of food and beverages.",
		link: "www.round1usa.com",
		address: "2929 Turner Hill Rd #2800, Lithonia, GA 30038",
		googleMapsInfo: '<strong>Round 1 Entertainment</strong><br>\
		2929 Turner Hill Rd #2800<br> Lithonia, GA 30038<br>\
		<a href="https://goo.gl/maps/Ywbh7fs6SnF2">Get Directions</a>',
		lat: 33.699164,
		long: -84.096418
	},
	{
		_id: 17,
		activity: 'Nothing beats gaming and beer',
		description: "Battle and Brew. Gamers' bar for Xbox & PC tournaments plus weekly geek trivia, with a full bar & pub-grub men",
		link: "www.battleandbrew.com",
		address: "5920 Roswell Rd a120, Sandy Springs, GA 30328",
		googleMapsInfo: '<strong>Battle and Brew</strong><br>\
		5920 Roswell Rd a120<br> Sandy Springs, GA 30328<br>\
		<a href="https://goo.gl/maps/nKB92HjTets">Get Directions</a>',
		lat: 33.917246,
		long: -84.380926
	},
	{
		_id: 18,
		activity: 'Sip coffee, pet cats',
		description: "Java Cats. A coffee house that partners with Humane Society of Cobb County, a no-kill animal shelter. All of their kitties are adoptable! Sip and mingle.",
		link: "www.javacatscafe.com",
		address: "85 Atlanta St SE, Marietta, GA 30060",
		googleMapsInfo: '<strong>Java Cats</strong><br>\
		85 Atlanta St SE<br> Marietta, GA 30060<br>\
		<a href="https://goo.gl/maps/sfzV2XCASG52">Get Directions</a>',
		lat: 33.953109,
		long: -84.548115
	},
	{
		_id: 19,
		activity: 'Filthy fish',
		description: "The Georgia Aquarium is one of the largest aquariums in the world. It houses more than a hundred thousand animals and represents several thousand species, all of which reside in 10 million gallons of marine and salt water.",
		link: "www.georgiaaquarium.org",
		address: "225 Baker St NW, Atlanta, GA 30313",
		googleMapsInfo: '<strong>Georgia Aquarium</strong><br>\
		225 Baker St NW<br> Atlanta, GA 30313<br>\
		<a href="https://goo.gl/maps/zY573z7XQspvnwET8">Get Directions</a>',
		lat: 33.767299,
		long: -84.395348
	},
	{
		_id: 20,
		activity: "How 'bout some football?",
		description: "College Football Hall of Fame. This museum includes 95,000 square feet of space dedicated to the greatest players and coaches who ever played or coached the game. It also has a 45-yard indoor football field and more than 50 interactive exhibits.",
		link: "www.cfbhall.com",
		address: "250 Marietta St NW, Atlanta, GA 30313",
		googleMapsInfo: '<strong>College Football Hall of Fame</strong><br>\
		250 Marietta St NW<br> Atlanta, GA 30313<br>\
		<a href="https://goo.gl/maps/HaDASqdUrk19iL5U6>Get Directions</a>',
		lat: 33.760303,
		long: -84.395191
	},
	{
		_id: 21,
		activity: 'Business happens here',
		description: "Topgolf is a game that anyone can play. Score points by hitting micro-chipped golf balls at giant dartboard-like targets on an outfield. The closer you get your ball to the centre or 'bullseye' and the further the distance, the more points earned. You can enjoy food and beverages brought to you while playing by the friendly staff.",
		link: "www.topgolf.com",
		address: "1600 Ellsworth Industrial Blvd NW, Atlanta, GA 3031",
		googleMapsInfo: '<strong>TopGolf Atlanta</strong><br>\
		1600 Ellsworth Industrial Blvd NW<br> Atlanta, GA 3031<br>\
		<a href="https://goo.gl/maps/8xb99ZpBFKaeS3Ab8">Get Directions</a>',
		lat: 33.798791,
		long: -84.427634
	},
	{
		_id: 22,
		activity: 'This stuff is like coke',
		description: "The World of Coca Cola is fun for the whole family, from the vault where they secure their secret formula, to world-class art and memorabilia. While there you can sample more than 100 beverages from around the world. You can also meet the Coca-Cola Polar Bear.",
		link: "www.worldofcoca-cola.com",
		address: "121 Baker St NW, Atlanta, GA 30313",
		googleMapsInfo: '<strong>World of Coca Cola</strong><br>\
		121 Baker St NW<br> Atlanta, GA 30313<br>\
		<a href="https://goo.gl/maps/iy4s64dmj2b4Jgsf8">Get Directions</a>',
		lat: 33.766865,
		long: -84.391279
	},
	{
		_id: 23,
		activity: 'History. Your story, my story.',
		description: "The National Center for Civil and Human Rights is a museum dedicated to the achievements of both the civil rights movement in the United States and the broader worldwide human rights movement",
		link: "www.civilandhumanrights.org",
		address: "100 Ivan Allen Jr Blvd NW, Atlanta, GA 30313",
		googleMapsInfo: '<strong>National Center for Civil and Human Rights</strong><br>\
		100 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30313<br>\
		<a href="https://goo.gl/maps/WnbzyPWhxt4ckGar6">Get Directions</a>',
		lat: 33.763948,
		long: -84.393051
	},
	{
		_id: 24,
		activity: 'Hidden Gem',
		description: "A 2,500 acre, year-round horticultural display garden that offers the Virginia Hand Callaway Discovery Center, Birds of Prey Show, Cecil B. Day Butterfly Center, Walking Trails, Ida Cason Callaway Memorial Chapel and Pioneer Log Cabin as well as golf, tennis, fishing, fly fishing and biking.",
		link: "www.callawaygardens.com",
		address: "17800 US-27, Pine Mountain, GA 31822",
		googleMapsInfo: '<strong>Callaway Gardens</strong><br>\
		17800 US-27<br> Pine Mountain, GA 31822<br>\
		<a href="https://goo.gl/maps/hHN7Q57mW2DWJJKr7">Get Directions</a>',
		lat: 32.835730,
		long: -84.853906
	},
	{
		_id: 25,
		activity: 'Bring a compass',
		description: "Stone Mountain Park. Vast, scenic park with activities, golf, lodging & a cable car ride to a historic, carved peak. During the 1996 Summer Olympics, Stone Mountain Park provided venues for Olympic events in tennis, archery and track cycling.",
		link: "www.stonemountainpark.com",
		address: "1000 Robert E Lee Blvd, Stone Mountain, GA 30083",
		googleMapsInfo: '<strong>Stone Mountain Park</strong><br>\
		1000 Robert E Lee Blvd<br> Stone Mountain, GA 30083<br>\
		<a href="https://goo.gl/maps/AMJKVybtoi3n5R3y9">Get Directions</a>',
		lat: 33.807593,
		long: -84.170674
	},
	{
		_id: 26,
		activity: 'Duck',
		description: "Bad Axe throwing, It's an Urban Axe throwing club that has brought the Canadian backyard pastime to the states. In addition to having leagues and group events they are invested in the community by giving back through local charities and organizations.",
		link: "www.badaxethrowing.com",
		address: "1356 English St NW, Atlanta, GA 30318",
		googleMapsInfo: '<strong>Bad Axe Throwing</strong><br>\
		1356 English St NW<br> Atlanta, GA 30318<br>\
		<a href="https://goo.gl/maps/i1KZfUdy5Xaduceg8">Get Directions</a>',
		lat: 33.793520,
		long: -84.420353
	},
	{
		_id: 27,
		activity: "Let's open up this mosh pit",
		description: "Located in the heart of downtown Atlanta, the Masquerade is one of the most uniquely designed, and diversely programmed live music venues in the country.",
		link: "www.masqueradeatlanta.com",
		address: "50 Lower Alabama Street, Atlanta, GA 30303",
		googleMapsInfo: '<strong>The Masquerade</strong><br>\
		50 Lower Alabama Street<br> Atlanta, GA 30303<br>\
		<a href="https://goo.gl/maps/g4kTswffSS6Xejx98">Get Directions</a>',
		lat: 33.751796,
		long: -84.389879
	},

	{
		_id: 28,
		activity: "Glock, cock, ready to rock",
		description: "Power Ops Airsoft, Paintball, and Laser Tag. This is the largest airsoft field in Atlanta. They also offer the newest laser tags games that are tactical oriented. This makes them more realistic and more action packed.",
		link: "www.poweropsairsoft.com",
		address: "125 Milton Ave SE, Atlanta, GA 30315",
		googleMapsInfo: '<strong>Power Ops Airsoft</strong><br>\
		125 Milton Ave SE<br> Atlanta, GA 30315<br>\
		<a href="https://goo.gl/maps/cwZronyD83TMUrKZ9">Get Directions</a>',
		lat: 33.721672,
		long: -84.385079
	},
]

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

// function for converting the user's lat/long to an address using Google's Geolocation API
function latLongConversion(lat, long) {
	$.ajax({ url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&key=" + googleAPIKey, method: "GET" }).done(function (response) {
		// return the user's city
		userLocation = response.results[0].address_components[2].short_name;
		console.log(userLocation);
		console.log(response.results[0].formatted_address);
	});
};

// function that initializes google map
function myMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: new google.maps.LatLng(userLat, userLong),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
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

	var infowindow = new google.maps.InfoWindow({});
	var marker, i;

	//create a marker for each activity
	for (i = 0; i < activities.length; i++) {
		var info = activities[i].googleMapsInfo;
		var lat = activities[i].lat;
		var long = activities[i].long;

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, long),
			map: map
		});

		// when a marker is clicked, display information in infowindow
		google.maps.event.addListener(marker, 'click', (function (marker) {
			return function () {
				infowindow.setContent(info);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

//function that retrieves the current weather of Atlanta
function getWeather() {
	var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
		"q=Atlanta,Atlanta&units=imperial&appid=" + OpenWeatherKey;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		// Transfer content to HTML
		$(".city").html("<h1>" + "Today's Weather in " + response.name + ": </h1>");
		$(".temp").text("Temperature (F): " + response.main.temp);
		$(".humidity").text("Humidity: " + response.main.humidity);
		$(".wind").text("Wind Speed: " + response.wind.speed);

		// Log the data in the console as well
		console.log("Wind Speed: " + response.wind.speed);
		console.log("Humidity: " + response.main.humidity);
		console.log("Temperature (F): " + response.main.temp);
	})
}
getWeather();

// create a variable that holds a randomized activity object
var randomizedActivity = activities[Math.floor(Math.random() * activities.length)];
console.log(randomizedActivity);

var activity_id = randomizedActivity._id;
var title = randomizedActivity.activity;
var description = randomizedActivity.description;
var link = randomizedActivity.link;

// when the "next" button is click, randomly generate and display a new activity object
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

//display initial activity information
$("#activity_description").append("<p>" + description + "</p>");
$("#activity_id").append("<h2>Activity number: # " + activity_id + "</h2>");
$("#activity_title").append("<h1>" + title + "</h1>");
$("#activity_link").attr('href', link);
$("#activity_link").append(link);