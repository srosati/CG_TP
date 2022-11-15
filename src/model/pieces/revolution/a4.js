import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A3 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, color = 0xffffff, steps = 10, height = 10, radius = 3 }) {
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.lineTo(0, -0.4 * radius);
		shape.bezierCurveTo(0, -0.6 * radius, 0, -0.6 * radius, 0.15 * height, -0.6 * radius);
		shape.bezierCurveTo(0.25 * height, -0.6 * radius, 0.2 * height, -0.25 * radius, 0.4 * height, -0.25 * radius);
		shape.bezierCurveTo(0.5 * height, -0.25 * radius, 0.55 * height, -0.25 * radius, 0.6 * height, -radius);
		shape.bezierCurveTo(0.65 * height, -0.5 * radius, 0.7 * height, -0.5 * radius, 0.7 * height, -0.5 * radius);
		shape.bezierCurveTo(0.8 * height, -0.5 * radius, height, -0.5 * radius, height, 0);

		super({ shape, x, y, z, color, steps, radius: 0.00001, height });
	}
}
