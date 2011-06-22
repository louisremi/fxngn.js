(function(window, document, Math, Date, undefined) {

var fx = {
	run: function() {
		this.before = Date.now();
		var self = this,
			requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

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
	utils: [],
	elems: [],
	anims: []
}

window.Fx = fx;

})(window, document, Math, Date);