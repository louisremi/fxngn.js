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
	Fx.stop( start );

	if ( window.scene && "innerHTML" in scene ) {
		scene.innerHTML = "";
		scene.style.display = "none";
	} else {
		$("canvas").style.display = "none";
	}
	if ( window.style ) {
		style.innerHTML = "";
	}
	if ( window._scene ) {
		_scene.innerHTML = "";
		_scene.style.display = "none";
	}
	if ( window.statsDiv ) {
		statsDiv.innerHTML = "";
	}
}

function detach() {
	document.body.removeChild(scene);
}
function attach() {
	document.body.appendChild(scene)
}

function prepareControls() {
	$("controls").addEventListener("click", function(e) {
		var target = e.target;
		if ( target.nodeName.toLocaleLowerCase() === "label" ) {
			target = $(target.getAttribute("for"));
		}
		if ( target.nodeName.toLocaleLowerCase() === "input" && !target.disabled ) {
			reset();
		}
	}, true);
}

function $( id ) {
	return document.getElementById(id);
}

function start() {
	var controls = $("controls"),
		dom = $("dom"),
		canvas = $("cnvs"),
		domanip = $("domanip"),
		html = $("html"),
		style = $("styl"),
		fragment = $("fragment"),
		transform = $("transform"),
		raf = $("raf"),
		round = $("round");
	var utils = [],
		init, tmp;
		
	if ( dom.checked ) {
		// enable relevant options
		domanip.disabled = false;
		html.disabled = false;
		style.disabled = false;
		transform.disabled = false;

		init = initDOM;

		if ( domanip.checked ) {
			fragment.disabled = false;
			
			utils.unshift(spawnDOM);
			tmp = "updateDOM";

		} else {
			fragment.disabled = true;

			if ( html.checked ) {
				utils.unshift(spawn);
				utils.unshift(update);
				tmp = "renderHTML";
				
			} else if ( style.checked ) {
				utils.unshift( spawnStyle );
				utils.unshift( updateStyle );
				tmp = "renderStyle";
			}
		}

		if ( transform.checked ) {
			tmp += "Transform";
		}

	} else if ( canvas.checked ) {
		// disable irrelevant options
		domanip.disabled = true;
		html.disabled = true;
		style.disabled = true;
		transform.disabled = true;
		fragment.disabled = true;

		init = initCanvas;
		utils.unshift(spawn);
		utils.unshift(update);
		tmp = "renderCanvas";

	}

	if ( round.checked ) {
		tmp += "Rounded";
	}

	utils.unshift( window[tmp] );
	
	if ( !fragment.disabled && fragment.checked ) {
		init = initFragment;
		utils.unshift( renderFragment );
	}
	
	utils.unshift( stats );

	Fx.run( init, utils, !raf.checked );
}