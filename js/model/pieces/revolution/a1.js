import { Shape } from '../../../../../build/three.module.js';

import RevolutionPiece from './revolution_piece.js';

export default class A1 extends RevolutionPiece {
	constructor({ x = 0, y = 10, z = 0, color = 0xffffff, steps = 10 }) {
		const rad = 3;
		const shape = new Shape();

		const rad_a = -rad * 0.35;
		const rad_b = -rad * 0.7;
		shape.moveTo(0, 0);
		shape.lineTo(0, -rad);
		shape.lineTo(1, -rad);
		shape.bezierCurveTo(2, -rad, 1, rad_a, 2, rad_a);
		shape.bezierCurveTo(3, rad_a, 4, rad_b, 5, rad_b);
		shape.bezierCurveTo(6, rad_b, 7, rad_a, 8, rad_a);
		shape.bezierCurveTo(9, rad_a, 8, -rad, 9, -rad);
		shape.lineTo(10, -rad);
		shape.lineTo(10, 0);

		super({ shape, x, y: 15, z, color, steps, radius: 0.001 });
	}
}
