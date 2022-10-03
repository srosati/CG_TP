import Revolution from '../../revolution.js';

export default class RevolutionPiece extends Revolution {
	constructor({ shape, x = 0, y = 0, z = 0, color = 0xffffff, steps = 100, radius }) {
		super({ shape, depth: 0, color, x, y, z, rotation: [Math.PI / 2, 0, 0], radius });

		this.radius = radius;
		this.shape = shape;
		this.steps = steps;
		this.color = color;
		this.acc_depth = 0;
		this.print_speed = 0.004;
		// this.depth_step = (2 * Math.PI) / steps;
		// this.step = 0;
	}

	update(dt) {
		if (this.acc_depth >= 2 * Math.PI) return -1;

		let depth = this.print_speed * dt;
		if (this.acc_height + depth > this.height) depth = this.height - this.acc_height;

		if (depth > 0.1) {
			let res1 = this.update(dt / 2);
			if (res1 == -1) return -1;
			let res2 = this.update(dt / 2);
			if (res2 == -1) return -1;
			return 0;
		}

		const newPart = new Revolution({
			shape: this.shape,
			depth: depth,
			color: this.color,
			radius: this.radius,
			rotation: [0, 0, this.acc_depth]
		});

		this.acc_depth += depth;

		newPart.show(this);
		return 0;
	}
}
