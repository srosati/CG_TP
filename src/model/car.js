import {
	Object3D,
	Shape,
	Vector2,
	Vector3,
	TextureLoader,
	RepeatWrapping,
	MeshPhysicalMaterial,
	CylinderGeometry,
	Mesh
} from 'three';
import Extrusion from './extrusion.js';
import Lift from './lift.js';
import Revolution from './revolution.js';

import '../maps/texturaGrua.jpg';
import '../maps/rueda.jpg';
class Body extends Extrusion {
	constructor({ bodyLength, bodyHeight, bodyWidth }) {
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

		const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));
		const texture = new TextureLoader().load('maps/texturaGrua.jpg');

		texture.wrapS = texture.wrapT = RepeatWrapping;
		texture.repeat.set(1 / 6, 1 / 6);
		texture.offset.set(0.1, 0.5);

		super({
			shape,
			depth: bodyWidth,
			rotation: [0, Math.PI / 2, 0],
			x: 0,
			y: 0,
			z: 0,
			texture
		});
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

		const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));

		super({
			color,
			shape,
			depth: width,
			rotation: [0, Math.PI / 2, 0],
			x,
			y,
			z
		});
		this.translateZ(-width / 2);
	}
}

class Wheel extends Mesh {
	constructor({ radius, depth, x, y, z, isLeft }) {
		const texture = new TextureLoader().load('maps/rueda.jpg');

		const geometry = new CylinderGeometry(radius, radius, depth, 128);

		const texturedMaterial = new MeshPhysicalMaterial({ map: texture });
		const greyMaterial = new MeshPhysicalMaterial({ color: 0x323232 });
		const materials = [greyMaterial, texturedMaterial, greyMaterial];
		super(geometry, materials);
		this.position.set(x, y, z);
		this.radius = radius;
		this.speed = 0;
		this.mul = isLeft ? -1 : 1;
		this.rotateX(Math.PI / 2);
		this.rotateZ((-1 * this.mul * Math.PI) / 2);
	}

	show(parent) {
		parent.add(this);
	}

	update(dt) {
		this.rotateY(this.speed * dt);
	}

	rotate(speed) {
		this.speed = (this.mul * speed) / this.radius;
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

	grabPiece(printer) {
		if (printer == null || printer.piece == null || this.piece != null) return false;
		const piecePosition = new Vector3();
		const platformPosition = new Vector3();
		printer.piece.localToWorld(piecePosition);
		this.lift.platform.localToWorld(platformPosition);
		const distance = piecePosition.distanceTo(platformPosition);
		if (distance > 5) return false;

		this.piece = printer.removePiece();
		this.piece.position.y = 0;
		this.piece.show(this.lift.platform);
		return true;
	}

	dropPiece() {
		this.lift.platform.remove(this.piece);
		this.piece = null;
	}
}
