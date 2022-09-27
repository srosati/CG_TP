import {
	Object3D,
	CylinderGeometry,
	MeshBasicMaterial,
	Mesh,
	BoxGeometry,
	Shape,
	Vector2
} from '../../../build/three.module.js';

import Revolution from './revolution.js';

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
		super({ shape, color, radius, rotation: [Math.PI / 2, 0, 0], x, y, z /*, material: MeshBasicMaterial*/ });
	}
}

class Arm extends Mesh {
	constructor({ color, height, width, x, y, z }) {
		const geometry = new CylinderGeometry(0.2, 0.2, height * 2, 16);
		const material = new MeshBasicMaterial({ color: 0xccd7b6 });
		super(geometry, material);
		this.position.set(x, y, z);
		this.extruder = new Extruder({ color, height, width, x, y, z });
	}

	show(parent) {
		parent.add(this);
		this.extruder.show(this);
	}
}

class Extruder extends Mesh {
	constructor({ color, height, width }) {
		const cubeGeometry = new BoxGeometry(width, 0.1, width);
		const cubeMaterial = new MeshBasicMaterial({ color: 0xf1dcc9 });
		super(cubeGeometry, cubeMaterial);
		this.position.set(width / 2, height / 2, 0);
	}

	show(parent) {
		parent.add(this);
		this.add(this.cube);
	}
}

export default class Printer extends Object3D {
	constructor({ color, height, width, x, y, z }) {
		super();
		this.body = new Body({ color: 0xc8b4aa, height: height, width: width, x: 0, y: 0, z: 0 });
		this.arm = new Arm({ color: 0xc8b4aa, height: height * 2, width: width, x: -0.4 * width, y: height * 2, z: 0 });
		this.height = height;
		this.position.set(x, y, z);
	}

	show(parent) {
		this.body.show(this);
		this.arm.show(this);
		parent.add(this);
	}

	print(piece) {
		if (this.piece) return;

		this.piece = new piece({ y: this.height / 2, twist: 2 * Math.PI });
		this.piece.show(this);
	}

	update() {
		if (this.piece) {
			this.piece.update();
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