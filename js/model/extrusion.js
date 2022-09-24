import { Shape, ExtrudeGeometry, Mesh, MeshNormalMaterial, Vector2 } from '../../../build/three.module.js';

export default class Extrusion extends Mesh {
	constructor({ color, points, depth, rotation, material = MeshNormalMaterial, x, y, z }) {
		const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));
		const geometry = new ExtrudeGeometry(shape, {
			depth: depth,
			bevelEnabled: false
		});

		const mat = new material({ color: color });
		super(geometry, mat);
		this.rotateX(rotation[0]);
		this.rotateY(rotation[1]);
		this.rotateZ(rotation[2]);
		this.position.set(x, y, z);
	}

	show(parent) {
		parent.add(this);
	}
}
