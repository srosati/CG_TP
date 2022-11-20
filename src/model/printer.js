import {
	Object3D,
	CylinderGeometry,
	MeshPhysicalMaterial,
	Mesh,
	BoxGeometry,
	Shape,
	Vector2,
	TextureLoader,
	RepeatWrapping,
	SphereGeometry,
	MeshPhongMaterial,
	PointLight
} from 'three';

import Revolution from './revolution.js';

import '../maps/Marble03_1K_BaseColor.png';
import '../maps/Marble09_1K_BaseColor.png';
import '../maps/patron3.png';
import '../maps/Pattern02_1K_VarA.png';
import '../maps/Pattern05_1K_VarA.png';

class Body extends Revolution {
	constructor({ color, height, width, x, y, z }) {
		const halfH = height / 2;
		const radius = width / 2;
		const bevelHeight = 0.1 * height;
		const bevelTopWidth = 0.1 * width;
		const bevelDiagWidth = 0.05 * width;
		const points = [
			[-halfH, 0],
			[halfH - bevelHeight, 0],
			[halfH, bevelDiagWidth],
			[halfH, bevelDiagWidth + bevelTopWidth],
			[halfH - bevelHeight, 2 * bevelDiagWidth + bevelTopWidth],
			[halfH - bevelHeight, radius],
			[-halfH, radius],
			[-halfH, 0]
		];

		const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));
		super({
			shape,
			color,
			radius,
			rotation: [Math.PI / 2, 0, 0],
			x,
			y,
			z /*, material: MeshBasicMaterial*/
		});
	}
}

class Arm extends Mesh {
	constructor({ color, height, width, x, y, z }) {
		const geometry = new CylinderGeometry(0.2, 0.2, height * 2, 16);
		const material = new MeshPhysicalMaterial({ color: 0xccd7b6 });
		super(geometry, material);
		this.position.set(x, y, z);
		this.extruder = new Extruder({ color, height, width, x, y, z });
	}

	show(parent) {
		parent.add(this);
		this.extruder.show(this);
	}

	update(depth) {
		this.extruder.update(depth);
	}
}

class Extruder extends Mesh {
	constructor({ height, width }) {
		const cubeGeometry = new BoxGeometry(width, 0.1, width);
		const cubeMaterial = new MeshPhysicalMaterial({ color: 0xf1dcc9 });
		super(cubeGeometry, cubeMaterial);
		this.position.set(width / 2, height / 2, 0);
		this.extruderLights = [
			new ExtruderLight({ x: width/2, z: width/2 }),
			new ExtruderLight({ x: width/2, z: -width/2 }),
			new ExtruderLight({ x: -width/2, z: width/2 }),
			new ExtruderLight({ x: -width/2, z: -width/2 })
		];
	}

	show(parent) {
		parent.add(this);
		this.extruderLights.forEach((extruderLight) => extruderLight.show(this));
	}

	update(depth) {
		if (depth > 0) this.translateY(depth);
	}
}

class ExtruderLight extends Mesh {
	constructor({x, z }) {
		const sphereGeometry = new SphereGeometry(0.5, 32, 32);
		const sphereMaterial = new MeshPhongMaterial({
			emissive: 0xffffff,
			emissiveIntensity: 0.9, });
		super(sphereGeometry, sphereMaterial);
		this.position.set(x, 0, z);
		this.light = new PointLight( 0xffffff, 0.25, 30 );
		this.light.position.set( x, 0, z );
	}

	show(parent) {
		parent.add(this);
		parent.add(this.light);
	}

	update(depth) {
		if (depth > 0) this.translateY(depth);
	}
}

export default class Printer extends Object3D {
	constructor({ color, height, width, x, y, z }) {
		super();
		this.body = new Body({
			color: 0xc8b4aa,
			height: height,
			width: width,
			x: 0,
			y: 0,
			z: 0
		});
		this.arm = new Arm({
			color: 0xc8b4aa,
			height: height * 2,
			width: width,
			x: -0.4 * width,
			y: height * 2,
			z: 0
		});
		this.height = height;
		this.position.set(x, y, z);
	}

	show(parent) {
		this.body.show(this);
		this.arm.show(this);
		parent.add(this);
	}

	print(piece, options) {
		if (this.piece) return;

		const texture = new TextureLoader().load(options.texture);
		texture.wrapS = texture.wrapT = RepeatWrapping;
		texture.repeat.set(1.5, 1.5);
		texture.offset.set(0, 0);

		this.piece = new piece({ ...options, y: this.height / 2, texture: texture });

		this.piece.geometry.computeBoundingBox();

		this.updateDepth = true;

		this.arm.extruder.position.setY(-1.5 * this.height);

		this.piece.show(this);
	}

	update(dt) {
		if (this.piece && this.updateDepth != -1) {
			this.updateDepth = this.piece.update(dt);
			this.arm.update(this.updateDepth);
		}
	}

	removePiece() {
		if (this.piece == null) return null;
		this.remove(this.piece);
		const piece = this.piece;
		this.piece = null;
		return piece;
	}
}


