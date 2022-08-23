import { BoxGeometry, MeshBasicMaterial, CylinderGeometry, Mesh, Object3D } from '../../../build/three.module.js';
import Lift from './lift.js';

class CarBody extends Mesh {
	constructor({ color, bodyLength, bodyHeight, bodyWidth }) {
		const geometry = new BoxGeometry(bodyWidth, bodyHeight, bodyLength);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
	}

	show(parent) {
		parent.add(this);
	}

	setPosition(x, y, z) {
		this.position.set(x, y, z);
	}
}

class CarWheel extends Mesh {
	constructor({ color, radius, depth, x, y, z, rotation = 0.1 }) {
		const geometry = new CylinderGeometry(radius, radius, depth, 32);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
		this.rotateZ(Math.PI / 2);
		this.rotationSpeed = rotation;
	}

	show(parent) {
		parent.add(this);
	}

	update() {
		this.rotateY(this.rotationSpeed);
	}
}

export default class Car extends Object3D {
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
		super();

		this.position.set(x, y, z);
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

		this.lift = new Lift({
			height: 3 * bodyHeight,
			barColor: 0x555555,
			barSeparation: (3 * bodyWidth) / 4,
			barWidth: bodyWidth / 10,
			platformColor: 0x555555,
			z: bodyLength / 2,
			y: -bodyHeight / 2,
			x: 0
		});
	}

	show(parent) {
		parent.add(this);
		this.body.show(this);
		this.lift.show(this);
		for (let wheel of this.wheels) wheel.show(this);
	}

	update() {
		this.wheels.forEach((wheel) => wheel.update());
	}

	moveForward() {
		this.translateZ(0.1);
	}

	moveBackward() {
		this.translateZ(-0.1);
	}

	rotateLeft() {
		this.rotateY(0.06);
	}

	rotateRight() {
		this.rotateY(-0.06);
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
