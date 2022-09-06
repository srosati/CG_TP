import { BoxGeometry, MeshBasicMaterial, CylinderGeometry, Mesh, Object3D } from '../../../build/three.module.js';
import Lift from './lift.js';

class Body extends Mesh {
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

class Wheel extends Mesh {
	constructor({ color, radius, depth, x, y, z }) {
		const geometry = new CylinderGeometry(radius, radius, depth, 32);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.radius = radius;
		this.speed = 0;
		this.position.set(x, y, z);
		this.rotateZ(Math.PI / 2);
	}

	show(parent) {
		parent.add(this);
	}

	update(dt) {
		this.rotateY(this.speed * dt);
	}

	rotate(speed) {
		this.speed = speed / this.radius;
	}

	stopRotate() {
		this.speed = 0;
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
		this.body = new Body({ color, bodyHeight, bodyLength, bodyWidth });

		const offsetX = (bodyWidth + wheelDepth) / 2;
		const offsetY = -bodyHeight / 2;
		const offsetZ = (bodyLength - wheelRadius) / 2;

		this.wheels = [];
		this.generateWheels(wheelColor, wheelRadius, wheelDepth, offsetX, offsetY, offsetZ);

		this.lift = new Lift({
			height: 3 * bodyHeight,
			barColor: 0x555555,
			barSeparation: (3 * bodyWidth) / 4,
			barWidth: bodyWidth / 15,
			platformColor: 0xe89b27,
			platformWidth: bodyWidth,
			z: bodyLength / 2,
			y: -bodyHeight / 2,
			x: 0
		});

		this.movingSpeed = bodyLength / 500;
		this.rotatingSpeed = bodyWidth / 5000;

		this.speed = 0;
		this.rotationSpeed = 0;
	}

	generateWheels(color, radius, depth, x, y, z) {
		const baseObj = {
			color,
			radius,
			depth,
			y
		};

		for (let i = 0; i < 4; i++) {
			this.wheels.push(
				new Wheel({
					...baseObj,
					x: x * (i % 2 ? 1 : -1),
					z: z * (i < 2 ? 1 : -1)
				})
			);
		}
	}

	show(parent) {
		parent.add(this);
		this.body.show(this);
		this.lift.show(this);
		for (let wheel of this.wheels) wheel.show(this);
	}

	update(dt) {
		this.wheels.forEach((wheel) => wheel.update(dt));
		this.lift.update(dt);
		this.translateZ(this.speed * dt);
		this.rotateY(this.rotationSpeed * dt);
	}

	move(speed) {
		this.speed = speed;
		this.wheels.forEach((wheel) => wheel.rotate(speed));
	}

	moveForward() {
		this.move(this.movingSpeed);
	}

	moveBackward() {
		this.move(-this.movingSpeed);
	}

	stopMove() {
		this.speed = 0;
		this.wheels.forEach((wheel) => wheel.stopRotate());
	}

	rotate(speed) {
		this.rotationSpeed = speed;
	}

	rotateLeft() {
		this.rotate(this.rotatingSpeed);
	}

	rotateRight() {
		this.rotate(-this.rotatingSpeed);
	}

	stopRotate() {
		this.rotationSpeed = 0;
	}

	liftUp() {
		this.lift.moveUp();
	}

	liftDown() {
		this.lift.moveDown();
	}

	stopLift() {
		this.lift.stop();
	}
}
