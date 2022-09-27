import Revolution from '../../revolution.js';

export default class RevolutionPiece extends Revolution {
	constructor({ shape, x = 0, y = 0, z = 0, color = 0xffffff, steps = 100, radius }) {
		super({ shape, depth: 0, color, x, y, z, rotation: [-Math.PI / 2, 0, 0], radius });

		this.radius = radius;
		this.shape = shape;
		this.steps = steps;
		this.depth_step = (2 * Math.PI) / steps;
		this.step = 0;
	}

	update() {
		if (this.step >= this.steps) return;

		this.step++;
		const newPart = new Revolution({
			shape: this.shape,
			depth: this.depth_step,
			color: 0xffffff,
			radius: this.radius,
			rotation: [0, 0, this.depth_step * this.step]
		});

		newPart.show(this);
	}
}
