/**
 * @brief Float image plugin for jQuery.
 * @author EUYUIL <http://euyuil.com>
 * @version 0.1
 * @date 2011-11-23
 */

(function($) {

	/**
	 * @brief Call this function to make the images float and move.
	 * @param x Initial x coordinate for the image.
	 * @param y Initial y coordinate for the image.
	 * @param dx The direction of the x speed, should be -1 or 1.
	 * @param dy The direction of the y speed, should be -1 or 1.
	 * @param step The amount of distance that will be added every time.
	 * @param delay The delay time for next move. The larger the slower.
	 */

	jQuery.fn.floatImage = function(options) {

		var obj = this;

		var settings = { delay: 15, x: 0, y: 0, step: 1, dx: 1, dy: 1, random: true };
		jQuery.extend(settings, options);
		var x = settings.x, y = settings.y;
		var dx = settings.dx, dy = settings.dy;

		if (settings.random == true) {
			x = Math.floor(Math.random() * $(window).width());
			y = Math.floor(Math.random() * $(window).height());
			settings.delay = 12 + Math.floor(Math.random() * 7);
		}

		obj.css({ position: "absolute", cursor: "pointer" });

		function changeOffset() {

			var L = T = 0;
			var R = $(window).width() - obj.outerWidth();
			var B = $(window).height() - obj.outerHeight();

			obj.css({ left: x + document.body.scrollLeft });
			obj.css({ top: y + document.body.scrollTop });

			x = x + settings.step * dx;
			y = y + settings.step * dy;

			if (x < L) { dx = 1; x = L; }
			if (x > R) { dx = -1; x = R; }
			if (y < T) { dy = 1; y = T; }
			if (y > B) { dy = -1; y = B; }

		}

		var startFloating = setInterval(changeOffset, settings.delay);

		obj.hover(function() {
			clearInterval(startFloating);
		},
		function() {
			startFloating = setInterval(changeOffset, settings.delay);
		});
	}

})(jQuery);
