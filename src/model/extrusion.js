import { Shape, ExtrudeGeometry, Mesh, MeshPhysicalMaterial, Vector2 } from 'three';

export default class Extrusion extends Mesh {
	constructor({ color, shape, depth, rotation = [0, 0, 0], material = MeshPhysicalMaterial, x, y, z }) {
		const geometry = new ExtrudeGeometry(shape, {
			depth: depth,
			bevelEnabled: false,
			steps: 600
		});

		const mat = new material({ color: color });
		super(geometry, mat);
		this.position.set(x, y, z);
		this.rotateX(rotation[0]);
		this.rotateY(rotation[1]);
		this.rotateZ(rotation[2]);
	}

	show(parent) {
		parent.add(this);
	}
}
