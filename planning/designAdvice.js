(function ($) {

	var activies = [
		[1, 'Are you a history nerd?'],
		[2, 'Get some sunshine'],
		[3, 'Run through some sprinklers'],
		[4, 'Smell the roses'],
		[5, "I mean get it, but I also don't"],
		[6, 'Go Wild!'],
		[7, "Fake News"],
		[8, 'Prehistoric Times'],
		[9, "Let's do some scenic biking"],
		[10, 'Wanna watch muppets?'],
		[11, 'I got my boat shoes on'],
		[12, 'Crank the edge or hit the ledge'],
		[13, "Let's get zen"],
		[14, 'Naruto run without the judgement'],
		[15, 'Broke college art students live here'],
		[16, 'Bring your quarters'],
		[17, 'Nothing beats gaming and beer'],
		[18, 'Sip coffee, pet cats'],
		[19, 'Filthy fish'],
		[20, "How 'bout some football?"],
		[21, 'Business happens here'],
		[22, 'This stuff is like coke'],
		[23, 'History. Your story, my story.'],
		[24, 'Hidden Gem'],
		[25, 'Bring a compass'],
		[26, 'Duck'],
		[27, "Let's open up this mosh pit"],
		[28, "Glock, cock, ready to rock"]
	];

	function randomAdvice(initAdviceId) {
		var currentIndex = parseInt($('#advice-number').html());
		var randomIndex;
		var randomAdvice;
		var adviceHash;

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

	$(document).ready(function () {
		$('#more-advice').click(function (event) {
			event.preventDefault();
			var $fadeElems = $('#advice').animate({ opacity: 0 }, function () {
				randomAdvice();
				$fadeElems.animate({ opacity: 1 });
			});
		});
	});

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

})(jQuery);