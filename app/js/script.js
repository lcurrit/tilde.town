// Console Shenanigans
console.log("%c%s","color: rgb(33, 37, 41); background: #ffbfbf; font-size: 20px; padding:10px;", "Do you want to see my dog?");
console.log("%c%s","color: rgb(33, 37, 41); background: rgb(204, 255, 128); font-size: 20px; padding:10px;", "Of course you do:");
console.log("%c%s","color: rgb(33, 37, 41); background: aqua; font-size: 20px; padding:10px;", window.location.href + "img/luna.jpg");

$(function(){

	// Hide / Show Sections
	$('.menu a').click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var $parentLI = $this.parent('li');
		if($this.data('details')) {
			var id = $this.data('details');
			$('.sections > *').fadeOut('slow').promise().done(function() {
				$('#' + id).css('display', 'flex').hide().fadeIn('slow');
			});
		} else if($parentLI.hasClass('grow')) {
			$parentLI.removeClass('grow');
			$parentLI.siblings().css('flex-grow', '1');
			$this.next('ul').css("display", "flex").hide();

		} else {
			$parentLI.css('flex-grow', '1').addClass('grow');
			$parentLI.siblings().css('flex-grow', '0');

			$parentLI.siblings().children('ul').fadeOut('slow').promise().done(function() {
				$this.next('ul').css("display", "flex").hide().promise().done(function() {
					$(this).fadeIn('slow');
				});
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

	// Populate Feels
	$('.latest-feels').load('/~greely/feels/ div.entry:first', function() {
		var h5 = $(this).find('h5');
		var plain = h5.text();
		h5.html(plain);
		$(this).find('.permalink').remove();
	});

});