import Extrusion from '../../extrusion.js';

export default class ExtrusionPiece extends Extrusion {
	constructor({ x = 0, y = 0, z = 0, color, twist = 0, height = 10, shape }) {
		super({ shape, depth: 0, color, x, y, z, rotation: [-Math.PI / 2, 0, 0] });

		this.height = height;
		this.acc_height = 0;
		this.twist = twist;
		this.shape = shape;
		this.print_speed = 0.004;
	}

	update(dt) {
		if (this.acc_height >= this.height) return -1;

		let depth = this.print_speed * dt;
		if (this.acc_height + depth > this.height) depth = this.height - this.acc_height;

		if (depth > 0.1) {
			let res1 = this.update(dt / 2);
			if (res1 == -1) return -1;
			let res2 = this.update(dt / 2);
			if (res2 == -1) return -1;
			return res1 + res2;
		}

		const twist = (this.acc_height * this.twist) / this.height;

		const newPart = new Extrusion({
			shape: this.shape,
			depth: depth,
			z: this.acc_height,
			x: 0,
			y: 0,
			color: 0xffffff,
			rotation: [0, 0, twist]
		});

		this.acc_height += depth;

		newPart.show(this);
		return depth;
	}
}
