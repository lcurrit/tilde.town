// jQuery Plugin: Tilde Ring
(function($) {
	$.fn.tildeRing = function(options) {

		var settings = $.extend({
			randomUser : true,
			randomBox  : true,
			nextUser   : true,
			joinLink   : true,
			styleRing  : true
		}, options);

		var randomUserURL;
		var nextUserURL;
		var randomBoxURL;

		if(settings.randomUser == true || settings.nextUser == true) {

			var users = [];

			// Get list of ring member pages
			$.ajax({
				dataType: "json",
				url: "/~dan/users.json",
				success: function(data) {
					$.each(data, function(key, value) {
						if(data[key].edited == 1 && data[key].ringmember == 1) {
							users.push(data[key].homepage);
						}
					});
				},
			}).done(function() {

				if(settings.randomUser == true) {

					// Get random ring member page
					randomUserURL = users[Math.floor(Math.random() * users.length)];
					$("#trp_random_user").attr("href", randomUserURL);

				}

				if(settings.nextUser == true ) {

					// Sort the user list
					var sortedUsers = users.sort();

					// Get my URL and remove the trailing slash
					var myURL = window.location.href;
					myURL = myURL.replace(/\/$/,"");

					// Find my location in the list and get the next ring member page
					var location = $.inArray(myURL, sortedUsers) + 1;
					nextUserURL = sortedUsers[location];
					$("#trp_next_user").attr("href", nextUserURL);
				}
			});
		}

		if(settings.randomBox == true) {

			var tildes = [];

			// Get random tilde
			$.ajax({
				dataType: "json",
				url: "/~um/json/othertildes.json",
				success: function(data) {
					$.each(data, function(key, value) {
						tildes.push(value);
					});
				},
				async: true
			}).done(function() {
				randomBoxURL = tildes[Math.floor(Math.random() * tildes.length)];
				$("#trp_random_tilde").attr("href", randomBoxURL);
			});
		}

		return this.each(function() {
			$(this).append("<div id=\"trp_tilde_ring\"></div>");
			if(settings.randomUser == true) {
				$(this).find("#trp_tilde_ring").append("<a id=\"trp_random_user\" href=\"\">random&nbsp;~user</a>");
			}
			if(settings.randomBox == true) {
				$(this).find("#trp_tilde_ring").append("<a id=\"trp_random_tilde\" href=\"\">random&nbsp;~box</a>");
			}
			if(settings.nextUser == true) {
				$(this).find("#trp_tilde_ring").append("<a id=\"trp_next_user\" href=\"\">next&nbsp;~user</a>");
			}
			if(settings.joinLink == true) {
				$(this).find("#trp_tilde_ring").append("<br /><a id=\"trp_join_ring\" href=\"/~um/tilde_ring/join.html\">join</a>");
			}
			if(settings.styleRing == true) {
				$(this).find("#trp_tilde_ring").css({"background-color":"white", "text-align":"center", "border-radius":10, "padding":5});
				$(this).find("#trp_tilde_ring a").css({"display":"inline-block", "padding":5});
			}
		});
	};
}(jQuery));
