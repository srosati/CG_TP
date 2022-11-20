import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A2 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, steps = 10, height = 10, radius = 3 }) {
		const bigRad = radius;
		const smallRad = radius * 0.9;
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.bezierCurveTo(smallRad, 0, smallRad, height / 20, smallRad, height / 10);
		shape.bezierCurveTo(smallRad, height / 5, radius / 2, 0.5 * height, radius / 2, 0.6 * height);
		shape.bezierCurveTo(radius / 2, 0.9 * height, bigRad, 0.85 * height, bigRad, 0.9 * height);
		shape.bezierCurveTo(bigRad, 0.95 * height, 0.55 * radius, 0.9 * height, 0.55 * radius, height);

		super({ shape, x, y, z, texture, steps, height });
	}
}
