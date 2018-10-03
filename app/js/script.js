console.log('scripts loaded');

// Hide / Show Sections
$('a').click(function(e) {
	e.preventDefault();
	if($(this).data('details')) {
		var id = $(this).data('details');
		$('.sections > *').fadeOut('slow').promise().done(function() {
			$('#' + id).fadeIn('slow');
		});
	}
});

// Fire up the Tilde Ring
if ($('#tilde_town_ring').length) {
	$('#tilde_town_ring').tildeRing({styleRing:false, randomBox:false});
}