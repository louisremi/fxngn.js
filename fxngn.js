(function(window, document, Math, Date, undefined) {

window.Fx = {
	run: function( init, utils, noRaf ) {
		this.before = Date.now();
		typeof init === "function" ? init() : utils = init;
		this.utils = utils;
		var self = this,
			loop,
			requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

		if ( !noRaf && requestAnimationFrame ) {
			loop = function( now ) {
				requestAnimationFrame( loop );
				self.tick( now );
			}
			requestAnimationFrame( loop );

		} else {
			loop = function() {
				setTimeout( loop, 16 );
				self.tick();
			}
			setTimeout( loop, 16 );
		}
		this.loop = loop;
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

	stop: function() {
		this.loop = function() {};
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