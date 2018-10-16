// Console Shenanigans
console.log("%c%s","color: rgb(33, 37, 41); background: #ffbfbf; font-size: 20px; padding:10px;", "Do you want to see my dog?");
console.log("%c%s","color: rgb(33, 37, 41); background: rgb(204, 255, 128); font-size: 20px; padding:10px;", "Of course you do:");
console.log("%c%s","color: rgb(33, 37, 41); background: aqua; font-size: 20px; padding:10px;", window.location.href + "img/luna.jpg");

$(function(){

	// Hide / Show Sections
	$('.menu a').click(function(e) {
		e.preventDefault();
		if($(this).data('details')) {
			var id = $(this).data('details');
			$('.sections > *').fadeOut('slow').promise().done(function() {
				$('#' + id).css("display", "flex").hide().fadeIn('slow');
			});
		}
	});

	// Fire up the Tilde Ring
	if ($('#tilde_town_ring').length) {
		$('#tilde_town_ring').tildeRing({
			randomUser:true,
			randomBox:false,
			nextUser:true,
			joinLink:true,
			styleRing:false
		});
	}

});