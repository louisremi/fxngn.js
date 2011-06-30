function spawn() {
	var spdD = speedD,
		speedX = Math.random() * spdD * 4 |0,
		speedY = Math.random() * spdD |0,
		speedZ = speedX * speedX /3 + speedY * speedY;
	Fx.elems.push({
		style: {
			width: 2,
			height: 2,
			top: 295,
			left: 395
		},
		sprite: graphics[ Math.random() * 32 |0 ],
		speedX: speedX * ((Math.random() +.5) |0 ? 1 : -1),
		speedY: speedY * ((Math.random() +.5) |0 ? 1 : -1),
		speedZ: speedZ /2E3 * ( 40 / spdD )
	});
}

function spawnDOM() {
	var spdD = speedD,
		speedX = Math.random() * spdD * 4 |0,
		speedY = Math.random() * spdD |0,
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
			speedZ: speedZ /2E3 * ( 40 / spdD )
		};
	elem.node.className = graphics[ Math.random() * 32 |0 ][0];
	Fx.elems.push(elem);
	scene.appendChild(elem.node);
}

function spawnStyle() {
	var spdD = speedD,
		speedX = Math.random() * spdD * 4 |0,
		speedY = Math.random() * spdD |0,
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
			speedZ: speedZ /2E3 * ( 40 / spdD ),
			node: document.createElement("div"),
			id: Math.random() * 1E9 |0
		};
	elem.node.id = "elem" + elem.id;
	elem.node.className = graphics[ Math.random() * 32 |0 ][0];
	Fx.elems.push(elem);
	scene.appendChild(elem.node);
}