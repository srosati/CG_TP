import {
	Shape,
	ExtrudeGeometry,
	Mesh,
	MeshNormalMaterial,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	Vector2,
	Vector3,
	Curve
} from 'three';

export default class Revolution extends Mesh {
	constructor({
		color,
		shape,
		radius,
		rotation = [0, 0, 0],
		material = MeshPhysicalMaterial,
		x = 0,
		y = 0,
		z = 0,
		depth = 2 * Math.PI
	}) {
		const path = new Curve();
		path.getPoint = function (t) {
			const angle = depth * t;
			return new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0);
		};

		const geometry = new ExtrudeGeometry(shape, {
			steps: 32,
			extrudePath: path
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
