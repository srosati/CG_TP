import { Shape, ExtrudeGeometry, Mesh, MeshNormalMaterial, Vector2, Vector3, Curve } from '../../../build/three.module.js';



export default class Revolution extends Mesh {
    constructor({ color, points, radius, rotation = [0,0,0], material = MeshNormalMaterial, x, y, z }) {
		const shape = new Shape(points.map((point) => new Vector2(point[0], point[1])));

        const path = new Curve();
        path.getPoint = function (t) {
            const angle =  2 * Math.PI * t;
            return new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0);
        };

        const geometry = new ExtrudeGeometry(shape, {
			steps: 16,
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