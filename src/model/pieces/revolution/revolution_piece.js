import Revolution from '../../revolution.js';

import { BufferAttribute, Plane, Vector3 } from 'three';
export default class RevolutionPiece extends Revolution {
	constructor({ shape, x = 0, y = 0, z = 0, texture, radius, height = 10 }) {
		super({
			shape,
			depth: 2 * Math.PI,
			texture,
			x,
			y,
			z,
			rotation: [Math.PI / 2, 0, 0],
			radius: Math.pow(10, -10)
		});

		this.height = height;
		this.radius = radius;
		this.shape = shape;
		this.acc_height = 0;
		this.print_speed = 0.01;

		const pos = new Vector3(0, 0, 0);
		this.getWorldPosition(pos);
		this.planeY = pos.y + y;

		this.clippingPlane = new Plane(new Vector3(0, -1, 0), this.planeY);
		this.material.clippingPlanes = [this.clippingPlane];
	}

	update(dt) {
		if (this.acc_height >= this.height) return -1;

		let depth = this.print_speed * dt;
		if (this.acc_height + depth > this.height) depth = this.height - this.acc_height;

		this.acc_height += depth;
		this.planeY += depth;

		this.clippingPlane.constant = this.planeY;

		return depth;
	}
}
