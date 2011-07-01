(function(window, document, Math, Date, undefined) {

window.Fx = {
	run: function( init, utils, noRaf ) {
		this.before = Date.now();
		typeof init === "function" ? init() : utils = init;
		this.utils = utils;
		var self = this,
			requestAnimationFrame = (!noRaf &&
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame) ||
				setTimeout;

		this.loop = function() {
			requestAnimationFrame( self.loop, 16 );

			var now = Date.now(),
				dT = Math.min( now - self.before, 60 ),
				utils = self.utils,
				i = utils.length;

			while ( i-- ) {
				utils[i]( dT, now );
			}
			self.before = now;
		}
		requestAnimationFrame( this.loop, 16 );
	},

	// The stop function takes an optional callback
	// because it doesn't stop immediatly.
	// This saves 1 test and 1 lookup inside the animation loop.
	// Over-optimization FTW.
	stop: function( callback ) {
		this.loop = callback || function() {};
		this.utils = [];
		this.elems = [];
	},

	// from Paul Irish's imagesloaded: https://gist.github.com/268257/
	load: function( assets, callback ) {
		var i = assets.length,
			total = i,
			count = 0,
			img;

		while ( i-- ) {
			img = new Image();

			img.onload = function() {
				count++;
				if ( count === total ) {
					callback();
				}
			}
			img.src = assets[i];

			if ( img.complete || img.complete === undefined ) {
				img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				img.src = assets[i];
			}
		}
	},

	utils: [],
	elems: []
}

})(window, document, Math, Date);