function onload() {
	var before = Date.now(),
		frames = 0,
		statsDiv = document.getElementById("stats"),
		scene = document.getElementById("scene"),
		canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		img = new Image(),
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

	Fx.utils.push(function stats( dT, now ) {
		var sec = now - before;
		frames++;
		if ( sec >= 1000 ) {
			statsDiv.innerHTML = "fps: " + ( (frames / sec * 1000) |0) + "<br/>elems: " + (Fx.elems.length);
			before = now;
			frames = sec = 0;
		}
	});

	Fx.utils.push(spawnDOMTransform);
	
	Fx.utils.push(animDOMTransform);
	
	//Fx.utils.push(renderHTMLTransformRounded);

	Fx.run();
	
	function spawn() {
		Fx.elems.push({
			style: {
				width: 10,
				height: 10,
				top: Math.random() * 390,
				left: 0
			}
		});
	}
	
	function anim( dT ) {
		var i = Fx.elems.length,
			dX = 50 / 1000 * dT,
			anim, val;
		while ( i-- ) {
			anim = Fx.elems[i];
			val = anim.style.left += dX;
			if ( val > 590 ) {
				Fx.elems.splice(i, 1);
			}
		}
	}
	
	function spawnDOM() {
		var node = document.createElement("div"), 
			elem = {
				style: {
					width: 10,
					height: 10,
					top: Math.random() * 390,
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
					top: Math.random() * 390,
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
		var i = Fx.elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val;
		while ( i-- ) {
			elem = Fx.elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style.left = val + "px";
			node.style.top = elem.style.top + "px";
			if ( val > 590 ) {
				scene.removeChild(node);
				Fx.elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 920p @46fps
	 * Firefox: 500p @25fps
	 */
	function animDOMRounded( dT ) {
		var i = Fx.elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val;
		while ( i-- ) {
			elem = Fx.elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style.left = ((val +.5) |0) + "px";
			node.style.top = elem.style.top + "px";
			if ( val > 590 ) {
				scene.removeChild(node);
				Fx.elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 510p @44fps
	 * Firefox: 280p @24fps
	 */
	function animDOMTransform( dT ) {
		var i = Fx.elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val,
			trans = transform;
		while ( i-- ) {
			elem = Fx.elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style[trans.camel] = "translate("+ val + "px," + elem.style.top + "px)";
			if ( val > 590 ) {
				scene.removeChild(node);
				Fx.elems.splice(i, 1);
			}
		}
	}
	
	/* Chrome: 550p @45fps
	 * Firefox: 280p @24fps
	 */
	function animDOMTransformRounded( dT ) {
		var i = Fx.elems.length,
			dX = 50 / 1000 * dT,
			elem, node, val,
			trans = transform;
		while ( i-- ) {
			elem = Fx.elems[i];
			node = elem.node;
			val = elem.style.left += dX;
			node.style[trans.camel] = "translate("+ ((val +.5) |0) + "px," + ((elem.style.top +.5) |0) + "px)";
			if ( val > 590 ) {
				scene.removeChild(node);
				Fx.elems.splice(i, 1);
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
	
	/* Chrome: 417 @35fps
	 * Firefox: 290p @24fps
	 */
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
			separator = trans.translateUnit + ',';
			htmlSuffix = trans.translateUnit + ')"></div>';
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
			separator = trans.translateUnit + ',';
			htmlSuffix = trans.translateUnit + ')"></div>';
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
}