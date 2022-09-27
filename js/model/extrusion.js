import { Shape, ExtrudeGeometry, Mesh, MeshNormalMaterial, Vector2 } from '../../../build/three.module.js';

export default class Extrusion extends Mesh {
	constructor({ color, shape, depth, rotation = [0, 0, 0], material = MeshNormalMaterial, x, y, z }) {
		// const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));
		const geometry = new ExtrudeGeometry(shape, {
			depth: depth,
			bevelEnabled: false
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
