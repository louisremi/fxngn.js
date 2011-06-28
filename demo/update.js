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