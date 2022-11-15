import Extrusion from '../../extrusion.js';

import { Vector3, Quaternion, Plane } from 'three';

export default class ExtrusionPiece extends Extrusion {
	constructor({ x = 0, y = 0, z = 0, texture, twist = 0, height = 10, shape }) {
		console.log(texture);
		super({ shape, depth: height, x, y, z, rotation: [-Math.PI / 2, 0, 0], texture });

		this.height = height;
		this.acc_height = 0;
		this.twist = twist;
		this.shape = shape;
		this.print_speed = 0.004;

		const pos = new Vector3(0, 0, 0);
		this.getWorldPosition(pos);
		this.planeY = pos.y + y;

		this.clippingPlane = new Plane(new Vector3(0, -1, 0), this.planeY);
		this.material.clippingPlanes = [this.clippingPlane];
		this.twistMesh();
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

	twistMesh() {
		this.vertices = this.geometry.attributes.position.array;
		const quaternion = new Quaternion();
		const upVec = new Vector3(0, 0, 1);

		let maxZ = 0;
		for (let i = 2; i < this.vertices.length; i += 3) if (this.vertices[i] > maxZ) maxZ = this.vertices[i];

		for (let i = 0; i < this.vertices.length; i += 3) {
			let x = this.vertices[i];
			let y = this.vertices[i + 1];
			let z = this.vertices[i + 2];

			const angle = this.twist * (z / maxZ);
			quaternion.setFromAxisAngle(upVec, angle);

			const vector = new Vector3(x, y, z);
			vector.applyQuaternion(quaternion);

			this.vertices[i] = vector.x;
			this.vertices[i + 1] = vector.y;
			this.vertices[i + 2] = vector.z;
		}

		// tells Three.js to re-render this mesh
		this.geometry.verticesNeedUpdate = true;
		this.geometry.computeVertexNormals();
	}
}
