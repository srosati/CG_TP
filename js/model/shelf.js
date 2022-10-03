import { MeshBasicMaterial, Mesh, Object3D, BoxGeometry, Vector2, Vector3 } from '../../../build/three.module.js';

class Bar extends Mesh {
	constructor(color, width, height, x, y, z) {
		const geometry = new BoxGeometry(width, height, width);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
	}
}

class Rack extends Mesh {
	constructor(color, width, height, depth, x, y, z) {
		const geometry = new BoxGeometry(width, height, depth);
		const material = new MeshBasicMaterial({ color: color });
		super(geometry, material);
		this.position.set(x, y, z);
	}
}

export default class Shelf extends Object3D {
	bars_qty = 9;
	racks_qty = 3;
	pieces_qty = 18;

	constructor({ color, width, height, depth, x, y, z }) {
		super();

		this.bars = [];
		this.racks = [];
		this.pieces = [];

		this.width = width;
		this.height = height;
		this.depth = depth;

		this.generateBars(height, width, depth, x, y, z);
		this.generateRacks(height, width, depth, x, y, z);
		this.position.set(x, y, z);

		this.generatePiecePositions(height, width, depth, x, y, z);
		//this._rotation = -Math.PI / 2;
		//this.rotateY(this._rotation);
	}

	show(parent) {
		parent.add(this);
		for (let i = 0; i < this.bars_qty * 2; i++) {
			this.add(this.bars[i]);
		}
		for (let i = 0; i < this.racks_qty; i++) {
			this.add(this.racks[i]);
		}

		for (let i = 0; i < this.pieces_qty; i++) {
			if (this.pieces[i]) this.add(this.pieces[i]);
		}
	}

	generateBars(height, width, depth, x, y, z) {
		for (let i = 0; i < this.bars_qty; i++) {
			this.bars.push(new Bar(0xc8da49, 0.5, height, (i * width) / 8, height / 2, 0));
			this.bars.push(new Bar(0xc8da49, 0.5, height, (i * width) / 8, height / 2, depth));
		}
	}

	generateRacks(height, width, depth, x, y, z) {
		for (let i = 0; i < this.racks_qty; i++) {
			this.racks.push(
				new Rack(
					0xa7fff1,
					width + 2,
					0.1,
					depth + 2,
					width / 2,
					(i * height) / 3 + height / 3 - 0.5,
					depth / 2
				)
			);
		}
	}

	generatePiecePositions(height, width, depth) {
		this.piecePositions = []
		for (let i = 0; i < this.pieces_qty; i++) {
			const shelfPosition = new Vector3((i % 8) * width / 8 + width / 16, (1 + Math.floor(i / 8)) * height / 3 - 0.5, depth / 2);
			this.piecePositions.push(shelfPosition);
		}
		
	}

	addPiece(piece) {
		let minDist = Infinity;
		let minIndex = -1;
		for (let i = 0; i < this.pieces_qty; i++) {
			if (this.pieces[i] == null) {
				const piecePosition = new Vector3();
				piece.localToWorld(piecePosition);
				console.log("piece" , piecePosition);
				const shelfPosition = new Vector3();
				this.localToWorld(shelfPosition);
				shelfPosition.add(this.piecePositions[i]);
				const dist = piecePosition.distanceTo(shelfPosition);
				if (dist < minDist) {
					console.log(dist);
					minDist = dist;
					minIndex = i;
				}
			}
		}

		if (minDist < 5) {
			this.pieces[minIndex] = piece;
			piece.position.set(this.piecePositions[minIndex].x, this.piecePositions[minIndex].y, this.piecePositions[minIndex].z);
			piece.show(this);
			return true;
		}

		return false;
	}
}
