(function(window, document, Math, Date, undefined) {

window.Fx = {
	run: function( init, utils, noRaf ) {
		this.before = Date.now();
		typeof init === "function" ? init() : utils = init;
		this.utils = utils;
		var self = this,
			requestAnimationFrame =
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame;

		if ( !noRaf && requestAnimationFrame ) {
			this.loop = function( now ) {
				requestAnimationFrame( self.loop );
				self.tick( now );
			}
			requestAnimationFrame( this.loop );

		} else {
			this.loop = function() {
				setTimeout( self.loop, 16 );
				self.tick();
			}
			setTimeout( this.loop, 16 );
		}
	},

	tick: function( now ) {
		now = now || Date.now();
		var utils = this.utils,
			dT = Math.min( now - this.before, 60 ),
			i = utils.length;

		while ( i-- ) {
			utils[i]( dT, now );
		}
		this.before = now;
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