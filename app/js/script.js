console.log('scripts loaded');

$('a').click(function(e) {
	e.preventDefault();
	if($(this).data('details')) {
		var id = $(this).data('details');
		$('.sections > *').fadeOut('slow', function() {
			$('#' + id).fadeIn('slow');
		});
	}
});
