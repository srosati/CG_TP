import Extrusion from '../../extrusion.js';

import { Vector3, Quaternion, Plane } from 'three';

export default class ExtrusionPiece extends Extrusion {
	constructor({ x = 0, y = 0, z = 0, texture, twist = 0, height = 10, shape }) {
		super({ shape, depth: height, x, y, z, rotation: [-Math.PI / 2, 0, 0], texture });

		this.height = height;
		this.acc_height = 0;
		this.twist = twist;
		this.shape = shape;
		this.print_speed = 0.006;

		const pos = new Vector3(0, 0, 0);
		this.getWorldPosition(pos);
		this.planeY = pos.y + y;

		this.clippingPlane = new Plane(new Vector3(0, -1, 0), this.planeY);
		this.material.clippingPlanes = [this.clippingPlane];
		this.doneTwisting = false;
		this.twistMesh();
	}

	update(dt) {
		if (this.acc_height >= this.height) {
			this.material.clippingPlanes = [];
			return -1;
		}
		
		if (!this.doneTwisting) return 0;

		let depth = this.print_speed * dt;
		if (this.acc_height + depth > this.height) depth = this.height - this.acc_height;

		this.acc_height += depth;

		this.planeY += depth;

		this.clippingPlane.constant = this.planeY;

		return depth;
	}

	twistMesh() {
		const vertices = this.geometry.getAttribute( 'position' );
		console.log(vertices);
		const quaternion = new Quaternion();
		const upVec = new Vector3(0, 0, 1);

		let maxZ = 0;
		for (let i = 0; i < vertices.count; i ++) {
			if (vertices.getZ(i) > maxZ) 
				maxZ = vertices.getZ(i);
		}

		for (let i = 0; i < vertices.count; i++) {
			let x = vertices.getX(i);
			let y = vertices.getY(i);
			let z = vertices.getZ(i);

			const angle = this.twist * (z / maxZ);
			quaternion.setFromAxisAngle(upVec, angle);

			const vector = new Vector3(x, y, z);
			vector.applyQuaternion(quaternion);

			vertices.setXYZ(i, vector.x, vector.y, vector.z);
		}

		// tells Three.js to re-render this mesh
		this.geometry.computeVertexNormals();
		this.geometry.attributes.position.needsUpdate = true
		this.doneTwisting = true;
	}
}
