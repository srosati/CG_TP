import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A2 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, color = 0xffffff, steps = 10, height = 10, radius = 3 }) {
		const bigRad = radius;
		const smallRad = radius * 0.9;
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.bezierCurveTo(0, -smallRad, height / 20, -smallRad, height / 10, -smallRad);
		shape.bezierCurveTo(height / 5, -smallRad, 0.5 * height, -radius / 2, 0.6 * height, -radius / 2);
		shape.bezierCurveTo(0.9 * height, -radius / 2, 0.85 * height, -bigRad, 0.9 * height, -bigRad);
		shape.bezierCurveTo(0.95 * height, -bigRad, 0.9 * height, -0.55 * radius, height, -0.55 * radius);

		super({ shape, x, y, z, color, steps, radius: 0.00001, height });
	}
}
