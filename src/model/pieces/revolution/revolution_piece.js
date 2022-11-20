import Revolution from '../../revolution.js';

import { BufferAttribute, Mesh, Plane, Vector3, LatheGeometry, MeshPhysicalMaterial } from 'three';
export default class RevolutionPiece extends Mesh {
	constructor({ shape, x = 0, y = 0, z = 0, texture, radius, height = 10 }) {
		const points = shape.getSpacedPoints(256);
		const geometry = new LatheGeometry(points, 256);

		const material = new MeshPhysicalMaterial({ map: texture });
		super(geometry, material);
		this.position.set(x, y, z);

		this.height = height;
		this.radius = radius;
		this.shape = shape;
		this.acc_height = 0;
		this.print_speed = 0.006;

		const pos = new Vector3(0, 0, 0);
		this.getWorldPosition(pos);
		this.planeY = pos.y + y;

		this.clippingPlane = new Plane(new Vector3(0, -1, 0), this.planeY);
		this.material.clippingPlanes = [this.clippingPlane];
	}

	update(dt) {
		if (this.acc_height >= this.height) {
			this.material.clippingPlanes = [];
			return -1;
		}

		let depth = this.print_speed * dt;
		if (this.acc_height + depth > this.height) depth = this.height - this.acc_height;

		this.acc_height += depth;
		this.planeY += depth;

		this.clippingPlane.constant = this.planeY;

		return depth;
	}

	show(parent) {
		parent.add(this);
	}
}
