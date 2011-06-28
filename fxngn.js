(function(window, document, Math, Date, undefined) {

var fx = {
	run: function( init, utils ) {
		this.before = Date.now();
		typeof init === "function" ? init() : utils = init;
		this.utils = utils;
		var self = this,
			requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

		if ( requestAnimationFrame ) {
			raf = function( now ) {
				requestAnimationFrame( raf );
				self.tick( now );
			}
			requestAnimationFrame( raf );

		} else {
			setInterval( this.tick, 16 );
		}
	},
	tick: function( now ) {
		now = now || Date.now();
		var dT = Math.min( now - this.before, 60 ),
			i = this.utils.length;

		while ( i-- ) {
			this.utils[i]( dT, now );
		}
		this.before = now;
	},
	// from Paul Irish's imgesloaded: https://gist.github.com/268257/
	load: function( assets, callback ) {
		var i = assets.length,
			total = i,
			count = 0,
			img;
		while ( i-- ) {
			img = new Image();
			img.load = function() {
				count++;
				if ( count === total ) {
					callback();
				}
			}
			img = assets[i];
			if ( img.complete || img.complete === undefined ) {
				img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				img.src = assets[i];
			}
		}
	},
	utils: [],
	elems: []
}

window.Fx = fx;

})(window, document, Math, Date);