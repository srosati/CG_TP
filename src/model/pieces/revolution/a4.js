import { Shape } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A3 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, steps = 10, height = 10, radius = 3 }) {
		const shape = new Shape();

		shape.moveTo(0, 0);
		shape.lineTo(0.4 * radius, 0);
		shape.bezierCurveTo(0.6 * radius, 0, 0.6 * radius, 0, 0.6 * radius, 0.15 * height);
		shape.bezierCurveTo(0.6 * radius, 0.25 * height, 0.25 * radius, 0.2 * height, 0.25 * radius, 0.4 * height);
		shape.bezierCurveTo(0.25 * radius, 0.5 * height, 0.25 * radius, 0.55 * height, radius, 0.6 * height);
		shape.bezierCurveTo(0.5 * radius, 0.65 * height, 0.5 * radius, 0.7 * height, 0.5 * radius, 0.7 * height);
		shape.bezierCurveTo(0.5 * radius, 0.8 * height, 0.5 * radius, height, 0, height);

		super({ shape, x, y, z, texture, steps, height });
	}
}
