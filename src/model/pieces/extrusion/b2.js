import { Shape } from 'three';

import ExtrusionPiece from './extrusion_piece.js';

export default class B2 extends ExtrusionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, twist = 0, width = 5, height = 10, steps = 500 }) {
		// Star Shape
		const rad = width / 2;
		const offsetRad = rad / 4;
		const shape = new Shape();

		const pointCount = 7;
		const angle = (2 * Math.PI) / pointCount;
		shape.moveTo(rad, 0);

		let prevX = rad;
		let prevY = 0;

		for (let i = 1; i <= pointCount; i++) {
			let newX = rad * Math.cos(angle * i);
			let newY = rad * Math.sin(angle * i);

			let avgAngle = (angle * (2 * i - 1)) / 2;
			let cpX = offsetRad * Math.cos(avgAngle);
			let cpY = offsetRad * Math.sin(avgAngle);

			shape.bezierCurveTo(cpX, cpY, cpX, cpY, newX, newY);
			prevX = newX;
			prevY = newY;
		}

		super({ shape, x, y, z, texture, twist, height, steps });
	}
}
