import { writeFile } from 'fs';
import pkg from 'whatsapp-web.js';
import Jimp from 'jimp';
import client from '../../../index.js';
import {
	type MonopolyCard,
	type MonopolyGame,
	type MonopolyOffer,
	type MonopolyPlayer,
	type MonopolyProperty,
} from '../../types/monopolytypes.js';

const { Client, LocalAuth, MessageMedia } = pkg;

class Card implements MonopolyCard {
	constructor(
		Text: string,
		Money: number,
		GetOutOfJail: boolean,
		MoveTo: number | undefined,
		CollectFromPlayers: boolean
	) {
		this.Text = Text; // what it says on the card
		this.Money = Money; // change in money
		this.GetOutOfJail = GetOutOfJail; // if its get out of jail
		this.MoveTo = MoveTo; // what space to move to
		this.CollectFromPlayers = CollectFromPlayers || false; // if you collect from players (default is false)
	}

	Text: string;

	Money: number;

	GetOutOfJail: boolean;

	MoveTo: number | undefined;

	CollectFromPlayers: boolean;
}

const ChanceCards = [
	// Chance cards
	new Card('Get out of jail free', 0, true, null, false),
	new Card('Advance to Go', 0, false, 0, false),
	new Card(
		'Go to jail. Do not pass Go, do not collect $200',
		0,
		false,
		10,
		false
	),
	new Card('Collect $50 from every other player', 50, false, null, true),
	new Card(
		'Advance to Illinois Avenue. If you pass go, collect $200',
		0,
		false,
		24,
		false
	),
	new Card('Advance to Short Line', 0, false, 35, false),
	new Card('Advance to Pennsylvania Railroad', 0, false, 15, false),
	new Card('Advance to B. & O. Railroad', 0, false, 25, false),
	new Card('Advance to Reading Railroad', 0, false, 5, false),
	new Card('Advance to Boardwalk', 0, false, 39, false),
	new Card('Pay $30 to each player', -30, false, null, true),
	new Card('Doctors fee. Pay $15', -15, false, null, false),
	new Card('Pay hospital fees of $50', -50, false, null, true),
	new Card('Life insurance matures. Receive $50', 15, false, null, false),
	new Card('Advance to Go, and collect $200', 0, false, 0, false),
	new Card('Income tax refund. Receive $150', 150, false, null, false),
	new Card('You won the lottery! Receive $100', 100, false, null, false),
	new Card('Advance to the Electric Company', 0, false, 12, false),
];

const CommunityChestCards = [
	// Community Chest cards
	new Card('You inherited $150', 150, false, null, false),
	new Card(
		'Go to jail. Do not pass Go, do not collect $200',
		0,
		false,
		10,
		false
	),
	new Card('Get out of jail free', 0, true, null, false),
	new Card(
		'Advance to St. Charles Place. If you pass Go, collect $200',
		0,
		false,
		11,
		false
	),
	new Card('You sold your house. Receive $200', 200, false, null, false),
	new Card('School fees, pay $200', -200, false, null, false),
	new Card('Collect $50', 50, false, null, false),
	new Card(
		'You spilled coffee on your keyboard, lose $100',
		-100,
		false,
		null,
		false
	),
	new Card('Your wallet gets stolen lose $300', -300, false, null, false),
	new Card('Collect $50', 50, false, null, false),
	new Card('You won a giveaway!, win $100', 100, false, null, false),
	new Card('Lose $100', -100, false, null, false),
	new Card('Save money on food, collect $50', 50, false, null, false),
	new Card('Win $50', 50, false, null, false),
	new Card('Your house burned down, you lose $400', -400, false, null, false),
	new Card('Successfully reboot a game, win $50', 50, false, null, false),
	new Card(
		'Pay for a year of spotify premium, lose $50',
		-50,
		false,
		null,
		false
	),
];

class Property implements MonopolyProperty {
	// Make a property
	constructor(
		Name: string,
		Rent: number | number[],
		Color: string,
		Price: number | undefined = undefined,
		Mortgage: number | undefined = undefined,
		Building: number | undefined = undefined,
		Image: string | undefined = undefined
	) {
		this.Name = Name; // Name of the property
		this.Rent = Rent; // Array of prices based on how many houses they have [no house rent, 1 house rent, 2 house rent...]
		this.Color = Color; // The color of it (discord color or type)
		this.Price = Price; // Cost to buy
		this.Mortgage = Mortgage; // Money back when you mortgage
		this.Building = Building; // How much to buil a building
		this.Mortgaged = false; // if its mortgaged
		this.Owner = undefined; // who ownes it
		this.Houses = 0; // How many houses are on it
		this.Image = Image;
	}

	Name: string;

	Rent: number | number[];

	Color: string;

	Price?: number | undefined;

	Mortgage?: number | undefined;

	Building?: number | undefined;

	Mortgaged?: boolean | undefined;

	Owner?: Player | undefined;

	Houses?: number | undefined;

	Image?: string | undefined;

	Buy(NewOwner: Player) {
		// Buy the property (doesn't charge)
		this.Owner = NewOwner; // change owner
		NewOwner.Worth += this.Price ? this.Price : 0; // increase their worth
		if (!this.Mortgaged) {
			// if its not mortgaged
			// @ts-ignore
			NewOwner[this.Color]++; // increase amount they owner
		}
	}

	async Info(channel: string) {
		// gets info about the property
		let res = '';
		res += `${this.Name}\n`;
		res += `Price - $${this.Price}`;
		if (!this.Image) {
			return;
		}

		const media = MessageMedia.fromFilePath(this.Image);
		await client.sendMessage(channel, media, { caption: res });
	}
}

const Props = [
	// The board
	/* 0 */
	new Property('GO', 0, 'GO'),
	/* 1 */
	new Property(
		'Mediterranean Avenue',
		[2, 10, 30, 90, 160, 250],
		'DARK_ORANGE',
		60,
		30,
		50,
		'./monopoly/props/LootLake.png'
	),
	/* 2 */
	new Property('Community Chest', 0, 'Chest'),
	/* 3 */
	new Property(
		'Baltic Avenue',
		[4, 20, 60, 180, 320, 450],
		'DARK_ORANGE',
		60,
		30,
		50,
		'./monopoly/props/DesertTemple.png'
	),
	/* 4 */
	new Property('Income Tax', 200, 'Tax'),
	/* 5 */
	new Property(
		'Reading Railroad',
		[0, 25, 50, 100, 200],
		'RR',
		200,
		100,
		0,
		'./monopoly/props/Wumpus_Wonderful_Rail.png'
	),
	/* 6 */
	new Property(
		'Oriental Avenue',
		[6, 30, 90, 270, 400, 550],
		'BLUE',
		100,
		50,
		50,
		'./monopoly/props/RussianMetro.png'
	),
	/* 7 */
	new Property('Chance', 0, 'Chance'),
	/* 8 */
	new Property(
		'Vermont Avenue',
		[6, 30, 90, 270, 400, 550],
		'BLUE',
		100,
		50,
		50,
		'./monopoly/props/Rapture.png'
	),
	/* 9 */
	new Property(
		'Connecticut Avenue',
		[8, 40, 100, 300, 450, 600],
		'BLUE',
		120,
		60,
		50,
		'./monopoly/props/Hoth.png'
	),
	/* 10 */
	new Property('Jail', 0, 'Jail'),
	/* 11 */
	new Property(
		'St. Charles Place',
		[10, 50, 150, 450, 625, 750],
		'LUMINOUS_VIVID_PINK',
		140,
		70,
		100,
		'./monopoly/props/SummonersRift.png'
	),
	/* 12 */
	new Property(
		'Electric Company',
		[0, 4, 10],
		'Utility',
		150,
		75,
		0,
		'./monopoly/props/ServerRoom.png'
	),
	/* 13 */
	new Property(
		'States Avenue',
		[10, 50, 150, 450, 625, 750],
		'LUMINOUS_VIVID_PINK',
		140,
		70,
		100,
		'./monopoly/props/PeachsCastle.png'
	),
	/* 14 */
	new Property(
		'Virginia Avenue',
		[12, 60, 180, 500, 700, 900],
		'LUMINOUS_VIVID_PINK',
		160,
		80,
		100,
		'./monopoly/props/VanillaUnicorn.png'
	),
	/* 15 */
	new Property(
		'Pennsylvania Railroad',
		[0, 25, 50, 100, 200],
		'RR',
		200,
		100,
		0,
		'./monopoly/props/HypesquadBravery.png'
	),
	/* 16 */
	new Property(
		'St. James Place',
		[14, 70, 200, 550, 750, 950],
		'ORANGE',
		180,
		90,
		100,
		'./monopoly/props/Rockport.png'
	),
	/* 17 */
	new Property('Community Chest', 0, 'Chest'),
	/* 18 */
	new Property(
		'Tennessee Avenue',
		[14, 70, 200, 550, 750, 950],
		'ORANGE',
		180,
		90,
		100,
		'./monopoly/props/SanAndreas.png'
	),
	/* 19 */
	new Property(
		'New York Avenue',
		[16, 80, 220, 600, 800, 1000],
		'ORANGE',
		200,
		100,
		100,
		'./monopoly/props/Dust2.png'
	),
	/* 20 */
	new Property('Free Parking', 0, 'Parking'),
	/* 21 */
	new Property(
		'Kentucky Avenue',
		[18, 90, 250, 700, 875, 1050],
		'DARK_RED',
		220,
		110,
		150,
		'./monopoly/props/Sanctuary.png'
	),
	/* 22 */
	new Property('Chance', 0, 'Chance'),
	/* 23 */
	new Property(
		'Indiana Avenue',
		[18, 90, 250, 700, 875, 1050],
		'DARK_RED',
		220,
		110,
		150,
		'./monopoly/props/LethalLavaLand.png'
	),
	/* 24 */
	new Property(
		'Illinois Avenue',
		[20, 100, 300, 750, 925, 1100],
		'DARK_RED',
		240,
		120,
		150,
		'./monopoly/props/Hell.png'
	),
	/* 25 */
	new Property(
		'B. & O. Railroad',
		[0, 25, 50, 100, 200],
		'RR',
		200,
		100,
		0,
		'./monopoly/props/HypesquadBrilliance.png'
	),
	/* 26 */
	new Property(
		'Atlantic Avenue',
		[22, 110, 330, 800, 975, 1150],
		'GOLD',
		260,
		130,
		150,
		'./monopoly/props/Dustbowl.png'
	),
	/* 27 */
	new Property(
		'Ventnor Avenue',
		[22, 110, 330, 800, 975, 1150],
		'GOLD',
		260,
		130,
		150,
		'./monopoly/props/VictoryRoad.png'
	),
	/* 28 */
	new Property(
		'Water works',
		[0, 4, 10],
		'Utility',
		150,
		75,
		0,
		'./monopoly/props/ServiceProvider.png'
	),
	/* 29 */
	new Property(
		'Marvin Gardens',
		[24, 120, 360, 850, 1025, 1200],
		'GOLD',
		280,
		140,
		150,
		'./monopoly/props/Nuketown.png'
	),
	/* 30 */
	new Property('Go To Jail', 0, 'Go To Jail'),
	/* 31 */
	new Property(
		'Pacific Avenue',
		[26, 130, 390, 900, 1100, 1275],
		'DARK_GREEN',
		300,
		150,
		200,
		'./monopoly/props/GreenHillZone.png'
	),
	/* 32 */
	new Property(
		'North Carolina Avenue',
		[26, 130, 390, 900, 1100, 1275],
		'DARK_GREEN',
		300,
		150,
		200,
		'./monopoly/props/MonkeyIsland.png'
	),
	/* 33 */
	new Property('Community Chest', 0, 'Chest'),
	/* 34 */
	new Property(
		'Pennsylvania Avenue',
		[28, 150, 450, 1000, 1200, 1400],
		'DARK_GREEN',
		320,
		160,
		200,
		'./monopoly/props/Sokrovenno.png'
	),
	/* 35 */
	new Property(
		'Short Line',
		[0, 25, 50, 100, 200],
		'RR',
		200,
		100,
		0,
		'./monopoly/props/HypesquadBalance.png'
	),
	/* 36 */
	new Property('Chance', 0, 'Chance'),
	/* 37 */
	new Property(
		'Park Place',
		[35, 175, 500, 1100, 1300, 1500],
		'DARK_BLUE',
		350,
		175,
		200,
		'./monopoly/props/TheEnd.png'
	),
	/* 38 */
	new Property('Luxury tax', 100, 'Tax'),
	/* 39 */
	new Property(
		'Boardwalk',
		[50, 200, 600, 1400, 1700, 2000],
		'DARK_BLUE',
		400,
		200,
		200,
		'./monopoly/props/FinalDestination.png'
	),
];

class Offer implements MonopolyOffer {
	// contains info about an offer
	constructor(PropertyIndex: number, Price: number, OriginalOwner: Player) {
		this.PropertyIndex = PropertyIndex; // Where the property is on the board
		this.Price = Price; // How much they are offering it for
		this.OriginalOwner = OriginalOwner; // Who the original owner is
	}

	PropertyIndex: number;

	Price: number;

	OriginalOwner: Player;
}

class Player implements MonopolyPlayer {
	constructor(ID: string, channel: string, name: string, num: number) {
		this.cls = [
			0x0000ffff, 0x00ff00ff, 0xff0000ff, 0xffff00ff, 0x800080ff, 0x0000ffff,
		];
		this.color = this.cls[num];
		this.name = name;
		this.channel = channel;
		this.Position = 0; // What position they are
		this.Money = 1500; // How much money
		this.RR = 0; // How many RRs
		this.Jailed = false; // If they are jailed
		this.ID = ID; // What their discord ID is
		this.DARK_ORANGE = 0; // How many brown houses
		this.BLUE = 0; // How many light blue houses
		this.LUMINOUS_VIVID_PINK = 0; // how many pink houses
		this.Utility = 0; // How many utilitys
		this.ORANGE = 0; // How many orange houses
		this.DARK_RED = 0; // How many red houses
		this.GOLD = 0; // How many yellow houses
		this.DARK_GREEN = 0; // How many green houses
		this.DARK_BLUE = 0; // How many dark blue houses
		this.GetOutOfJail = 0; // How many get out of jail cards they have
		this.Doubles = false; // If they just rolled doubles
		this.Rolled = false; // If they have roled yet
		this.DoublesStreak = 0; // How many times they've rolled doubles
		this.Worth = 0; // How much all their properties are worth
		this.JailTime = 0; // How long they have been in jail
		this.CurrentOffer = null; // If they have a current offer
		this.PaidPlayer = null; // Last player they paid
	}

	cls: number[];

	ID: string;

	channel: string;

	name: string;

	Position: number;

	Money: number;

	RR: number;

	Jailed: boolean;

	color: number;

	DARK_ORANGE: number;

	BLUE: number;

	LUMINOUS_VIVID_PINK: number;

	Utility: number;

	ORANGE: number;

	DARK_RED: number;

	GOLD: number;

	DARK_GREEN: number;

	DARK_BLUE: number;

	GetOutOfJail: number;

	Doubles: boolean;

	Rolled: boolean;

	DoublesStreak: number;

	Worth: number;

	JailTime: number;

	CurrentOffer: undefined | Offer;

	PaidPlayer: undefined | Player;

	AddMoney(num: string | number) {
		// add money
		this.Money += parseInt(String(num));
	}

	async Move(member: any, spaces: number, Properties: Property[]) {
		// Move them
		return new Promise(async (resolve, reject) => {
			this.Position += spaces; // Move them num of spaces
			if (this.Position >= Properties.length) {
				// if they went around the board
				this.AddMoney(200); // add 200
				this.Position -= Properties.length; // move them back onto the board
				await client.sendMessage(
					this.channel,
					'You passed go and collected $200!'
				); // inform
			}

			resolve(undefined);
		});
	}

	Free() {
		this.JailTime = 0; // remove jail time
		this.Jailed = false; // unjail
	}

	Jail() {
		this.Position = 10;
		this.Jailed = true;
		this.JailTime = 0;
	}

	async RemoveMoney(
		member: any,
		num: number | undefined,
		OtherPlayer: Player | undefined
	) {
		// remove money
		this.Money -= parseInt(String(num)); // remove
		if (this.Money < 0) {
			// if they are bankrupt
			await client.sendMessage(
				this.channel,
				`${this.name}, you are in debt! If you are still in debt when you end your turn you will lose!`
			); // notify
			this.PaidPlayer = OtherPlayer; // set who made them bankrupt (can be null if bank)
		}
	}
}

class MGame implements MonopolyGame {
	CurrentPlayerIndex: number;

	constructor(member: pkg.Contact, channel: pkg.Chat['id']['_serialized']) {
		this.channel = channel;
		this.HighestBid = 0; // Current highest bid
		this.Bidders = []; // Who is bidding
		this.Bidding = false; // if we are bidding
		this.BiddersIndex = 0; // who is currently bidding

		this.InProgress = false; // if the game is in progress

		this.Leader = member.number; // Leader is who made the game

		this.Players = new Map(); // make a collection of players
		this.Players.set(
			member.number,
			new Player(
				member.number,
				this.channel,
				member.name || member.number,
				this.Players.size
			)
		); // add the leader to players
		this.CurrentPlayerIndex = 0;
		this.CurrentPlayer = null; // Currently player

		this.Properties = Props;

		client.sendMessage(
			this.channel,
			'Welcome to Monopoly! \nType `mp join` to join the game!'
		);
	}

	channel: string;

	HighestBid: number;

	Bidders: Player[];

	Bidding: boolean;

	BiddersIndex: number;

	InProgress: boolean;

	Leader: string;

	Players: Map<string, Player>;

	CurrentPlayer: Player | undefined;

	Properties: Property[];

	async board() {
		const cords = [
			'1862,1862',
			'1654,1906',
			'1484,1896',
			'1316,1896',
			'1153,1891',
			'993,1886',
			'823,1891',
			'662,1886',
			'489,1891',
			'334,1889',
			'33,1926',
			'92,1649',
			'109,1482',
			'102,1321',
			'102,1161',
			'104,983',
			'104,837',
			'102,667',
			'97,504',
			'99,344',
			'109,99',
			'354,82',
			'504,92',
			'667,90',
			'825,75',
			'995,90',
			'1171,80',
			'1326,87',
			'1479,95',
			'1644,82',
			'1879,97',
			'1889,329',
			'1889,507',
			'1896,662',
			'1901,830',
			'1891,998',
			'1896,1158',
			'1891,1321',
			'1889,1482',
			'1889,1654',
		];
		const img = await Jimp.read('./monopoly/board.png');
		const pls = Array.from(this.Players.values());
		for (let i = 0; i < pls.length; i++) {
			const pos = pls[i].Position;
			const x = parseInt(cords[pos].split(',')[0]);
			const y = parseInt(cords[pos].split(',')[1]);
			const image = new Jimp(40, 40, pls[i].color);
			img.blit(image, x, y);
		}

		await img.writeAsync('./monopoly/editboard.png');
		const media = MessageMedia.fromFilePath('./monopoly/editboard.png');
		await client.sendMessage(this.channel, media);
	}

	async NewPlayer(member: pkg.Contact) {
		// new player
		const userID = member.number;
		if (this.InProgress) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you can't join a game that's already started!`
			);
		} // If the game is in progress

		if (this.Players.size == 5) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, the game is full!`
			);
		} // game can't be over 8 people because rules of monopoly

		this.Players.set(
			userID,
			new Player(
				userID,
				this.channel,
				member.name || member.number,
				this.Players.size
			)
		); // Add them to the game
		await client.sendMessage(
			this.channel,
			`${member.name || member.number}, welcome to the game! We currently have ${this.Players.size} players!`
		);
	}

	async PlayerLeave(member: pkg.Contact, message: pkg.Message) {
		// Player leaves
		if (!this.Players.has(member.number)) {
			return client.sendMessage(this.channel, "You aren't in this game!");
		} // can't leave if you aren't in it

		if (member.number == this.Leader) {
			return client.sendMessage(
				this.channel,
				"The leader can't leave! Do monopoloy leader to change the leader!"
			);
		} // Leader can't leave

		const player = this.Players.get(member.number);
		if (!player) {
			return;
		}

		if (this.InProgress) {
			// If the game is in progress
			player.Money = -1; // set money to -1
			this.CheckAndHandleBankrupt(message, player); // Check for bankrupt and then distribute property
		} else {
			// Game isn't in progress
			this.Players.delete(member.number); // delete from players
			await client.sendMessage(this.channel, 'Sorry to see you leave :('); // Inform
		}
	}

	async ChangeLeader(member: pkg.Contact, message: pkg.Message) {
		// change the game leader
		if (this.Leader != member.number) {
			return client.sendMessage(
				this.channel,
				'Only the leader can change the leader!'
			);
		} // only game leader

		const mentions = await message.getMentions();
		const NewLeader = mentions[0]; // new leader is first mention
		if (NewLeader) {
			// if theres a new leader
			if (!this.Players.has(NewLeader.number)) {
				return client.sendMessage(
					this.channel,
					'The new leader has to be in this game!'
				);
			}

			this.Leader = NewLeader.number; // set to new leader
			await client.sendMessage(
				this.channel,
				`Changed the leader to ${this.Leader}!`
			); // inform
		} else {
			// not a new leader
			await client.sendMessage(this.channel, 'mp leader [new leader]');
		}
	}

	async Start(member: pkg.Contact) {
		// start the game
		const userID = member.number;
		if (userID != this.Leader) {
			return client.sendMessage(
				this.channel,
				`Only ${this.Leader} can start the game!`
			);
		} // only leader can start

		if (this.Players.size < 2) {
			return client.sendMessage(
				this.channel,
				"I can't start a game with less than 2 players..."
			);
		} // only can start with 2 or more players

		if (this.InProgress) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, the game has already started!`
			);
		} // can't start again

		this.InProgress = true; // set in progress
		this.CurrentPlayerIndex = Math.floor(Math.random() * this.Players.size); // pick random starting player
		this.CurrentPlayer = Array.from(this.Players.values())[
			this.CurrentPlayerIndex
		]; // set currentplayer

		await client
			.sendMessage(
				this.channel,
				`Lets get the show on the road! ${this.CurrentPlayer.name}, you are going first! Do mp roll to roll the dice!`
			)
			.then(async msg => {
				await this.board();
			}); // inform
	}

	async HandlePosition(
		member: pkg.Contact,
		userID: undefined,
		Dice1: number,
		Dice2: number
	) {
		// handle them being in a position
		return new Promise(async (resolve, reject) => {
			if (!this.CurrentPlayer) {
				return;
			}

			const CurrentProperty = this.Properties[this.CurrentPlayer.Position]; // Get current property
			if (CurrentProperty.Color == 'GO') {
				// Currently on GO
				await client.sendMessage(
					this.channel,
					`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on go.`
				); // inform
			} else if (
				CurrentProperty.Color == 'Chest' ||
				CurrentProperty.Color == 'Chance'
			) {
				// Currently on Chest or Chance
				let card: Card;
				if (CurrentProperty.Color == 'Chest') {
					// If its chest
					card =
						CommunityChestCards[
							Math.floor(Math.random() * CommunityChestCards.length)
						]; // random chest card
				} else if (CurrentProperty.Color == 'Chance') {
					// if its chance
					card = ChanceCards[Math.floor(Math.random() * ChanceCards.length)]; // random chance card
				} else {
					return;
				}

				let Message = `${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on a ${CurrentProperty.Color.toLowerCase()} card that says, "${card.Text}".`; // Inform about card
				if (card.MoveTo == 10) {
					// if move to jail
					this.CurrentPlayer.Jail();
					await client.sendMessage(this.channel, Message); // send message
				} else if (card.GetOutOfJail) {
					// if its get out of jail
					this.CurrentPlayer.GetOutOfJail++; // increase get out of jail
					await client.sendMessage(this.channel, Message); // send message
				} else if (card.MoveTo != null) {
					// if there is a move to
					if (card.MoveTo < this.CurrentPlayer.Position) {
						// if its behind the player
						this.CurrentPlayer.AddMoney(200); // add 200
						Message += ' You passed go and collected $200!'; // Passed go
					}

					this.CurrentPlayer.Position = card.MoveTo; // Move
					await client.sendMessage(this.channel, Message); // send message
					await this.HandlePosition(member, userID, Dice1, Dice2);
				} else if (card.CollectFromPlayers) {
					// If you collect money from others
					if (card.Money < 0) {
						// if money is below 0
						this.CurrentPlayer.RemoveMoney(
							member,
							(this.Players.size - 1) * card.Money * -1,
							null
						); // remove money for each player
						Message += ` You lost $${(this.Players.size - 1) * card.Money * -1}!`;
						Array.from(this.Players.values()).forEach(player => {
							if (!this.CurrentPlayer) {
								return;
							}

							// loop through each player
							if (player.ID != this.CurrentPlayer.ID) {
								// if the player isn't the current player
								player.AddMoney(card.Money * -1); // add money
							}
						});
					} else {
						// If money is 0 or above
						this.CurrentPlayer.AddMoney((this.Players.size - 1) * card.Money); // Add money
						Message += ` You collected $${(this.Players.size - 1) * card.Money}!`;
						Array.from(this.Players.values()).forEach(player => {
							if (!this.CurrentPlayer) {
								return;
							}

							// Loop through each player
							if (player.ID != this.CurrentPlayer.ID) {
								// If the player isn't the current one
								player.RemoveMoney(member, card.Money, null); // remove money
							}
						});
					}

					await client.sendMessage(this.channel, Message); // send message
				} else {
					// if the card is just money
					if (card.Money < 0) {
						// if its below 0
						this.CurrentPlayer.RemoveMoney(member, card.Money * -1, null); // Remove the money
					} else {
						// if its 0 or above
						this.CurrentPlayer.AddMoney(card.Money); // Add money
					}

					await client.sendMessage(this.channel, Message); // send message
				}
			} else if (CurrentProperty.Color == 'Tax') {
				// if they landed on tax
				const TenPercent = Math.round(
					(this.CurrentPlayer.Money + this.CurrentPlayer.Worth) * 0.1
				); // get 10 percent of total worth
				if (
					TenPercent <
					(typeof CurrentProperty.Rent === 'number'
						? CurrentProperty.Rent
						: CurrentProperty.Rent[0])
				) {
					// If ten percent is less than the tax
					this.CurrentPlayer.RemoveMoney(member, TenPercent, null); // remove 10 percent
					await client.sendMessage(
						this.channel,
						`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} and payed $${TenPercent} (10%).`
					); // inform
				} else {
					// if its = or more
					this.CurrentPlayer.RemoveMoney(
						member,
						typeof CurrentProperty.Rent === 'number'
							? CurrentProperty.Rent
							: CurrentProperty.Rent[0],
						null
					); // remove tax
					await client.sendMessage(
						this.channel,
						`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} and payed $${CurrentProperty.Rent}.`
					); // inform
				}
			} else if (CurrentProperty.Color == 'Jail') {
				// if they land on jail
				if (!this.CurrentPlayer.Jailed) {
					await client.sendMessage(
						this.channel,
						`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2}. You are just visiting jail.`
					);
				}
			} else if (CurrentProperty.Color == 'Utility') {
				// if they land on utility
				if (CurrentProperty.Owner) {
					// if its owned
					if (CurrentProperty.Owner.ID != this.CurrentPlayer.ID) {
						// if its owned by someone else
						if (CurrentProperty.Mortgaged) {
							// if its mortgaged
							await client.sendMessage(
								this.channel,
								`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Owner.name}'s ${CurrentProperty.Name} but its mortgaged...`
							);
						} else {
							// if its not mortgaged
							const Price =
								(Dice1 + Dice2) *
								(typeof CurrentProperty.Rent === 'number'
									? CurrentProperty.Rent
									: CurrentProperty.Rent[CurrentProperty.Owner.Utility]); // price is dice roll * rent)
							this.CurrentPlayer.RemoveMoney(
								member,
								Price,
								CurrentProperty.Owner
							); // remove amount
							CurrentProperty.Owner.AddMoney(Price); // add to owner
							await client.sendMessage(
								this.channel,
								`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2}. You landed on ${CurrentProperty.Owner.name}'s ${CurrentProperty.Name} and paid them $${Price}.`
							);
						}
					} else {
						// if you land on your own utility
						await client.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on your own ${CurrentProperty.Name}...`
						);
					}
				} else {
					// if its not owned
					await client
						.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name}!.\n\nRun \`mp buy\` to buy the property\nRun \`mp end\` to auction it!\n\n You currently have $${this.CurrentPlayer.Money} and ${this.CurrentPlayer[CurrentProperty.Color]} properties with this color.`
						)
						.then(async msg => {
							await CurrentProperty.Info(this.channel);
						});
				}
			} else if (CurrentProperty.Color == 'Parking') {
				// if its parking
				await client.sendMessage(
					this.channel,
					`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on free parking.`
				);
			} else if (CurrentProperty.Color == 'Go To Jail') {
				// if its go to jail
				await client.sendMessage(
					this.channel,
					`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on go to jail!`
				);
				this.CurrentPlayer.Jail();
			} else if (CurrentProperty.Color == 'RR') {
				// if its a rail road
				if (CurrentProperty.Owner) {
					// if its owned
					if (CurrentProperty.Mortgaged) {
						// if its mortgaged
						await client.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2}. You landed on ${CurrentProperty.Owner.name}'s ${CurrentProperty.Name} but its mortgaged...`
						);
					} else {
						// not mortgaged
						if (CurrentProperty.Owner.ID != this.CurrentPlayer.ID) {
							// if its not owned by you
							this.CurrentPlayer.RemoveMoney(
								member,
								typeof CurrentProperty.Rent === 'number'
									? CurrentProperty.Rent
									: CurrentProperty.Rent[CurrentProperty.Owner.RR],
								CurrentProperty.Owner
							); // remove money
							CurrentProperty.Owner.AddMoney(
								typeof CurrentProperty.Rent === 'number'
									? CurrentProperty.Rent
									: CurrentProperty.Rent[CurrentProperty.Owner.RR]
							); // add money to owner
							await client.sendMessage(
								this.channel,
								`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Owner.name}'s ${CurrentProperty.Name} and payed them $${typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Owner.RR]}`
							);
						} else {
							// if its owned by you
							await client.sendMessage(
								this.channel,
								`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} but you already own it!`
							);
						}
					}
				} else {
					// not owned
					await client
						.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name}!.\n\nRun \`mp buy\` to buy the property\nRun \`mp end\` to auction it!\n\n You currently have $${this.CurrentPlayer.Money} and ${this.CurrentPlayer[CurrentProperty.Color]} properties with this color.`
						)
						.then(async msg => {
							await CurrentProperty.Info(this.channel);
						});
				}
			} else {
				// regular property
				if (CurrentProperty.Owner) {
					// if theres an owner
					if (CurrentProperty.Owner.ID == this.CurrentPlayer.ID) {
						client.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} but you already own it...`
						);
					} // landed on your own
					else {
						// you don't own it
						if (CurrentProperty.Mortgaged) {
							// if its mortgaged
							await client.sendMessage(
								this.channel,
								`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name} but it is mortgaged...`
							);
						} else {
							// not mortgaged
							if (!CurrentProperty.Houses) {
								return;
							}

							if (CurrentProperty.Houses > 0) {
								// more than 0 house
								await client.sendMessage(
									this.channel,
									`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name}. You payed them $${typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Houses]}!`
								);
								this.CurrentPlayer.RemoveMoney(
									member,
									typeof CurrentProperty.Rent === 'number'
										? CurrentProperty.Rent
										: CurrentProperty.Rent[CurrentProperty.Houses],
									CurrentProperty.Owner
								); // remove money
								CurrentProperty.Owner.AddMoney(
									typeof CurrentProperty.Rent === 'number'
										? CurrentProperty.Rent
										: CurrentProperty.Rent[CurrentProperty.Houses]
								); // add money
							} else {
								// 0 houses
								if (
									CurrentProperty.Color == 'DARK_ORANGE' ||
									CurrentProperty.Color == 'DARK_BLUE'
								) {
									// if its orange or blue
									if (CurrentProperty.Owner[CurrentProperty.Color] < 2) {
										// doesn't own all 2
										this.CurrentPlayer.RemoveMoney(
											member,
											typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses],
											CurrentProperty.Owner
										);
										CurrentProperty.Owner.AddMoney(
											typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]
										);
										await client.sendMessage(
											this.channel,
											`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name}. You payed them $${typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Houses]}!`
										);
									} else {
										// owns all 2
										this.CurrentPlayer.RemoveMoney(
											member,
											(typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]) * 2,
											CurrentProperty.Owner
										); // multiply rent by 2
										CurrentProperty.Owner.AddMoney(
											(typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]) * 2
										);
										await client.sendMessage(
											this.channel,
											`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name}. You payed them $${(typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Houses]) * 2}!`
										);
									}
								} else {
									// any other color
									// @ts-ignore
									if (CurrentProperty.Owner[CurrentProperty.Color] < 3) {
										// doesn't own all 3
										this.CurrentPlayer.RemoveMoney(
											member,
											typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses],
											CurrentProperty.Owner
										);
										CurrentProperty.Owner.AddMoney(
											typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]
										);
										await client.sendMessage(
											this.channel,
											`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name}. You payed them $${typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Houses]}!`
										);
									} else {
										// does own all 3
										this.CurrentPlayer.RemoveMoney(
											member,
											(typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]) * 2,
											CurrentProperty.Owner
										); // multiply rent by 2
										CurrentProperty.Owner.AddMoney(
											(typeof CurrentProperty.Rent === 'number'
												? CurrentProperty.Rent
												: CurrentProperty.Rent[CurrentProperty.Houses]) * 2
										);
										await client.sendMessage(
											this.channel,
											`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name} which is owned by ${CurrentProperty.Owner.name}. You payed them $${(typeof CurrentProperty.Rent === 'number' ? CurrentProperty.Rent : CurrentProperty.Rent[CurrentProperty.Houses]) * 2}!`
										);
									}
								}
							}
						}
					}
				} else {
					// nobody owns it
					await client
						.sendMessage(
							this.channel,
							// @ts-ignore
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and landed on ${CurrentProperty.Name}!.\n\nRun \`mp buy\` to buy the property\nRun \`mp end\` to auction it!\n\n You currently have $${this.CurrentPlayer.Money} and ${this.CurrentPlayer[CurrentProperty.Color]} properties with this color.`
						)
						.then(async msg => {
							await CurrentProperty.Info(this.channel);
						});
				}
			}

			resolve(undefined);
		});
	}

	async Roll(member: pkg.Contact) {
		// roll
		if (!this.CurrentPlayer) {
			return;
		}

		const userID = member.number;
		if (!this.InProgress) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, the game hasen't started yet!`
			);
		} // if its not in progress

		if (member.number != this.CurrentPlayer.ID) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, it's not your turn!`
			);
		} // current player can only roll

		if (this.CurrentPlayer.Rolled) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you already rolled`
			);
		} // if they have already rolled

		this.CurrentPlayer.Rolled = true; // set to rolled
		const Dice1 = Math.floor(Math.random() * 6) + 1; // roll 2 dice
		const Dice2 = Math.floor(Math.random() * 6) + 1;
		if (this.CurrentPlayer.Jailed) {
			// if the player is in jail
			this.CurrentPlayer.JailTime++; // increase jail time
			if (Dice1 == Dice2) {
				// If they rolled doubles
				await client.sendMessage(
					this.channel,
					`${member.name || member.number}, you rolled doubles (${Dice1} and a ${Dice2}) and got out of jail for free!`
				);
				await this.CurrentPlayer.Free(); // free from jail
				await this.CurrentPlayer.Move(member, Dice1 + Dice2, this.Properties); // move
			} else {
				// didn't roll doubles
				if (this.CurrentPlayer.GetOutOfJail > 0) {
					// if they have at least 1 get out of jail card
					await client.sendMessage(
						this.channel,
						`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and used one of your get out of jail free cards!`
					);
					this.CurrentPlayer.GetOutOfJail--; // remove the card
					await this.CurrentPlayer.Free(); // Free them from jail
					await this.CurrentPlayer.Move(member, Dice1 + Dice2, this.Properties); // move
				} else {
					// no get out of jail cards
					if (this.CurrentPlayer.JailTime == 3) {
						// been in jail for 3 turns
						this.CurrentPlayer.RemoveMoney(member, 50, null); // pay 50
						await client.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} and payed 50 dollars and got out of jail.`
						); // Inform
						await this.CurrentPlayer.Free(); // free
						await this.CurrentPlayer.Move(
							member,
							Dice1 + Dice2,
							this.Properties
						); // move
					} else {
						// been in jail for less than 3 turns
						await client.sendMessage(
							this.channel,
							`${member.name || member.number}, you rolled a ${Dice1} and a ${Dice2} but you are in jail and cannot move!`
						); // can't move
					}
				}
			}
		} else {
			// not jailed
			await this.CurrentPlayer.Move(member, Dice1 + Dice2, this.Properties); // move
		}

		await this.board();
		await this.HandlePosition(member, undefined, Dice1, Dice2);

		if (Dice1 == Dice2) {
			// doubles
			this.CurrentPlayer.Doubles = true; // rolled doubles
			this.CurrentPlayer.DoublesStreak++; // increase streak
			if (this.CurrentPlayer.DoublesStreak == 3) {
				// third time
				this.CurrentPlayer.DoublesStreak = 0; // remove streak
				this.CurrentPlayer.Doubles = false; // remove doubles
				this.CurrentPlayer.Jail(); // jail them
			}
		} else {
			// not doubles
			this.CurrentPlayer.Doubles = false;
			this.CurrentPlayer.DoublesStreak = 0;
		}
	}

	async Stats(message: pkg.Message, member: pkg.Contact) {
		// get stats for player
		if (!this.Players.has(member.number)) {
			return message.reply("you aren't in this game");
		}

		const player = this.Players.get(member.number);
		if (!player) {
			return;
		}

		let PlayerEmbed =
			`Stats for ${member.name || member.number}` +
			`\nPosition - ${this.Properties[player.Position].Name}\nMoney - ${
				player.Money
			}\nGet out of jail cards - ${player.GetOutOfJail}\nCurrently Jailed - ${
				player.Jailed
			}\nRail roads - ${player.RR}\nUtilities - ${
				player.Utility
			}\nBrown Properties  - ${player.DARK_ORANGE}\nLight blue properties  - ${
				player.BLUE
			}\nPink properties  - ${
				player.LUMINOUS_VIVID_PINK
			}\nOrange Properties - ${player.ORANGE}\nRed properties - ${
				player.DARK_RED
			}\nYellow properties - ${player.GOLD}\nGreen properties - ${
				player.DARK_GREEN
			}\nDark blue properties - ${player.DARK_BLUE}\n\nProperty list - \n`;
		for (let i = 0; i < this.Properties.length; i++) {
			// go through all properties
			const CurrentProperty = this.Properties[i];
			if (CurrentProperty.Owner && CurrentProperty.Owner.ID == player.ID) {
				PlayerEmbed += ` ${CurrentProperty.Name} | `;
			}
		}

		await client.sendMessage(this.channel, PlayerEmbed);
	}

	async Buy(message: pkg.Message, member: pkg.Contact) {
		// Buy current property
		const userID = member.number;
		if (!this.CurrentPlayer) {
			return;
		}

		if (!this.Players.has(userID)) {
			return message.reply("you aren't in this game.");
		} // must be in game

		if (!this.InProgress) {
			return message.reply("the game hasen't started yet!");
		} // game has to be in progress

		if (userID != this.CurrentPlayer.ID) {
			return message.reply("it's not your turn!");
		} // has to be their turn

		const CurrentProperty = this.Properties[this.CurrentPlayer.Position]; // Get property they are on
		if (!CurrentProperty.Price) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you can't buy this!`
			);
		} // if there isn't a price

		if (CurrentProperty.Owner) {
			return client.sendMessage(
				this.channel,
				`${CurrentProperty.Owner.name} already owns this!`
			);
		}

		if (CurrentProperty.Price > this.CurrentPlayer.Money) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you don't have enough money to buy this!`
			);
		} // if its over their price

		// if they can afford it
		this.CurrentPlayer.RemoveMoney(member, CurrentProperty.Price, null); // remove money
		CurrentProperty.Buy(this.CurrentPlayer); // buy it
		await client.sendMessage(
			this.channel,
			`${member.name || member.number}, you bought ${CurrentProperty.Name}!`
		);
	}

	async CheckAndHandleBankrupt(message: any, Player: Player) {
		// check if they are bankrupt
		if (Player.Money < 0) {
			// if they have less than 0 money
			this.Players.delete(Player.ID); // remove player
			await client.sendMessage(this.channel, `${Player.name} went bankrupt!`); // inform
			if (Player.PaidPlayer) {
				// if there is a paid player
				let MoneyForNewPlayer = 0; // track money to give to new player
				for (let i = 0; i < this.Properties.length; i++) {
					// go through all properties
					const CurrentProperty = this.Properties[i];
					if (CurrentProperty.Owner && CurrentProperty.Owner.ID == Player.ID) {
						if (!CurrentProperty.Houses) {
							return;
						} // if there is an owner and its the bankrupt player

						for (let j = CurrentProperty.Houses; j > 0; j--) {
							// go through all houses
							CurrentProperty.Houses--; // remove house
							if (!CurrentProperty.Building) {
								return;
							}

							MoneyForNewPlayer += Math.round(CurrentProperty.Building / 2); // add half house worth to money for new player
						}

						CurrentProperty.Buy(Player.PaidPlayer); // change the property over to the new player
					}
				}

				if (MoneyForNewPlayer > 0) {
					// if the money for the new player is more than 0
					Player.PaidPlayer.AddMoney(MoneyForNewPlayer); // pay the player
				}
			} else {
				// no paid player
				this.CurrentPlayerIndex--; // go back to previous player (so that when we increase it again it goes to the real next player and doesn't skip)
				for (let i = 0; i < this.Properties.length; i++) {
					// go through all propertys
					const CurrentProperty = this.Properties[i];
					if (CurrentProperty.Owner && CurrentProperty.Owner.ID == Player.ID) {
						// if owner and is the bankrupt player
						CurrentProperty.Houses = 0; // remove houses
						CurrentProperty.Owner = undefined; // remove owner
						CurrentProperty.Mortgaged = false; // unmortgage
					}
				}
			}

			if (this.Players.size == 1) {
				// if last player
				await client.sendMessage(
					this.channel,
					`CONGRATS ${Array.from(this.Players.values())[0].name} YOU WON!`
				); // won
				client.mgames.delete(this.channel); // delete game
			}
		}
	}

	async End(member: pkg.Contact, message: pkg.Message) {
		// end turn
		const userID = member.number;
		if (!this.CurrentPlayer) {
			return;
		}

		if (!this.InProgress) {
			return message.reply("the game hasen't started yet!");
		} // if not in progress

		if (userID != this.CurrentPlayer.ID) {
			return message.reply('its not your turn');
		} // if not their turn

		if (!this.CurrentPlayer.Rolled) {
			return message.reply("you haven't rolled yet");
		} // if haven't rolled

		await this.CheckAndHandleBankrupt(message, this.CurrentPlayer); // check for bankruptcy
		const price = this.Properties[this.CurrentPlayer.Position].Price;
		if (!price) {
			return;
		}

		if (
			this.Properties[this.CurrentPlayer.Position].Owner == null &&
			price > 0
		) {
			// if the current property doesn't have an owner and can be bought
			this.Bidding = true; // start bid
			this.HighestBid = 0; // highest bid of 0
			this.Bidders = Array.from(this.Players.values()); // put all players into an array that copys the players
			this.BiddersIndex = this.CurrentPlayerIndex; // Start off with the current player
			await client.sendMessage(
				this.channel,
				`${this.Bidders[this.BiddersIndex].name} its your turn to bid!\nmp bid quit to quit bidding\nmp bid {amount} to bid\n\n(Current bid is $${this.HighestBid})`
			);
			// start bid
		} else if (this.Players.size > 1) {
			// if bought or can't be bought
			this.CurrentPlayer.Rolled = false; // reset rolled
			if (this.CurrentPlayer.Doubles && this.CurrentPlayer.Money >= 0) {
				// if its doubles and they didn't go bankrupt
				await client.sendMessage(
					this.channel,
					`${member.name || member.number}, roll again!`
				);
			} else {
				// if it wasn't doubles or they went bankrupt
				this.CurrentPlayerIndex++; // next player
				if (this.CurrentPlayerIndex >= this.Players.size) {
					this.CurrentPlayerIndex = 0;
				} // if past the last player reset to first

				this.CurrentPlayer = Array.from(this.Players.values())[
					this.CurrentPlayerIndex
				]; // get current player
				await client.sendMessage(
					this.channel,
					`${this.CurrentPlayer.name} it's your turn! You have $${this.CurrentPlayer.Money}`
				);
			}
		}
	}

	async Auction(member: pkg.Contact, message: pkg.Message, args: any[]) {
		// bidding
		const userID = member.number;
		if (!this.InProgress) {
			return message.reply("the game hasen't started yet!");
		} // must be in progress

		if (!this.Bidding) {
			return message.reply("we aren't currently bidding");
		} // must be bidding

		if (this.Bidders[this.BiddersIndex].ID != userID) {
			return message.reply(
				`the current bidder is ${this.Bidders[this.BiddersIndex].name}!`
			);
		} // must be current bidder

		let amount = args[0];
		if (!amount) {
			return client.sendMessage(
				this.channel,
				'`mp bid [amount]` or `mp bid quit`'
			);
		}

		if (amount.toLowerCase() == 'quit') {
			// if they quit
			this.Bidders.splice(this.BiddersIndex, 1); // remove the bidder
			await client.sendMessage(
				this.channel,
				`${member.name || member.number}, removed you from the bidders`
			);
			if (this.Bidders.length == 1) {
				if (!this.CurrentPlayer) {
					return;
				} // if only 1 bidder

				this.Bidding = false; // stop bidding
				const winner = this.Players.get(this.Bidders[0].ID);
				if (!winner) {
					return;
				} // winner as a player

				const CurrentProperty = this.Properties[this.CurrentPlayer.Position]; // get the property they won
				await client.sendMessage(
					this.channel,
					`${winner.name} congrats you won ${this.Properties[this.CurrentPlayer.Position].Name} for $${this.HighestBid}!`
				); // inform
				winner.RemoveMoney(message, this.HighestBid, null); // remove money
				CurrentProperty.Buy(winner); // buy it
				this.CurrentPlayer.Rolled = false; // set rolled to false
				if (this.CurrentPlayer.Doubles) {
					// if they rolled doubles
					await client.sendMessage(
						this.channel,
						`${this.CurrentPlayer.name}, you rolled doubles so you get to roll again!`
					);
				} else {
					// didn't roll doubles
					this.CurrentPlayerIndex++;
					if (this.CurrentPlayerIndex >= this.Players.size) {
						this.CurrentPlayerIndex = 0;
					} // reset to 0

					this.CurrentPlayer = Array.from(this.Players.values())[
						this.CurrentPlayerIndex
					];
					await client.sendMessage(
						this.channel,
						`${this.CurrentPlayer.name} it's your turn!`
					);
				}
			} else {
				// still more than 1 bidder
				if (this.BiddersIndex >= this.Bidders.length) {
					this.BiddersIndex = 0;
				} // go to next bidder

				await client.sendMessage(
					this.channel,
					`${this.Bidders[this.BiddersIndex].name} its your turn to bid!\n\`mp bid quit\` to quit bidding\n\`mp bid {amount}\` to bid\n\n(Current bid is $${this.HighestBid})`
				);
			}
		} else {
			// didn't quit
			amount = parseInt(amount); // convert to int
			if (!amount) {
				return client.sendMessage(
					this.channel,
					`${member.name || member.number}, you must specify a valid amount or say mp bid quit`
				);
			}

			if (amount <= this.HighestBid) {
				return client.sendMessage(
					this.channel,
					`${userID}, you must bid higher than $${this.HighestBid} or say mp bid quit`
				);
			} // has to be higher

			if (amount > this.Bidders[this.BiddersIndex].Money) {
				return client.sendMessage(
					this.channel,
					`${member.name || member.number}, thats above the amount of money you have!`
				);
			}

			this.HighestBid = amount; // set highest bid
			this.BiddersIndex++; // next bidder
			if (this.BiddersIndex >= this.Bidders.length) {
				this.BiddersIndex = 0;
			}

			await client.sendMessage(
				this.channel,
				`${this.Bidders[this.BiddersIndex].name} its your turn to bid!\n\`mp bid quit\` to quit bidding\n\`mp bid {amount}\` to bid\n\n(Current bid is $${this.HighestBid})`
			);
		}
	}

	async BuyProperty(member: pkg.Contact, message: pkg.Message) {
		// Buy a house
		const userID = member.number;
		if (!this.CurrentPlayer) {
			return;
		}

		if (!this.InProgress) {
			return message.reply("the game hasen't started yet!");
		} // has to have started

		if (userID != this.CurrentPlayer.ID) {
			return message.reply('its not your turn');
		} // gotta be your turn

		let LeastHouses = 10; // least house is 10 (just has to be more than 5)
		let PropertyIndex; // null at first
		for (let i = 0; i < this.Properties.length; i++) {
			// go through all propertys
			const CurrentProperty = this.Properties[i];
			if (!CurrentProperty.Houses) {
				return;
			}

			if (
				CurrentProperty.Owner &&
				CurrentProperty.Houses < LeastHouses &&
				CurrentProperty.Owner.ID == this.CurrentPlayer.ID &&
				CurrentProperty.Color != 'RR' &&
				CurrentProperty.Color != 'Utility'
			) {
				// if there is an owner, it has the least num of houses and the owner is the player
				if (
					CurrentProperty.Color == 'DARK_ORANGE' ||
					CurrentProperty.Color == 'DARK_BLUE'
				) {
					if (CurrentProperty.Owner[CurrentProperty.Color] == 2) {
						// owns all 2
						LeastHouses = CurrentProperty.Houses; // set least houses
						PropertyIndex = i; // set property to current house
					}
				} else {
					// not orange or blue
					// @ts-ignore
					if (CurrentProperty.Owner[CurrentProperty.Color] == 3) {
						// owns all 3
						LeastHouses = CurrentProperty.Houses;
						PropertyIndex = i;
					}
				}
			}
		}

		if (!PropertyIndex) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you can't buy a house on anything!`
			);
		}

		const CurrentProperty = this.Properties[PropertyIndex];
		if (CurrentProperty.Houses == 5) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you can't build anymore houses`
			);
		} // if theres already 5 houses

		if (!CurrentProperty.Building) {
			return;
		}

		if (CurrentProperty.Building > this.CurrentPlayer.Money) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you don't have enough money to build a house`
			);
		}

		this.CurrentPlayer.RemoveMoney(
			message,
			this.Properties[PropertyIndex].Building,
			null
		); // remove money for the building cost
		// @ts-ignore
		this.Properties[PropertyIndex].Houses++; // increase houses
		await client.sendMessage(
			this.channel,
			`${member.name || member.number}, you spent $${this.Properties[PropertyIndex].Building} and now have ${this.Properties[PropertyIndex].Houses} ${this.Properties[PropertyIndex].Houses == 1 ? 'house' : 'houses'} on ${this.Properties[PropertyIndex].Name}!`
		);
	}

	async Sell(message: pkg.Message, member: pkg.Contact) {
		// sell a property
		if (!this.InProgress) {
			return message.reply("the game hasen't started yet!");
		} // if not in progress

		if (!this.CurrentPlayer) {
			return;
		}

		if (member.number != this.CurrentPlayer.ID) {
			return message.reply('its not your turn');
		} // if its not their turn

		const Arg = message.body.split(' ')[1]; // property arg
		const Money = parseInt(
			message.body.split(' ')[message.body.split(' ').length - 1]
		); // get last arg
		const mentions = await message.getMentions();
		const recievercontact = mentions[0]; // first mention
		if (!Arg) {
			return client.sendMessage(
				this.channel,
				'Do sell [property] [reciever] [cost]'
			);
		} // if there isn't a first arg

		let FoundHouseIndex;
		for (let i = 0; i < this.Properties.length; i++) {
			// go through all properties
			const CurrentProperty = this.Properties[i];
			if (
				CurrentProperty.Owner &&
				CurrentProperty.Name.toLowerCase().includes(Arg.toLowerCase()) &&
				CurrentProperty.Owner.ID == this.CurrentPlayer.ID
			) {
				// if theres an owner and name includes what was typed and the owner is the current player
				if (FoundHouseIndex) {
					// if already found a house
					return message.reply(
						'you have to be more specific with the property name'
					); // have to be more specific
				}
				FoundHouseIndex = i; // set found house index
			}
		}

		if (!FoundHouseIndex) {
			return message.reply("couldn't find that property");
		} // if haven't found a house

		if (!this.Properties[FoundHouseIndex]?.Houses) {
			return;
		}

		if (this.Properties[FoundHouseIndex]?.Houses > 0) {
			// if theres more than one house on it
			this.CurrentPlayer.AddMoney(
				Math.round(this.Properties[FoundHouseIndex].Building / 2)
			); // sell the house for half the house cost
			this.Properties[FoundHouseIndex].Houses--; // remove house
			await message.reply(
				`You sold 1 house for $${Math.round(this.Properties[FoundHouseIndex].Building / 2)} and now have ${this.Properties[FoundHouseIndex].Houses} ${this.Properties[FoundHouseIndex].Houses == 1 ? 'house' : 'houses'} on it!`
			);
		} else {
			// no houses
			if (!recievercontact) {
				return client.sendMessage(
					this.channel,
					'Do mp sell [property] [reciever] [amount]'
				);
			}

			const reciever = this.Players.get(recievercontact.number); // get the player
			if (!reciever) {
				return message.reply('invalid reciever!');
			}

			if (reciever == this.Players.get(member.number)) {
				return message.reply("you can't sell to yourself");
			} // can't sell to yourself

			switch (
				this.Properties[FoundHouseIndex].Color // get all the houses in the color and make sure there are no houses
			) {
				case 'DARK_ORANGE':
					if (this.Properties[1].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[1].Name} first!`
						);
					}
					if (this.Properties[3].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[3].Name} first!`
						);
					}

					break;
				case 'BLUE':
					if (this.Properties[6].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[6].Name} first!`
						);
					}
					if (this.Properties[8].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[8].Name} first!`
						);
					}
					if (this.Properties[9].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[9].Name} first!`
						);
					}

					break;
				case 'LUMINOUS_VIVID_PINK':
					if (this.Properties[11].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[11].Name} first!`
						);
					}
					if (this.Properties[13].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[13].Name} first!`
						);
					}
					if (this.Properties[14].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[14].Name} first!`
						);
					}

					break;
				case 'ORANGE':
					if (this.Properties[16].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[16].Name} first!`
						);
					}
					if (this.Properties[18].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[18].Name} first!`
						);
					}
					if (this.Properties[19].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[19].Name} first!`
						);
					}

					break;
				case 'DARK_RED':
					if (this.Properties[21].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[21].Name} first!`
						);
					}
					if (this.Properties[23].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[23].Name} first!`
						);
					}
					if (this.Properties[24].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[24].Name} first!`
						);
					}

					break;
				case 'GOLD':
					if (this.Properties[26].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[26].Name} first!`
						);
					}
					if (this.Properties[27].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[27].Name} first!`
						);
					}
					if (this.Properties[29].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[29].Name} first!`
						);
					}

					break;
				case 'DARK_GREEN':
					if (this.Properties[31].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[31].Name} first!`
						);
					}
					if (this.Properties[32].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[32].Name} first!`
						);
					}
					if (this.Properties[34].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[34].Name} first!`
						);
					}

					break;
				case 'DARK_BLUE':
					if (this.Properties[37].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[37].Name} first!`
						);
					}
					if (this.Properties[39].Houses > 0) {
						return message.reply(
							`you have to sell all the houses on ${this.Properties[39].Name} first!`
						);
					}

					break;
			}

			if (reciever.CurrentOffer) {
				return message.reply('they have a pending offer already!');
			} // if the reciever already has an offer

			reciever.CurrentOffer = new Offer(
				FoundHouseIndex,
				Money,
				this.CurrentPlayer
			); // set offer to the new offer
			await client.sendMessage(
				this.channel,
				`@${reciever.name}, ${member.name || member.number}> has offered you ${this.Properties[FoundHouseIndex].Name} for $${Money}`
			);
		}
	}

	async Offer(member: pkg.Contact, message: pkg.Message, args: any[]) {
		// accept or deny offers
		const userID = member.number;
		if (!this.InProgress) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, the game hasen't started yet!`
			);
		} // if not in progress

		if (!this.Players.has(userID)) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you aren't in the game!`
			);
		} // if they aren't in the game

		const Player = this.Players.get(userID); // get the player
		if (!Player.CurrentOffer) {
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, you don't have a pending offer`
			);
		} // if they don't have a current offer

		const Property = this.Properties[Player.CurrentOffer.PropertyIndex]; // get the property offered
		if (Player.CurrentOffer.OriginalOwner.ID != Property.Owner.ID) {
			// If the property is no longer owned by the offerer
			Player.CurrentOffer = null; // remove offer
			return client.sendMessage(
				this.channel,
				`${member.name || member.number}, someone already bought it!`
			);
		}

		let answer = args[0]; // get the first arg
		if (!answer) {
			return client.sendMessage(
				this.channel,
				'Syntax - mp offer [confirm|deny]'
			);
		} // if theres no answer or the answer isn't deny and there isn't an amount

		answer = answer.toLowerCase(); // change to lower case
		if (answer == 'confirm') {
			// if they confirm
			Property.Buy(Player); // buy
			Player.RemoveMoney(
				message,
				Player.CurrentOffer.Price,
				this.Players.get(Player.CurrentOffer.OriginalOwner.ID)
			); // remove money
			this.Players.get(Player.CurrentOffer.OriginalOwner.ID).AddMoney(
				Player.CurrentOffer.Price
			); // add money
			await client.sendMessage(
				this.channel,
				`${member.name || member.number}, you bought ${Property.Name} for $${Player.CurrentOffer.Price}`
			);
			Player.CurrentOffer = null; // remove offer
		} else if (answer == 'deny') {
			// deny
			Player.CurrentOffer = null; // remove offer
			return client.sendMessage(this.channel, 'Denied.');
		} else {
			// neither comfirm or deny
			return client.sendMessage(
				this.channel,
				'Syntax - mp offer [confirm|deny] {amount}'
			);
		}
	}

	async Mortgage(
		member: { number: any },
		message: { reply: (arg0: string) => any; body: string }
	) {
		// mortgage a property
		if (!this.InProgress) {
			return await message.reply("the game hasen't started yet!");
		} // not in progress

		if (member.number != this.CurrentPlayer.ID) {
			return await message.reply('its not your turn');
		} // not their turn

		const Arg = message.body.split(' ')[1]; // first arg
		if (!Arg) {
			return await message.reply(
				'you must specify what property you want to mortgage!'
			);
		} // no first arg

		let FoundHouseIndex;
		for (let i = 0; i < this.Properties.length; i++) {
			// go through all properties
			const CurrentProperty = this.Properties[i];
			if (
				CurrentProperty.Name.toLowerCase().includes(Arg.toLowerCase()) &&
				CurrentProperty.Owner.ID == this.CurrentPlayer.ID
			) {
				// if property name includes arg and is owned
				if (FoundHouseIndex) {
					// if already found house
					return await message.reply(
						'you have to be more specific with the property name'
					); // stop
				}
				// not found one
				FoundHouseIndex = i; // set it to current index
			}
		}

		if (!FoundHouseIndex) {
			return await message.reply("couldn't find that property");
		} // no index

		const FoundHouse = this.Properties[FoundHouseIndex]; // get found house
		if (FoundHouse.Mortgaged) {
			return await message.reply('that is already mortgaged');
		} // if its already mortgaged

		switch (
			FoundHouse.Color // have to sell houses on all properties of same color to mortgage
		) {
			case 'DARK_ORANGE':
				if (this.Properties[1].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[1].Name} first!`
					);
				}
				if (this.Properties[3].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[3].Name} first!`
					);
				}

				FoundHouse.Owner.DARK_ORANGE--;
				break;
			case 'BLUE':
				if (this.Properties[6].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[6].Name} first!`
					);
				}
				if (this.Properties[8].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[8].Name} first!`
					);
				}
				if (this.Properties[9].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[9].Name} first!`
					);
				}

				FoundHouse.Owner.BLUE--;
				break;
			case 'LUMINOUS_VIVID_PINK':
				if (this.Properties[11].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[11].Name} first!`
					);
				}
				if (this.Properties[13].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[13].Name} first!`
					);
				}
				if (this.Properties[14].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[14].Name} first!`
					);
				}

				FoundHouse.Owner.LUMINOUS_VIVID_PINK--;
				break;
			case 'ORANGE':
				if (this.Properties[16].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[16].Name} first!`
					);
				}
				if (this.Properties[18].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[18].Name} first!`
					);
				}
				if (this.Properties[19].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[19].Name} first!`
					);
				}

				FoundHouse.Owner.ORANGE--;
				break;
			case 'DARK_RED':
				if (this.Properties[21].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[21].Name} first!`
					);
				}
				if (this.Properties[23].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[23].Name} first!`
					);
				}
				if (this.Properties[24].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[24].Name} first!`
					);
				}

				FoundHouse.Owner.DARK_RED--;
				break;
			case 'GOLD':
				if (this.Properties[26].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[26].Name} first!`
					);
				}
				if (this.Properties[27].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[27].Name} first!`
					);
				}
				if (this.Properties[29].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[29].Name} first!`
					);
				}

				FoundHouse.Owner.GOLD--;
				break;
			case 'DARK_GREEN':
				if (this.Properties[31].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[31].Name} first!`
					);
				}
				if (this.Properties[32].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[32].Name} first!`
					);
				}
				if (this.Properties[34].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[34].Name} first!`
					);
				}

				FoundHouse.Owner.DARK_GREEN--;
				break;
			case 'DARK_BLUE':
				if (this.Properties[37].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[37].Name} first!`
					);
				}
				if (this.Properties[39].Houses > 0) {
					return await message.reply(
						`you have to sell all the houses on ${this.Properties[39].Name} first!`
					);
				}

				FoundHouse.Owner.DARK_BLUE--;
				break;
		}

		FoundHouse.Mortgaged = true; // mortgage
		FoundHouse.Owner.AddMoney(FoundHouse.Mortgage); // add money
		await message.reply(
			`you mortgaged ${FoundHouse.Name} for $${FoundHouse.Mortgage}`
		);
	}

	async Unmortgage(
		member: { number: any },
		message: { reply: (arg0: string) => any; body: string }
	) {
		// unmortage a house
		if (!this.InProgress) {
			return await message.reply("the game hasen't started yet!");
		} // has to be in progress

		if (member.number != this.CurrentPlayer.ID) {
			return await message.reply('its not your turn');
		} // if its not their turn

		const Arg = message.body.split(' ')[1]; // get property
		if (!Arg) {
			return await message.reply(
				'you must specify what property you want to unmortgage!'
			);
		}

		let FoundHouseIndex;
		for (let i = 0; i < this.Properties.length; i++) {
			// find it
			const CurrentProperty = this.Properties[i];
			if (
				CurrentProperty.Name.toLowerCase().includes(Arg.toLowerCase()) &&
				CurrentProperty.Owner.ID == this.CurrentPlayer.ID
			) {
				if (FoundHouseIndex) {
					return await message.reply(
						'you have to be more specific with the property name'
					);
				}
				FoundHouseIndex = i;
			}
		}

		if (!FoundHouseIndex) {
			return await message.reply("couldn't find that property");
		}

		const FoundHouse = this.Properties[FoundHouseIndex];
		if (!FoundHouse.Mortgaged) {
			return await message.reply("that isn't mortgaged");
		} // if it isn't mortgaged

		const Price = FoundHouse.Mortgage * 1.1; // the price to unmortgage is 110% the mortgage cost

		if (Price > this.CurrentPlayer.Money) {
			return await message.reply(
				`you don't have enough money to unmortgage it for $${Price}.`
			);
		} // if its over their price

		// @ts-ignore
		FoundHouse.Owner[FoundHouse.Color]++; // increase amount for color

		this.CurrentPlayer.RemoveMoney(message, Price, null); // pay for it

		FoundHouse.Mortgaged = false; // unmortgage

		await message.reply(`You bought back ${FoundHouse.Name} for $${Price}`);
	}

	async GetProperty(
		member: { number: any },
		message: { reply: (arg0: string) => any }
	) {
		// get properties owned
		if (!this.InProgress) {
			return await message.reply("the game hasen't started yet!");
		}

		if (!this.Players.has(member.number)) {
			return await message.reply("you aren't in this game");
		}

		const Player = this.Players.get(member.number);
		let PropertyEmbed = 'Property you own\n\n';
		for (let i = 0; i < this.Properties.length; i++) {
			const CurrentProperty = this.Properties[i];
			if (CurrentProperty.Owner && CurrentProperty.Owner.ID == Player.ID) {
				// if owned
				PropertyEmbed += `${
					CurrentProperty.Name
				}${CurrentProperty.Houses} ${CurrentProperty.Houses == 1 ? 'house' : 'houses'}`; // add
			}
		}

		await client.sendMessage(this.channel, PropertyEmbed);
	}
}
client.on('message_create', async message => {
	const prefix = 'Monopoly ';
	if (
		message.body.toLowerCase().startsWith('monopoly') ||
		message.body.toLowerCase().startsWith('mp')
	) {
		if (message.body.toLowerCase().startsWith('monopoly')) {
			message.body = message.body.slice(prefix.length);
		} else {
			message.body = message.body.slice(3);
		}

		const messageArray = message.body.split(' '); // splits the message into an array for every space into an array
		const cmd = messageArray[0].toLowerCase(); // command is first word in lowercase
		const args = messageArray.slice(1); // args is everything after the first word
		const channelid = await message.getChat();
		const channel = channelid.id._serialized;
		const member = await message.getContact();
		switch (
			cmd // get command
		) {
			case 'help': // help
				const HelpEmbed =
					'Help\n\n' +
					`${prefix}create` +
					'Makes a new monopoly game inside the this.channel\n\n' +
					`${prefix}start` +
					'Starts the game\n\n' +
					`${prefix}stop` +
					'Ends the game inside of the this.channel\n\n' +
					`${prefix}join` +
					'Join the game\n\n' +
					`${prefix}leave` +
					'Leave a game\n\n' +
					`${prefix}roll` +
					'Roll the dice!\n\n' +
					`${prefix}stats` +
					'Get information about yourself\n\n' +
					`${prefix}buy` +
					'Buy the property you are currently on\n\n' +
					`${prefix}end` +
					'Ends your turn\n\n' +
					`${prefix}bid [amount|quit]` +
					'Bid for the auction\n\n' +
					`${prefix}house` +
					'Buy houses\n\n' +
					`${prefix}sell [property] {reciever} {cost}` +
					'Sell property and houses (if theres a house no need to provide a reciever)\n\n' +
					`${prefix}offer [confirm|deny]` +
					'Accept or deny an offer from another player\n\n' +
					`${prefix}mortgage [property]` +
					'Put property up for mortgage\n\n' +
					`${prefix}unmortgage [property]` +
					'Rebuy property\n\n' +
					`${prefix}property` +
					'View all your owned properties and how many houses are on them\n\n';
				await client.sendMessage(channel, HelpEmbed);
				break;
			case 'create': // create game
				if (!client.mgames.has(channel)) {
					// if there isn't a game
					await client.mgames.set(channel, new MGame(member, channel)); // make a new game
				} else {
					// there is a game
					await message.reply('theres already a game in this channel!');
				}

				break;
			case 'stop': // stop
				if (client.mgames.has(channel)) {
					// if there is a game
					if (client.mgames.get(channel).Leader == member.number) {
						// if its the leader
						await client.mgames.delete(channel); // delete
						await client.sendMessage(channel, 'Game is over'); // mgames done
					} else {
						// not the leader
						await message.reply('only the leader can end this game.');
					}
				} else {
					// no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				}

				break;
			case 'join': // join game
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// there is a game
					client.mgames.get(channel).NewPlayer(member);
				}

				break;
			case 'leave': // leave game
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// there is a game
					client.mgames.get(channel).PlayerLeave(member, message);
				}

				break;
			case 'start': // start game
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Start(member);
				}

				break;
			case 'leader': // change leader
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).ChangeLeader(member, message);
				}

				break;
			case 'roll': // roll the dice
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Roll(member);
				}

				break;
			case 'stats': // get player stats
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Stats(message, member);
				}

				break;
			case 'buy': // buy property
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Buy(message, member);
				}

				break;
			case 'end': // end your turn
				if (!client.mgames.has(channel)) {
					// if there is no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).End(member, message); // end
				}

				break;
			case 'bid': // bid
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Auction(member, message, args);
				}

				break;
			case 'house': // buy a house
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).BuyProperty(member, message);
				}

				break;
			case 'sell': // sell houses or property to other players
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Sell(message, member);
				}

				break;
			case 'offer': // accept or deny an offer
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Offer(member, message, args);
				}

				break;
			case 'mortgage': // mortgage a house
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Mortgage(member, message);
				}

				break;
			case 'unmortgage': // unmortgage a house
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).Unmortgage(member, message);
				}

				break;
			case 'property': // view purchased property
				if (!client.mgames.has(channel)) {
					// if no game
					await message.reply(
						`there is no game in this channel. Do ${prefix}create to make a game`
					);
				} else {
					// if game
					client.mgames.get(channel).GetProperty(member, message);
				}

				break;
		}
	}
});
export { Property, Player, Card, Offer, MGame };
