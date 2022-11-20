import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A3 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, steps = 10, height = 10, radius = 3 }) {
		const medRad = radius * 0.7;
		const smallRad = radius * 0.2;
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.lineTo(radius, 0);
		shape.lineTo(smallRad, 0.15 * height);
		shape.lineTo(smallRad, 0.25 * height);
		shape.bezierCurveTo(medRad, 0.3 * height, medRad, 0.35 * height, medRad, 0.4 * height);
		shape.lineTo(medRad, 0.85 * height);
		shape.bezierCurveTo(medRad, 0.9 * height, radius * 0.35, 0.85 * height, smallRad, height);

		super({ shape, x, y, z, texture, steps, height });
	}
}
