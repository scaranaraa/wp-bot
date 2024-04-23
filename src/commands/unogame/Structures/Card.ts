import { type CardBase } from '../../../types/unotypes.js';

export default class Card implements CardBase {
	constructor(id: string, color?: string) {
		this.id = id;
		this.wild = false;
		this.color = color;
		if (!this.color) {
			this.wild = true;
		}
	}

	id: string;

	wild: boolean;

	color: string;

	get colorName() {
		return {
			R: 'Red',
			Y: 'Yellow',
			G: 'Green',
			B: 'Blue',
		}[this.color];
	}

	get colorCode() {
		return (
			{
				R: 0xff5555,
				Y: 0xffaa00,
				G: 0x55aa55,
				B: 0x5555ff,
			}[this.color] || 0x080808
		);
	}

	get URL() {
		return `https://raw.githubusercontent.com/Ratismal/UNO/master/cards/${this.color || ''}${this.id}.png`;
	}

	get value() {
		let val = 0;
		switch (this.color) {
			case 'R':
				val += 100000;
				break;
			case 'Y':
				val += 10000;
				break;
			case 'G':
				val += 1000;
				break;
			case 'B':
				val += 100;
				break;
			default:
				val += 1000000;
				break;
		}

		switch (this.id) {
			case 'SKIP':
				val += 10;
				break;
			case 'REVERSE':
				val += 11;
				break;
			case '+2':
				val += 12;
				break;
			case 'WILD':
				val += 13;
				break;
			case 'WILD+4':
				val += 14;
				break;
			case 'WILDSWAPHANDS':
				val += 15;
				break;
			default:
				val += parseInt(this.id);
				break;
		}

		return val;
	}

	toString() {
		if (this.color) {
			return `${this.colorName} ${this.id}`;
		}
		return this.id;
	}
}
