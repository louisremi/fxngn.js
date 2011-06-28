function initDOM() {
	window.scene = document.getElementById("scene");
	window.style = document.getElementById("sceneStyle");

	style.innerHTML = "#scene div {width: 1px; height: 1px;}";

	scene.style.display = "block";

	window.transform = {
		propPrefix: "",
		camel: "transform"
	};
	if ( "MozTransform" in scene.style ) {
		transform = {
			propPrefix: "-moz-",
			camel: "MozTransform"
		};

	} else if ( "WebkitTransform" in scene.style ) {
		transform.propPrefix = "-webkit-";
		transform.camel = "WebkitTransform";

	} else if ( "msTransform" in scene.style ) {
		transform.propPrefix = "-ms-";
		transform.camel = "msTransform";

	} else if ( "OTransform" in scene.style ) {
		transform.propPrefix = "-o-";
		transform.camel = "OTransform";

	}

	window.speedD = 40;
}

function initFragment() {
	initDOM();
	window._scene = scene;
	window.scene = document.createDocumentFragment();
}

function initCanvas() {
	var canvas = document.getElementById("canvas");
	canvas.style.display = "block";
	window.scene = canvas.getContext("2d");

	window.img = new Image();
	window.img.src = "point.png";

	window.speedD = 10;
}