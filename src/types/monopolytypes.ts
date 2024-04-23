import {
	type Offer,
	type Player,
	type Property,
} from '../commands/monopoly/monopoly.js';

export type MonopolyProperty = {
	Name: string;
	Rent: number[] | number;
	Color: string;
	Price?: number;
	Mortgage?: number;
	Building?: number;
	Mortgaged?: boolean;
	Owner?: Player | undefined;
	Houses?: number;
	Image?: string;

	Buy(NewOwner: Player): void;

	Info(channel: string): Promise<void>;
};

export type MonopolyPlayer = {
	cls: number[];
	ID: string;
	channel: string;
	name: string;
	Position: number; // What position they are
	Money: number; // How much money
	RR: number; // How many RRs
	Jailed: boolean; // If they are jailed
	color: number; // What color they are
	DARK_ORANGE: number; // How many brown houses
	BLUE: number; // How many light blue houses
	LUMINOUS_VIVID_PINK: number; // how many pink houses
	Utility: number; // How many utilitys
	ORANGE: number; // How many orange houses
	DARK_RED: number; // How many red houses
	GOLD: number; // How many yellow houses
	DARK_GREEN: number; // How many green houses
	DARK_BLUE: number; // How many dark blue houses
	GetOutOfJail: number; // How many get out of jail cards they have
	Doubles: boolean; // If they just rolled doubles
	Rolled: boolean; // If they have roled yet
	DoublesStreak: number; // How many times they've rolled doubles
	Worth: number; // How much all their properties are worth
	JailTime: number; // How long they have been in jail
	CurrentOffer: undefined | Offer; // If they have a current offer
	PaidPlayer: undefined | Player; // Last player they paid
	RemoveMoney(
		member: Player,
		num: number,
		OtherPlayer: Player | undefined
	): Promise<void>;

	AddMoney(num: number): void;

	Move(
		member: Player,
		spaces: number,
		Properties: Property[]
	): Promise<unknown>;

	Free(): void;

	Jail(): void;
};

export type MonopolyOffer = {
	PropertyIndex: number;
	Price: number;
	OriginalOwner: Player;
};

export type MonopolyCard = {
	Text: string;
	Money: number;
	GetOutOfJail: boolean;
	MoveTo: number | undefined;
	CollectFromPlayers: boolean;
};

export type MonopolyGame = {
	channel: string;
	HighestBid: number;
	Bidders: Player[];
	Bidding: boolean;
	BiddersIndex: number;
	CurrentPlayerIndex: number;
	InProgress: boolean;
	Leader: string;
	Players: Map<string, Player>;
	CurrentPlayer: Player | undefined;
	Properties: Property[];
};
