import Extrusion from '../../extrusion.js';

export default class ExtrusionPiece extends Extrusion {
	constructor({ x = 0, y = 0, z = 0, color, twist = 0, height = 10, shape, steps = 100 }) {
		super({ shape, depth: 0, color, x, y, z, rotation: [-Math.PI / 2, 0, 0] });

		this.height = height;
		this.shape = shape;
		this.steps = steps;
		this.depth_step = height / steps;
		this.twist_step = twist / steps;
		this.step = 0;
	}

	update() {
		if (this.step >= this.steps) return;

		this.step++;
		const newPart = new Extrusion({
			shape: this.shape,
			depth: this.depth_step,
			z: this.depth_step * this.step,
			x: 0,
			y: 0,
			color: 0xffffff,
			rotation: [0, 0, this.twist_step * this.step]
		});

		newPart.show(this);
	}
}
