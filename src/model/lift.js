import { Object3D, BoxGeometry, MeshPhysicalMaterial, Mesh } from 'three';

class Bar extends Mesh {
	constructor({ color, width, height, length = width, x, y, z }) {
		const geometry = new BoxGeometry(width, height, length);
		const material = new MeshPhysicalMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
	}
}

class Platform extends Mesh {
	constructor(color, width, height, x, y, z, minHeight, maxHeight) {
		const geometry = new BoxGeometry(width, height, width);
		const material = new MeshPhysicalMaterial({ color: color });
		super(geometry, material);

		this.minHeight = minHeight;
		this.maxHeight = maxHeight;

		this.movementSpeed = height / 150;
		this.speed = 0;
		this.position.set(x, y, z);
	}

	update(dt) {
		if (
			(this.speed > 0 && this.position.y < this.maxHeight) ||
			(this.speed < 0 && this.position.y > this.minHeight)
		)
			this.translateY(this.speed * dt);
	}

	move(speed) {
		this.speed = speed;
	}

	moveUp() {
		this.move(this.movementSpeed);
	}

	moveDown() {
		this.move(-this.movementSpeed);
	}

	stop() {
		this.speed = 0;
	}
}

export default class Lift extends Object3D {
	constructor({
		height,
		barColor,
		barSeparation,
		barWidth,
		platformColor,
		platformWidth,
		x = 0,
		y = 0,
		z = 0
	}) {
		super();

		this.bar_l = new Bar({
			color: barColor,
			width: barWidth,
			height,
			x: -barSeparation / 2,
			y: height / 2,
			z: barWidth / 2
		});

		this.bar_r = new Bar({
			color: barColor,
			width: barWidth,
			height,
			x: barSeparation / 2,
			y: height / 2,
			z: barWidth / 2
		});

		const plankParams = {
			color: 0xb848ab,
			width: barSeparation + 2 * barWidth,
			height: height / 15,
			length: 1.4 * barWidth,
			x: 0,
			z: 0
		};

		this.planks = [
			new Bar({ ...plankParams, y: height / 2 }),
			new Bar({
				...plankParams,
				y: height / 10
			}),
			new Bar({
				...plankParams,
				y: 0.95 * height
			})
		];
		this.platform = new Platform(
			platformColor,
			platformWidth,
			height / 20,
			0,
			height / 2,
			(platformWidth + barWidth) / 2,
			0,
			height
		);
		this.position.set(x, y, z);
	}

	show(parent) {
		parent.add(this);
		this.planks.forEach((plank) => this.add(plank));
		this.add(this.bar_l);
		this.add(this.bar_r);
		this.add(this.platform);
	}

	update(dt) {
		this.platform.update(dt);
	}

	moveUp() {
		this.platform.moveUp();
	}

	moveDown() {
		this.platform.moveDown();
	}

	stop() {
		this.platform.stop();
	}
}
