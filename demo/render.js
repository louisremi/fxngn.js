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