import { Shape } from '../../../../../build/three.module.js';

import ExtrusionPiece from './extrusion_piece.js';

export default class B2 extends ExtrusionPiece {
	constructor({ x = 0, y = 0, z = 0, color, twist = 0, width = 5, height = 5, steps = 200 }) {
		const halfSide = width / 2;
		const shortSide = width / 4;
		const halfShortSide = shortSide / 2;
		const shape = new Shape();
		shape.moveTo(-halfSide + shortSide, -halfShortSide);
		shape.lineTo(-halfSide, -halfShortSide);
		shape.bezierCurveTo(-halfSide, -halfSide, -halfSide, -halfSide, -halfShortSide, -halfSide);
		shape.lineTo(-halfShortSide, -halfSide + shortSide);
		shape.lineTo(halfShortSide, -halfSide + shortSide);
		shape.lineTo(halfShortSide, -halfSide);
		shape.bezierCurveTo(halfSide, -halfSide, halfSide, -halfSide, halfSide, -halfShortSide);
		shape.lineTo(halfSide - shortSide, -halfShortSide);
		shape.lineTo(halfSide - shortSide, halfShortSide);
		shape.lineTo(halfSide, halfShortSide);
		shape.bezierCurveTo(halfSide, halfSide, halfSide, halfSide, halfShortSide, halfSide);
		shape.lineTo(halfShortSide, halfSide - shortSide);
		shape.lineTo(-halfShortSide, halfSide - shortSide);
		shape.lineTo(-halfShortSide, halfSide);
		shape.bezierCurveTo(-halfSide, halfSide, -halfSide, halfSide, -halfSide, halfShortSide);
		shape.lineTo(-halfSide + shortSide, halfShortSide);
		shape.lineTo(-halfSide + shortSide, -halfShortSide);

		super({ shape, x, y, z, color, twist, height, steps });
	}
}
