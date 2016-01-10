$(document).ready(function() {
	$("a.bike").click(function(event) {
		var link = $(this);
		var bike = $(this).next();
		var coordinates = $(bike).offset();

		$(bike).css({
			"position": "absolute",
			"display": "block",
			"top": coordinates.top+"px",
			"left": coordinates.left - parseInt($(bike).css("margin-left"))+"px"
		});

		$(bike).animate({
			left: coordinates.left+100+"px",
			opacity: 0
		}, 600, function() {
			window.location.href = $(link).attr("href");
		});

		return false;
	});
});
