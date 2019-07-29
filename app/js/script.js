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
		}
		if($this.siblings().length > 0) {
			if($this.siblings().hasClass('grow')) {
				$this.siblings().removeClass('grow');
				$this.siblings().css('display', 'none');
			} else {
				$('.menu ul ul').css('display', 'none');
				$('.menu ul ul').removeClass('grow');
				$this.siblings().addClass('grow');
				$this.siblings().css('display', 'flex');
			}
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