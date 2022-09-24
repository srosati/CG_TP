import {
	Mesh,
	Object3D,
	Shape,
	ExtrudeGeometry,
	Vector2,
	Vector3,
	Curve,
	MeshNormalMaterial
} from '../../../build/three.module.js';
import Extrusion from './extrusion.js';
import Lift from './lift.js';
import Revolution from './revolution.js';

class Body extends Extrusion {
	constructor({ color, bodyLength, bodyHeight, bodyWidth }) {
		const shortHeight = 0.25 * bodyHeight;
		const shortLen = 0.4 * bodyLength;

		const len = bodyLength / 2;
		const height = bodyHeight / 2;

		const points = [
			[-shortLen, -height],
			[-len, -shortHeight],
			[-len, shortHeight],
			[-shortLen, height],
			[shortLen, height],
			[len, shortHeight],
			[len, -shortHeight],
			[shortLen, -height],
			[-shortLen, -height]
		];

		super({ color, points, depth: bodyWidth, rotation: [0, Math.PI / 2, 0], x: 0, y: 0, z: 0 });
		this.translateZ(-bodyWidth / 2);
	}

	setPosition(x, y, z) {
		this.position.set(x, y, z);
	}
}

class BodyDecoration extends Extrusion {
	constructor({ color, width, shortLen, longLen, height, x, y, z, mirror = true }) {
		const points = [
			[0, 0],
			[mirror ? longLen - shortLen : 0, height],
			[mirror ? longLen : shortLen, height],
			[longLen, 0],
			[0, 0]
		];

		super({ color: color, points: points, depth: width, rotation: [0, Math.PI / 2, 0], x, y, z });
		this.translateZ(-width / 2);
	}
}

class Wheel extends Revolution {
	constructor({ color, radius, depth, x, y, z, isLeft }) {
		const width = depth / 2;
		const shortWidth = 0.5 * width;

		const points = [
			[-width, 0],
			[width, 0],
			[width, 0.3 * radius],
			[shortWidth, 0.4 * radius],
			[shortWidth, radius],
			[-width, radius],
			[-width, 0]
		];

		const mul = isLeft ? 1 : -1;

		super({ color, radius, points, x, y, z, rotation: [0, (mul * Math.PI) / 2, 0] });
		this.radius = radius;
		this.speed = 0;
	}

	update(dt) {
		this.rotateZ(this.speed * dt);
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
		this.dec1 = new BodyDecoration({
			color: '#AAAAAA',
			width: 0.7 * bodyWidth,
			height: 1.5 * bodyHeight,
			longLen: 0.14 * bodyLength,
			shortLen: 0.07 * bodyLength,
			x: 0,
			y: bodyHeight / 2,
			z: -0.15 * bodyLength
		});

		this.dec2 = new BodyDecoration({
			color: '#AAAAAA',
			width: 0.7 * bodyWidth,
			height: 0.4 * bodyHeight,
			longLen: 0.16 * bodyLength,
			shortLen: 0.1 * bodyLength,
			x: 0,
			y: bodyHeight / 2,
			z: 0.3 * bodyLength,
			mirror: false
		});

		const offsetX = (bodyWidth + wheelDepth) / 2;
		const offsetY = -bodyHeight / 2;
		const offsetZ = (bodyLength - wheelRadius) / 2.5;

		this.wheels = [];
		this.generateWheels(wheelColor, wheelRadius, wheelDepth, offsetX, offsetY, offsetZ);

		this.lift = new Lift({
			height: 5 * bodyHeight,
			barColor: 0xaaaaaa,
			barSeparation: (3 * bodyWidth) / 4,
			barWidth: bodyWidth / 20,
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
					isLeft: i % 2 === 0,
					x: x * (i % 2 ? 1 : -1),
					z: z * (i < 2 ? 1 : -1)
				})
			);
		}
	}

	show(parent) {
		parent.add(this);
		this.body.show(this);
		this.dec1.show(this);
		this.dec2.show(this);
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
