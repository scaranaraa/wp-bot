import { JsonDB, Config } from 'node-json-db';
import users from './users.js';
import { type BaseUserClient, type BaseUserType } from '../types/baseuser.js';

const msgcountdb = new JsonDB(
	new Config('./src/commands/utils/msgreset.json', true, true, '/')
);

export default class baseuser implements BaseUserClient {
	constructor(options: { userId: string; users?: Map<string, BaseUserType> }) {
		this.userId = options?.userId;
		this.users = options?.users;
		this.currentUser = null;
		if (!this.checkCached()) this.cache();
	}

	userId: string;

	currentUser: BaseUserType;

	users: Map<string, BaseUserType>;

	checkBan() {
		const stat = this.users.get(this.userId).status;
		if (stat.ban || stat.blacklist) {
			return true;
		}

		return false;
	}

	async blacklist(reason = 'N/A', mod = 'owner') {
		this.users.get(this.userId).status.blacklist = true;
		await this.users.get(this.userId).status.logs.push({
			action: 'Blacklist',
			time: Date.now(),
			moderator: mod,
			reason,
		});
		const { userId } = this;
		await users.updateOne(
			{ userId },
			{
				$set: { status: this.users.get(this.userId).status },
			}
		);
	}

	async unBlacklist(reason = 'cute', mod = 'owner') {
		this.users.get(this.userId).status.blacklist = false;
		await this.users.get(this.userId).status.logs.push({
			action: 'Unblacklist',
			time: Date.now(),
			moderator: mod,
			reason,
		});
		const { userId } = this;
		await users.updateOne(
			{ userId },
			{
				$set: { status: this.users.get(this.userId).status },
			}
		);
	}

	async getstarter() {
		const { starter } = this.users.get(this.userId).pokedex;
		if (starter) {
			return starter;
		}

		return false;
	}

	async setstarter() {
		this.users.get(this.userId).pokedex.starter = true;
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { pokedex: this.users.get(this.userId).pokedex },
			}
		);
	}

	getInv() {
		return this.users.get(this.userId).inventory;
	}

	getxpboost() {
		return this.users.get(this.userId).xpboost;
	}

	async setxpboost(boost: number) {
		this.users.get(this.userId).xpboost = boost;
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { xpboost: this.users.get(this.userId).xpboost },
			}
		);
	}

	haveItem(name: string) {
		return this.getInv()
			.map((a: any) => a.name)
			.includes(name);
	}

	getItemAmount(item: string) {
		const foundItem = this.getInv().filter((a: any) => a.name == item)[0];
		if (foundItem) {
			return foundItem.amount;
		}
		return 0;
	}

	pull(array: any[], target: any) {
		return array.filter(a => a != target);
	}

	async addInv(item: string, amount: number) {
		amount = Number(amount);
		let user = this.getInv();
		const foundItem = user.find((a: any) => a.name == item);
		if (foundItem) {
			user = this.pull(user, foundItem);
			foundItem.amount = Number(foundItem.amount) + Number(amount);
			user.push(foundItem);
		} else {
			user.push({ name: item, amount });
		}

		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { inventory: user },
			}
		);
		this.users.get(this.userId).inventory = user;
		return user;
	}

	async getAmountOfItemInInv(item: string) {
		const user = await this.findOrCreate();
		const foundItem = await user.inventory.find(
			a => a.name.toLowerCase() == item
		);
		if (foundItem) {
			return foundItem.amount;
		}
		return 0;
	}

	async removeInv(item: string, amount: number) {
		amount = Number(amount);
		const user = await this.findOrCreate();
		const foundItem = user.inventory.find(a => a.name == item);
		if (!foundItem || amount > foundItem.amount) {
			throw new Error('User does not have this item or this amount of item');
		}

		if (foundItem) {
			// @ts-ignore
			await user.inventory.pull(foundItem);
			const amt = Number(foundItem.amount) - Number(amount);
			if (amt >= 1) {
				foundItem.amount = amt;
				await user.inventory.push(foundItem);
			}

			await user.save();
		}

		this.users.get(this.userId).inventory = user.inventory;
		return user;
	}

	getBalance() {
		return this.users.get(this.userId).balance;
	}

	async addCoins(amount: number) {
		if (!this.checkCached()) {
			const user = await this.cache();
			user.balance += amount;
			this.users.get(this.userId).balance = user.balance;
			this.saveCoins();
			return user.balance;
		}
		const user = this.users.get(this.userId);
		user.balance += amount;
		this.users.get(this.userId).balance = user.balance;
		this.saveCoins();
		return user.balance;
	}

	async saveCoins() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { balance: this.getBalance() },
			}
		);
	}

	async removeCoins(amount: number) {
		if (!this.checkCached()) {
			const user = await this.cache();
			user.balance -= amount;
			// await user.save()
			this.users.get(this.userId).balance = user.balance;
			this.saveCoins();
			// await this.users.set(this.userId, user)
			return user.balance;
		}
		const user = this.users.get(this.userId);
		user.balance -= amount;
		this.users.get(this.userId).balance = user.balance;
		this.saveCoins();
		return user.balance;
	}

	async selectpokemon(id: string) {
		this.users.get(this.userId).selected.push(id);
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { selected: this.users.get(this.userId).selected },
			}
		);
	}

	async removeselectedpokemon() {
		this.users.get(this.userId).selected.shift();
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { selected: this.users.get(this.userId).selected },
			}
		);
	}

	async getselectedpokemon() {
		return this.users.get(this.userId).selected;
	}

	async addpokemon(id: string, name: string) {
		this.users.get(this.userId).pokemon.set(id, name);
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { pokemon: this.users.get(this.userId).pokemon },
			}
		);
		const { next_idx } = this.users.get(this.userId);
		this.users.get(this.userId).next_idx = next_idx + 1;
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { next_idx: this.users.get(this.userId).next_idx },
			}
		);
	}

	getidx() {
		return this.users.get(this.userId).next_idx;
	}

	async findOrCreate() {
		const { userId } = this;
		let foundUser = await users.findOne({ userId });
		if (!foundUser) {
			foundUser = new users({ userId });
			await foundUser.save();
		}

		return foundUser;
	}

	clearCache() {
		this.users.delete(this.userId);
	}

	async getLb(type: 'msg' | 'cmd' | 'wins', cmdname?: string): Promise<any[]> {
		const list: any = [];
		this.users.forEach(user => {
			if (user.userId == `${process.env.PHONE}`) {
			} else if (type == 'msg') {
				list.push({
					name: user.userId,
					daily: user.msgcount.daily,
					weekly: user.msgcount.weekly,
					monthly: user.msgcount.monthly,
					total: user.msgcount.total,
				});
			} else if (type == 'cmd') {
				list.push({
					name: user.userId,
					cmd: user.commands.get(cmdname) || 0,
				});
			} else if (type == 'wins') {
				list.push({
					name: user.userId,
					wordle: user.wordle,
					hangman: user.hangman,
					blacktea: user.blacktea,
					greentea: user.greentea,
					yellowtea: user.yellowtea,
					redtea: user.redtea,
					pinktea: user.pinktea,
					trivia: user.trivia,
					typerace: user.typerace,
					puzzleELO: user.puzzleELO,
					crossword: user.crossword,
				});
			}
		});
		return list;
	}

	async cache() {
		let foundUser = this.users?.get(this.userId);
		if (!this.users) this.users = new Map();
		const data = await this.findOrCreate();
		if (!foundUser) {
			// @ts-ignore
			foundUser = this.users.set(this.userId, data);
		}

		return data;
	}

	checkCached() {
		return this.users?.get(this.userId);
	}

	addWordle() {
		const winAmt = this.users.get(this.userId).wordle;
		this.users.get(this.userId).wordle = winAmt + 1;
		this.editWordle();
	}

	async addCommand(name: string) {
		const amt = this.users.get(this.userId).commands.get(name);
		const globalamt = this.users.get(`${process.env.PHONE}`).commands.get(name);

		this.users.get(this.userId).commands.set(name, amt ? amt + 1 : 1);
		this.users
			.get(`${process.env.PHONE}`)
			.commands.set(name, globalamt ? globalamt + 1 : 1);

		await users.updateOne(
			{ userId: `${process.env.PHONE}` },
			{
				$set: { commands: this.users.get(`${process.env.PHONE}`).commands },
			}
		);
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { commands: this.users.get(this.userId).commands },
			}
		);
	}

	async addmsg() {
		this.users.get(this.userId).msgcount.daily++;
		this.users.get(`${process.env.PHONE}`).msgcount.daily++;
		this.users.get(this.userId).msgcount.weekly++;
		this.users.get(`${process.env.PHONE}`).msgcount.weekly++;
		this.users.get(this.userId).msgcount.monthly++;
		this.users.get(`${process.env.PHONE}`).msgcount.monthly++;
		this.users.get(this.userId).msgcount.total++;
		this.users.get(`${process.env.PHONE}`).msgcount.total++;

		if (this.users.get(this.userId).msgcount.toadd) {
			console.log(`New user added! ${this.userId}`);
			await msgcountdb.push('/users[]', this.userId);
		}
		this.users.get(this.userId).msgcount.toadd = false;

		await users.updateOne(
			{ userId: `${process.env.PHONE}` },
			{
				$set: { msgcount: this.users.get(`${process.env.PHONE}`).msgcount },
			}
		);
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { msgcount: this.users.get(this.userId).msgcount },
			}
		);
	}

	async resetmsg(type: 'daily' | 'monthly' | 'weekly') {
		if (type == 'daily') {
			this.users.get(this.userId).msgcount.daily = 0;
			await users.updateOne(
				{ userId: this.userId },
				{
					$set: { msgcount: this.users.get(this.userId).msgcount },
				}
			);
		}
		if (type == 'weekly') {
			this.users.get(this.userId).msgcount.daily = 0;
			this.users.get(this.userId).msgcount.weekly = 0;
			await users.updateOne(
				{ userId: this.userId },
				{
					$set: { msgcount: this.users.get(this.userId).msgcount },
				}
			);
		}
		if (type == 'monthly') {
			this.users.get(this.userId).msgcount.daily = 0;
			this.users.get(this.userId).msgcount.weekly = 0;
			this.users.get(this.userId).msgcount.monthly = 0;
			await users.updateOne(
				{ userId: this.userId },
				{
					$set: { msgcount: this.users.get(this.userId).msgcount },
				}
			);
		}
	}

	async editWordle() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { wordle: this.users.get(this.userId).wordle },
			}
		);
	}

	addHangman() {
		const winAmt = this.users.get(this.userId).hangman;
		this.users.get(this.userId).hangman = winAmt + 1;
		this.editHangman();
	}

	async editHangman() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { hangman: this.users.get(this.userId).hangman },
			}
		);
	}

	addUno() {
		const winAmt = this.users.get(this.userId).uno;
		this.users.get(this.userId).uno = winAmt + 1;
		this.editUno();
	}

	async editUno() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { uno: this.users.get(this.userId).uno },
			}
		);
	}

	addBlacktea() {
		const winAmt = this.users.get(this.userId).blacktea;
		this.users.get(this.userId).blacktea = winAmt + 1;
		this.editBlacktea();
	}

	async editBlacktea() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { blacktea: this.users.get(this.userId).blacktea },
			}
		);
	}

	addGreentea() {
		const winAmt = this.users.get(this.userId).greentea;
		this.users.get(this.userId).greentea = winAmt + 1;
		this.editGreentea();
	}

	async editGreentea() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { greentea: this.users.get(this.userId).greentea },
			}
		);
	}

	addCrossword() {
		const winAmt = this.users.get(this.userId).crossword;
		this.users.get(this.userId).crossword = winAmt + 1;
		this.editCrossword();
	}

	async editCrossword() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { crossword: this.users.get(this.userId).crossword },
			}
		);
	}

	addRedtea() {
		const winAmt = this.users.get(this.userId).redtea;
		this.users.get(this.userId).redtea = winAmt + 1;
		this.editRedtea();
	}

	async editRedtea() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { redtea: this.users.get(this.userId).redtea },
			}
		);
	}

	addPinktea() {
		const winAmt = this.users.get(this.userId).pinktea;
		this.users.get(this.userId).pinktea = winAmt + 1;
		this.editPinktea();
	}

	async editPinktea() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { pinktea: this.users.get(this.userId).pinktea },
			}
		);
	}

	addTrivia() {
		const winAmt = this.users.get(this.userId).trivia;
		this.users.get(this.userId).trivia = winAmt + 1;
		this.editTrivia();
	}

	async editTrivia() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { trivia: this.users.get(this.userId).trivia },
			}
		);
	}

	addYellowtea() {
		const winAmt = this.users.get(this.userId).yellowtea;
		this.users.get(this.userId).yellowtea = winAmt + 1;
		this.editYellowtea();
	}

	async editYellowtea() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { yellowtea: this.users.get(this.userId).yellowtea },
			}
		);
	}

	addTyperace() {
		const winAmt = this.users.get(this.userId).typerace;
		this.users.get(this.userId).typerace = winAmt + 1;
		this.editTyperace();
	}

	async editTyperace() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { typerace: this.users.get(this.userId).typerace },
			}
		);
	}

	setWPM(wpm: number) {
		this.users.get(this.userId).wpm = wpm;
		this.saveWPM();
	}

	async saveWPM() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { wpm: this.users.get(this.userId).wpm },
			}
		);
	}

	addELO(wpm: number) {
		const winAmt = this.users.get(this.userId).ELO;
		this.users.get(this.userId).ELO = winAmt + wpm;
		this.saveELO();
	}

	async saveELO() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { ELO: this.users.get(this.userId).ELO },
			}
		);
	}

	setPuzzleELO(wpm: number) {
		const winAmt = this.users.get(this.userId).puzzleELO;
		this.users.get(this.userId).puzzleELO = winAmt + wpm;
		this.savePuzzleELO();
	}

	async savePuzzleELO() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { puzzleELO: this.users.get(this.userId).puzzleELO },
			}
		);
	}

	setWChain(wpm: number) {
		const winAmt = this.users.get(this.userId).wchain;
		this.users.get(this.userId).wchain = winAmt;
		this.saveWChain();
	}

	async saveWChain() {
		await users.updateOne(
			{ userId: this.userId },
			{
				$set: { wchain: this.users.get(this.userId).wchain },
			}
		);
	}
}
