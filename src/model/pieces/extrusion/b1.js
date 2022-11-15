import { Shape } from 'three';

import ExtrusionPiece from './extrusion_piece.js';

export default class B1 extends ExtrusionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, twist = 0, sideLen = 5, height = 10, steps = 100 }) {
		// Triangle Shape
		const h = (Math.sqrt(3) * sideLen) / 2;
		const shape = new Shape();
		shape.moveTo(-sideLen / 2, -h / 3);
		shape.lineTo(0, (2 * h) / 3);
		shape.lineTo(sideLen / 2, -h / 3);
		shape.lineTo(-sideLen / 2, -h / 3);

		super({ shape, x, y, z, texture, twist, height, steps });
	}
}
