import { Shape } from 'three';

import ExtrusionPiece from './extrusion_piece.js';

export default class B1 extends ExtrusionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, twist = 0, width = 3, height = 5, steps = 200 }) {
		// Pill Shape
		const shortWidth = width / 4;
		const halfShort = shortWidth / 2;
		const longWidth = width - shortWidth;

		const shape = new Shape();
		shape.moveTo(-shortWidth, longWidth);
		shape.lineTo(-shortWidth, -longWidth);
		shape.bezierCurveTo(-shortWidth, -width + halfShort, -halfShort, -width, 0, -width);
		shape.bezierCurveTo(halfShort, -width, shortWidth, -width + halfShort, shortWidth, -longWidth);
		shape.lineTo(shortWidth, longWidth);
		shape.bezierCurveTo(shortWidth, width - halfShort, halfShort, width, 0, width);
		shape.bezierCurveTo(-halfShort, width, -shortWidth, width - halfShort, -shortWidth, longWidth);

		super({ shape, x, y, z, texture, twist, height, steps });
	}
}
