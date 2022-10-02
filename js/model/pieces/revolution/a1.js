import { Shape } from '../../../../../build/three.module.js';

import RevolutionPiece from './revolution_piece.js';

export default class A1 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, color = 0xffffff, steps = 10, height = 10, radius = 3 }) {
		console.log(height);
		const rad = radius;
		const shape = new Shape();

		const h10 = height / 10;
		const h5 = height / 5;
		const rad_a = -rad * 0.35;
		const rad_b = -rad * 0.7;
		shape.moveTo(0, 0);
		shape.lineTo(0, -rad);
		shape.lineTo(h10, -rad);
		shape.bezierCurveTo(h5, -rad, h10, rad_a, h5, rad_a);
		shape.bezierCurveTo(3 * h10, rad_a, 2 * h5, rad_b, height / 2, rad_b);
		shape.bezierCurveTo(3 * h5, rad_b, 7 * h10, rad_a, 4 * h5, rad_a);
		shape.bezierCurveTo(9 * h10, rad_a, 4 * h5, -rad, 9 * h10, -rad);
		shape.lineTo(height, -rad);
		shape.lineTo(height, 0);

		super({ shape, x, y, z, color, steps, radius: 0.00001 });
	}
}
