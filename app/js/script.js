console.log('scripts loaded');

$('a').click(function(e) {
	e.preventDefault();
	if($(this).data('details')) {
		var id = $(this).data('details');
		$('.sections > *').fadeOut('slow').promise().done(function() {
			$('#' + id).fadeIn('slow');
		});
	}
});
