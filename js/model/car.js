import { BoxGeometry, MeshBasicMaterial, CylinderGeometry, Mesh } from '../../../build/three.module.js';

class CarBody {
	constructor({ color, bodyLength, bodyHeight, bodyWidth }) {
		const geometry = new BoxGeometry(bodyWidth, bodyHeight, bodyLength);
		const material = new MeshBasicMaterial({ color: color });
		this.body = new Mesh(geometry, material);
	}

	show(parent) {
		parent.add(this.body);
	}

	setPosition(x, y, z) {
		this.body.position.set(x, y, z);
	}

	add(child) {
		this.body.add(child);
	}

	moveForward() {
		this.body.translateZ(0.1);
	}

	moveBackward() {
		this.body.translateZ(-0.1);
	}

	rotateLeft() {
		this.body.rotateY(0.06);
	}

	rotateRight() {
		this.body.rotateY(-0.06);
	}
}

class CarWheel {
	constructor({ color, radius, depth, x, y, z, rotation = 0.1 }) {
		const geometry = new CylinderGeometry(radius, radius, depth, 32);
		const material = new MeshBasicMaterial({ color: color });
		this.wheel = new Mesh(geometry, material);
		this.wheel.position.set(x, y, z);
		this.wheel.rotateZ(Math.PI / 2);
		this.rotation = rotation;
	}

	show(parent) {
		parent.add(this.wheel);
	}

	update() {
		this.wheel.rotateY(this.rotation);
	}
}

export default class Car {
	constructor({
		color = 0x009900,
		x = 0,
		y = 0,
		z = 0,
		wheelColor = 0x000099,
		bodyLength = 1,
		bodyWidth = 1,
		bodyHeight = 1,
		wheelRadius = 0.2,
		wheelDepth = 0.04
	}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.body = new CarBody({ color, bodyHeight, bodyLength, bodyWidth });
		this.wheels = [];
		for (let i = 0; i < 4; i++) {
			this.wheels.push(
				new CarWheel({
					color: wheelColor,
					radius: wheelRadius,
					depth: wheelDepth,
					...calculateWheelPosition(i, wheelDepth, bodyLength, bodyWidth, bodyHeight)
				})
			);
		}
	}

	show(parent) {
		this.body.setPosition(this.x, this.y, this.z);
		this.body.show(parent);
		for (let wheel of this.wheels) wheel.show(this.body);
	}

	update() {
		this.wheels.forEach((wheel) => wheel.update());
	}

	moveForward() {
		this.body.moveForward();
	}

	moveBackward() {
		this.body.moveBackward();
	}

	rotateLeft() {
		this.body.rotateLeft();
	}

	rotateRight() {
		this.body.rotateRight();
	}
}

function calculateWheelPosition(idx, depth, bodyLength, bodyWidth, bodyHeight) {
	let offsetX = (bodyWidth + depth) / 2;

	switch (idx) {
		case 0:
			return {
				z: bodyLength / 3,
				x: offsetX,
				y: -bodyHeight / 2
			};
		case 1:
			return {
				z: bodyLength / 3,
				x: -offsetX,
				y: -bodyHeight / 2
			};
		case 2:
			return {
				z: -bodyLength / 3,
				x: offsetX,
				y: -bodyHeight / 2
			};
		case 3:
			return {
				z: -bodyLength / 3,
				x: -offsetX,
				y: -bodyHeight / 2
			};
	}
}
