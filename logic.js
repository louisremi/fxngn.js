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

function initDOM() {
	window.scene = document.getElementById("scene");
	window.style = document.getElementById("sceneStyle");
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

	window.speedD = 20;
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

function spawn() {
	var speedX = Math.random() * speedD * 4 |0,
		speedY = Math.random() * speedD |0,
		speedZ = speedX * speedX /3 + speedY * speedY;
	Fx.elems.push({
		style: {
			width: 2,
			height: 2,
			top: 295,
			left: 395
		},
		speedX: speedX * ((Math.random() +.5) |0 ? 1 : -1),
		speedY: speedY * ((Math.random() +.5) |0 ? 1 : -1),
		speedZ: speedZ /2E3
	});
}

function update( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		elem, x, y;
	while ( i-- ) {
		elem = elems[i];
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			elems.splice(i, 1);
		}
	}
}

function detach() {
	document.body.removeChild(scene);
}
function attach() {
	document.body.appendChild(scene)
}

function spawnDOM() {
	var speedX = Math.random() * speedD * 4 |0,
		speedY = Math.random() * speedD |0,
		speedZ = speedX * speedX /3 + speedY * speedY,
		elem = {
			style: {
				width: 2,
				height: 2,
				top: 295,
				left: 395
			},
			node: document.createElement("div"),
			speedX: speedX * ((Math.random() +.5) |0 ? 1 : -1),
			speedY: speedY * ((Math.random() +.5) |0 ? 1 : -1),
			speedZ: speedZ /2E3
		};
	Fx.elems.push(elem);
	scene.appendChild(elem.node);
}

/* Chrome:
 * Firefox:
 */
function updateDOM( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		elem, node, x, y, s;
	while ( i-- ) {
		elem = elems[i];
		node = elem.node;
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		s = elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		node.style.left = x + "px";
		node.style.top = y + "px";
		node.style.width = s + "px";
		node.style.height = s + "px";
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			scene.removeChild(node);
			elems.splice(i, 1);
		}
	}
}

/* Chrome:
 * Firefox:
 */
function updateDOMRounded( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		elem, node, x, y, s;
	while ( i-- ) {
		elem = elems[i];
		node = elem.node;
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		s = elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		node.style.left = ((x +.5) |0) + "px";
		node.style.top = ((y +.5) |0) + "px";
		node.style.width = ((s +.5) |0) + "px";
		node.style.height = ((s +.5) |0) + "px";
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			scene.removeChild(node);
			elems.splice(i, 1);
		}
	}
}

/* Chrome:
 * Firefox:
 */
function updateDOMTransform( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		trans = transform,
		elem, node, x, y, s;
	while ( i-- ) {
		elem = elems[i];
		node = elem.node;
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		s = elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		node.style[trans.camel] = "translate(" + x + "px," + y + "px) scale("+ s +")";
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			scene.removeChild(node);
			elems.splice(i, 1);
		}
	}
}

/* Chrome:
 * Firefox:
 */
function updateDOMTransformRounded( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		trans = transform,
		elem, node, x, y, s;
	while ( i-- ) {
		elem = elems[i];
		node = elem.node;
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		s = elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		node.style[trans.camel] = "translate(" + ((x +.5) |0) + "px," + ((y +.5) |0) + "px) scale("+ ((s +.5) |0) +")";
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			scene.removeChild(node);
			elems.splice(i, 1);
		}
	}
}

function renderFragment() {
	_scene.innerHTML = "";
	_scene.appendChild(scene.cloneNode(true));
}

/* Chrome:
 * Firefox: 
 */
function renderHTML() {
	var html = "",
		elems = Fx.elems,
		i = elems.length,
		elem;
	while ( i-- ) {
		elem = elems[i];
		html += '<div style="top:'+elem.style.top+'px;left:'+elem.style.left+'px;width:'+elem.style.width+'px;height:'+elem.style.height+'px;"></div>';
	}
	scene.innerHTML = html;
}

/* Chrome:
 * Firefox: 
 */
function renderHTMLRounded() {
	var html = "",
		elems = Fx.elems,
		i = elems.length,
		elem;
	while ( i-- ) {
		elem = elems[i];
		html += '<div style="top:'+((elem.style.top +.5) |0)+'px;left:'+((elem.style.left +.5) |0)+'px;width:'+((elem.style.width +.5) |0)+'px;height:'+((elem.style.height +.5) |0)+'px;"></div>';
	}
	scene.innerHTML = html;
}

/* Chrome:
 * Firefox:
 */
function renderHTMLTransform() {
	var html = "",
		trans = transform,
		elems = Fx.elems,
		i = elems.length,
		elem,
		htmlPrefix = '<div style="' + trans.propPrefix + 'transform:translate(',
		separator1 = 'px,',
		separator2 = 'px) scale(',
		htmlSuffix = ')"></div>';
	while ( i-- ) {
		elem = elems[i];
		html +=  htmlPrefix + elem.style.left + separator1 + elem.style.top + separator2 + elem.style.width + htmlSuffix;
	}
	scene.innerHTML = html;
}

/* Chrome:
 * Firefox:
 */
function renderHTMLTransformRounded() {
	var html = "",
		trans = transform,
		elems = Fx.elems,
		i = elems.length,
		elem,
		htmlPrefix = '<div style="' + trans.propPrefix + 'transform:translate(',
		separator1 = 'px,',
		separator2 = 'px) scale(',
		htmlSuffix = ')"></div>';
	while ( i-- ) {
		elem = elems[i];
		html +=  htmlPrefix + ((elem.style.left +.5) |0) + separator1 + ((elem.style.top +.5) |0) + separator2 + ((elem.style.width +.5) |0) + htmlSuffix;
	}
	scene.innerHTML = html;
}

/* Chrome:
 * Firefox:
 */
function renderCanvas() {
	var _ctx = scene,
		_img = img,
		elems = Fx.elems,
		i = elems.length,
		elem;

	_ctx.clearRect(0,0,800,600);
	while ( i-- ) {
		elem = elems[i];
		_ctx.drawImage(_img, elem.style.left, elem.style.top, elem.style.width, elem.style.height);
	}
}

/* Chrome:
 * Firefox:
 */
function renderCanvasRounded() {
	var _ctx = scene,
		_img = img,
		elems = Fx.elems,
		i = elems.length,
		elem;

	_ctx.clearRect(0,0,800,600);
	while ( i-- ) {
		elem = elems[i];
		_ctx.drawImage(_img, ((elem.style.left +.5) |0), ((elem.style.top +.5) |0), ((elem.style.width +.5) |0), ((elem.style.height +.5) |0));
	}
}

function spawnStyle() {
	var speedX = Math.random() * speedD * 4 |0,
		speedY = Math.random() * speedD |0,
		speedZ = speedX * speedX /3 + speedY * speedY;
		elem = {
				style: {
				width: 2,
				height: 2,
				top: 295,
				left: 395
			},
			speedX: speedX * ((Math.random() +.5) |0 ? 1 : -1),
			speedY: speedY * ((Math.random() +.5) |0 ? 1 : -1),
			speedZ: speedZ /2E3,
			node: document.createElement("div"),
			id: Math.random() * 1E9 |0
		};
	elem.node.id = "elem" + elem.id;
	Fx.elems.push(elem);
	scene.appendChild(elem.node);
}

function updateStyle( dT ) {
	var elems = Fx.elems,
		i = elems.length,
		elem, x, y;
	while ( i-- ) {
		elem = elems[i];
		x = elem.style.left += elem.speedX / 1000 * dT;
		y = elem.style.top += elem.speedY / 1000 * dT;
		elem.style.width = elem.style.height += elem.speedZ / 1000 * dT;
		if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
			elems.splice(i, 1);
			scene.removeChild(elem.node);
		}
	}
}

/* Chrome:
 * Firefox:
 */
function renderStyle() {
	var styleStr = "",
		elems = Fx.elems,
		i = elems.length,
		elem;
	while ( i-- ) {
		elem = elems[i];
		styleStr += "#elem" + elem.id + "{left:" + elem.style.left + "px;top:" + elem.style.top + "px;width:"+ elem.style.width +"px;height:"+ elem.style.height +"px;}\n";
	}
	style.innerHTML = styleStr;
}

/* Chrome:
 * Firefox:
 */
function renderStyleRounded() {
	var styleStr = "",
		elems = Fx.elems,
		i = elems.length,
		elem;
	while ( i-- ) {
		elem = elems[i];
		styleStr += "#elem" + elem.id + "{left:" + ((elem.style.left +.5) |0) + "px;top:" + ((elem.style.top +.5) |0) + "px;width:"+ ((elem.style.width +.5) |0) +"px;height:"+ ((elem.style.height +.5) |0) + "px;}\n";
	}
	style.innerHTML = styleStr;
}

/* Chrome:
 * Firefox: 
 */
function renderStyleTransform() {
	var styleStr = "",
		elems = Fx.elems,
		i = elems.length,
		elem,
		trans = transform,
		tmp = '{' + trans.propPrefix + 'transform:translate(';
	while ( i-- ) {
		elem = elems[i];
		styleStr += "#elem" + elem.id + tmp + elem.style.left + "px," + elem.style.top + "px);}\n";
	}
	style.innerHTML = styleStr;
}

/* Chrome:
 * Firefox: 
 */
function renderStyleTransformRounded() {
	var styleStr = "",
		elems = Fx.elems,
		i = elems.length,
		elem,
		trans = transform,
		tmp = '{' + trans.propPrefix + 'transform:translate(';
	while ( i-- ) {
		elem = elems[i];
		styleStr += "#elem" + elem.id + tmp + ((elem.style.left +.5) |0) + "px," + ((elem.style.top +.5) |0) + "px);}\n";
	}
	style.innerHTML = styleStr;
}