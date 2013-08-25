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

	jQuery.fn.crossFloat = function(options) {

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

		obj.css({ position: "absolute", cursor: "pointer", display: "block" });

		function changeOffset() {

			var l = t = 0;
			var w = $(window).width() - obj.outerWidth();
			var h = $(window).height() - obj.outerHeight();

			obj.css({ left: x + document.body.scrollLeft });
			obj.css({ top: y + document.body.scrollTop });

			x = x + settings.step * dx;
			y = y + settings.step * dy;

			if (x < l) { dx = 1; x = l; }
			if (x > w) { dx = -1; x = w; }
			if (y < t) { dy = 1; y = t; }
			if (y > h) { dy = -1; y = h; }

		}

		var startFloating = setInterval(changeOffset, settings.delay);

		obj.hover(function() {
			clearInterval(startFloating);
		},
		function() {
			startFloating = setInterval(changeOffset, settings.delay);
		});
	};

	jQuery.fn.stickFloat = function(options) {

		var obj = this;

		var settings = { x: 0.0, y: 0.0 };
		jQuery.extend(settings, options);

		obj.css({ position: "absolute", cursor: "pointer", display: "block" });

		function changeSticky() {

			var l = t = 0;
			var w = $(window).width() - obj.outerWidth();
			var h = $(window).height() - obj.outerHeight();

			var x = w * settings.x, y = h * settings.y;

			obj.css({ left: x + document.body.scrollLeft });
			obj.css({ top: y + document.body.scrollTop });

		}

		var startSticky = setInterval(changeSticky, settings.delay);

		obj.hover(function() {
			clearInterval(startSticky);
		},
		function() {
			startSticky = setInterval(changeSticky, settings.delay);
		});
	};

})(jQuery);
