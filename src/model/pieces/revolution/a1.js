import { LatheGeometry, Shape, Mesh, Plane, MeshPhysicalMaterial, Vector3 } from 'three';

import RevolutionPiece from './revolution_piece.js';

export default class A1 extends RevolutionPiece {
	constructor({ x = 0, y = 0, z = 0, texture, steps = 10, height = 10, radius = 3 }) {
		const rad = radius;
		const shape = new Shape();

		const h10 = height / 10;
		const h5 = height / 5;
		const rad_a = rad * 0.4;
		const rad_b = rad * 0.7;
		shape.moveTo(0, 0);
		shape.lineTo(rad, 0);
		shape.lineTo(rad, h10);
		shape.bezierCurveTo(rad, h5, rad_a, h10, rad_a, h5);
		shape.bezierCurveTo(rad_a, 3 * h10, rad_b, 2 * h5, rad_b, height / 2);
		shape.bezierCurveTo(rad_b, 3 * h5, rad_a, 7 * h10, rad_a, 4 * h5);
		shape.bezierCurveTo(rad_a, 9 * h10, rad, 4 * h5, rad, 9 * h10);
		shape.lineTo(rad, height);
		shape.lineTo(0, height);

		super({ shape, x, y, z, texture, steps, height });
		// const points = shape.getSpacedPoints(256);
		// const geometry = new LatheGeometry(points, 256);

		// const material = new MeshPhysicalMaterial({ map: texture });
		// super(geometry, material);

		// this.position.set(x, y, z);
		// this.height = height;
		// this.radius = radius;
		// this.shape = shape;
		// this.acc_height = 0;
		// this.print_speed = 0.01;

		// const pos = new Vector3(0, 0, 0);
		// this.getWorldPosition(pos);
		// this.planeY = pos.y + y;

		// this.clippingPlane = new Plane(new Vector3(0, -1, 0), this.planeY);
		// this.material.clippingPlanes = [this.clippingPlane];
	}
}
