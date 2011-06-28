function stats( dT, now ) {
	// inline initialization
	if ( !window.before ) {
		window.statsDiv = document.getElementById("stats");
		window.before = Date.now();
		window.frames = 0;
	}
	var sec = now - before;
	frames++;
	if ( sec >= 1000 ) {
		statsDiv.innerHTML = "fps: " + ( (frames / sec * 1000) |0) + "<br/>elems: " + (Fx.elems.length);
		before = now;
		frames = 0;
	}
}

function reset() {
	Fx.utils = [];
	Fx.elems = [];
	if ( "innerHTML" in scene ) {
		scene.innerHTML = "";
	}
}

function detach() {
	document.body.removeChild(scene);
}
function attach() {
	document.body.appendChild(scene)
}