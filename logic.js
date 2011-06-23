function onload() {
	var before = Date.now(),
		frames = 0,
		statsDiv = document.getElementById("stats"),
		scene = document.getElementById("scene"),
		canvas = document.getElementById("canvas"),
		style = document.getElementById("sceneStyle"), 
		ctx = canvas.getContext("2d"),
		img = new Image(),
		speedD = 100,
		transform = {
			propPrefix: "",
			camel: "transform"
		};

	img.src = "point.png";

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

	Fx.run([
			stats
		, spawn
		, anim
		, renderHTML
	]);
	
	function stats( dT, now ) {
		var sec = now - before;
		frames++;
		if ( sec >= 1000 ) {
			statsDiv.innerHTML = "fps: " + ( (frames / sec * 1000) |0) + "<br/>elems: " + (scene.childNodes.length);
			before = now;
			frames = sec = 0;
		}
	}
	
	function spawn() {
		Fx.elems.push({
			style: {
				width: 10,
				height: 10,
				top: 295,
				left: 395
			},
			speedX: (Math.random() * speedD |0) * ((Math.random() +.5) |0 ? 1 : -1),
			speedY: (Math.random() * speedD |0) * ((Math.random() +.5) |0 ? 1 : -1)
		});
	}
	
	function anim( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			elem, x, y;
		while ( i-- ) {
			elem = elems[i];
			x = elem.style.left += elem.speedX / 1000 * dT;
			y = elem.style.top += elem.speedY / 1000 * dT;
			if ( x < 0 || y < 0 || x > 790 || y > 590 ) {
				elems.splice(i, 1);
			}
		}
	}
	
	function spawnDOM() {
		var node = document.createElement("div"), 
			elem = {
				style: {
					width: 10,
					height: 10,
					top: Math.random() * 590,
					left: 0
				},
				node: node
			};
		Fx.elems.push(elem);
		node.style.top = elem.style.top + "px";
		scene.appendChild(node);
	}
	
	function spawnDOMTransform() {
		var node = document.createElement("div"), 
			elem = {
				style: {
					width: 10,
					height: 10,
					top: Math.random() * 590,
					left: 0
				},
				node: node
			};
		Fx.elems.push(elem);
		node.style[transform.camel] = "translate(0px," + elem.style.top +"px)";
		scene.appendChild(node);
	}
	
	/* Chrome: 870p @44fps
	 * Firefox: 480p @25fps
	 */
	function animDOM( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val;
		while ( i-- ) {
			elem = elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style.left = val + "px";
			node.style.top = elem.style.top + "px";
			if ( val > 590 ) {
				scene.removeChild(node);
				elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 920p @46fps
	 * Firefox: 500p @25fps
	 */
	function animDOMRounded( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val;
		while ( i-- ) {
			elem = elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style.left = ((val +.5) |0) + "px";
			node.style.top = elem.style.top + "px";
			if ( val > 590 ) {
				scene.removeChild(node);
				elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 510p @44fps
	 * Firefox: 280p @24fps
	 */
	function animDOMTransform( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val,
			trans = transform;
		while ( i-- ) {
			elem = elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style[trans.camel] = "translate("+ val + "px," + elem.style.top + "px)";
			if ( val > 590 ) {
				scene.removeChild(node);
				elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 550p @45fps
	 * Firefox: 280p @24fps
	 */
	function animDOMTransformRounded( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val,
			trans = transform;
		while ( i-- ) {
			elem = elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style[trans.camel] = "translate("+ ((val +.5) |0) + "px," + ((elem.style.top +.5) |0) + "px)";
			if ( val > 590 ) {
				scene.removeChild(node);
				elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 480p @40fps
	 * Firefox: 
	 */
	function renderHTML() {
		var html = "",
			elems = Fx.elems,
			i = elems.length,
			elem;
		while ( i-- ) {
			elem = elems[i];
			html += '<div style="top:'+elem.style.top+'px;left:'+elem.style.left+'px"></div>';
		}
		scene.innerHTML = html;
	}
	
	/* Chrome: 510p @42fps
	 * Firefox: 
	 */
	function renderHTMLRounded() {
		var html = "",
			elems = Fx.elems,
			i = elems.length,
			elem;
		while ( i-- ) {
			elem = elems[i];
			html += '<div style="top:'+((elem.style.top +.5) |0)+'px;left:'+((elem.style.left +.5) |0)+'px"></div>';
		}
		scene.innerHTML = html;
	}
	
	/* Chrome: 444p @37fps
	 * Firefox: 290p @24fps
	 */
	function renderHTMLTransform() {
		var html = "",
			trans = transform,
			elems = Fx.elems,
			i = elems.length,
			elem,
			htmlPrefix = '<div style="' + trans.propPrefix + 'transform:translate(',
			separator = 'px,';
			htmlSuffix = 'px)"></div>';
		while ( i-- ) {
			elem = elems[i];
			html +=  htmlPrefix + elem.style.left + separator + elem.style.top + htmlSuffix;
		}
		scene.innerHTML = html;
	}
	
	/* Chrome: 444p @37fps
	 * Firefox: 290p @24fps
	 */
	function renderHTMLTransformRounded() {
		var html = "",
			trans = transform,
			elems = Fx.elems,
			i = elems.length,
			elem,
			htmlPrefix = '<div style="' + trans.propPrefix + 'transform:translate(',
			separator = 'px,';
			htmlSuffix = 'px)"></div>';
		while ( i-- ) {
			elem = elems[i];
			html +=  htmlPrefix + ((elem.style.left +.5) |0) + separator + ((elem.style.top +.5) |0) + htmlSuffix;
		}
		scene.innerHTML = html;
	}
	
	/* Chrome: 1300p @42fps
	 * Firefox: 770 @26fps
	 */
	function renderCanvas() {
		var _ctx = ctx,
			_img = img,
			elems = Fx.elems,
			i = elems.length,
			elem;

		_ctx.clearRect(0,0,600,400);
		while ( i-- ) {
			elem = elems[i];
			_ctx.drawImage(_img, elem.style.left, elem.style.top);
		}
	}
	
	/* Chrome: 1350p @45fps
	 * Firefox: 1650 @56fps
	 */
	function renderCanvasRounded() {
		var _ctx = ctx,
			_img = img,
			elems = Fx.elems,
			i = elems.length,
			elem;

		_ctx.clearRect(0,0,600,400);
		while ( i-- ) {
			elem = elems[i];
			_ctx.drawImage(_img, ((elem.style.left +.5) |0), ((elem.style.top +.5) |0));
		}
	}
	
	function spawnStyle() {
		var elem = {
				style: {
					width: 10,
					height: 10,
					top: Math.random() * 390,
					left: 0
				},
				node: document.createElement("div"),
				id: Math.random() * 1E9 |0
			};
		elem.node.id = "elem" + elem.id;
		Fx.elems.push(elem);
		scene.appendChild(elem.node);
	}
	
	function animStyle( dT ) {
		var elems = Fx.elems,
			i = elems.length,
			dX = 50 / 1000 * dT,
			elem, val;
		while ( i-- ) {
			elem = elems[i];
			val = elem.style.left += dX;
			if ( val > 590 ) {
				elems.splice(i, 1);
				scene.removeChild(elem.node);
			}
		}
	}
	
	/* Chrome: 480p @41fps
	 * Firefox: 400p @33fps
	 */
	function renderStyle() {
		var styleStr = "",
			elems = Fx.elems,
			i = elems.length,
			elem;
		while ( i-- ) {
			elem = elems[i];
			styleStr += "#elem" + elem.id + "{left:" + elem.style.left + "px;top:" + elem.style.top + "px;}\n";
		}
		style.innerHTML = styleStr;
	}
	
	/* Chrome: 510p @43fps
	 * Firefox: 215p @10fps
	 */
	function renderStyleRounded() {
		var styleStr = "",
			elems = Fx.elems,
			i = elems.length,
			elem;
		while ( i-- ) {
			elem = elems[i];
			styleStr += "#elem" + elem.id + "{left:" + ((elem.style.left +.5) |0) + "px;top:" + ((elem.style.top +.5) |0) + "px;}\n";
		}
		style.innerHTML = styleStr;
	}

	/* Chrome: 430p @36fps
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
	
	/* Chrome: 340p @29fps
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
}