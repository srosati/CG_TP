import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A3 extends RevolutionPiece {
	constructor({
		x = 0,
		y = 0,
		z = 0,
		color = 0xffffff,
		steps = 10,
		height = 10,
		radius = 3
	}) {
		const medRad = radius * 0.7;
		const smallRad = radius * 0.2;
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.lineTo(0, -radius);
		shape.lineTo(0.15 * height, -smallRad);
		shape.lineTo(0.25 * height, -smallRad);
		shape.bezierCurveTo(
			0.3 * height,
			-medRad,
			0.35 * height,
			-medRad,
			0.4 * height,
			-medRad
		);
		shape.lineTo(0.85 * height, -medRad);
		shape.bezierCurveTo(
			0.9 * height,
			-medRad,
			0.85 * height,
			-radius * 0.35,
			height,
			-smallRad
		);

		super({ shape, x, y, z, color, steps, radius: 0.00001 });
	}
}
