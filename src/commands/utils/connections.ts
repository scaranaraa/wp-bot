const conns = [
	{
		id: 1,
		date: '2023-06-12',
		answers: [
			{
				level: 0,
				group: 'WET WEATHER',
				members: ['HAIL', 'RAIN', 'SLEET', 'SNOW'],
			},
			{
				level: 1,
				group: 'NBA TEAMS',
				members: ['BUCKS', 'HEAT', 'JAZZ', 'NETS'],
			},
			{
				level: 2,
				group: 'KEYBOARD KEYS',
				members: ['OPTION', 'RETURN', 'SHIFT', 'TAB'],
			},
			{
				level: 3,
				group: 'PALINDROMES',
				members: ['KAYAK', 'LEVEL', 'MOM', 'RACECAR'],
			},
		],
	},
	{
		id: 2,
		date: '2023-06-13',
		answers: [
			{
				level: 0,
				group: 'FOOTWEAR',
				members: ['BOOT', 'LOAFER', 'PUMP', 'SNEAKER'],
			},
			{
				level: 1,
				group: 'UNITS OF LENGTH',
				members: ['FOOT', 'LEAGUE', 'MILE', 'YARD'],
			},
			{
				level: 2,
				group: 'MAGAZINES',
				members: ['ESSENCE', 'PEOPLE', 'TIME', 'US'],
			},
			{
				level: 3,
				group: 'LETTER HOMOPHONES',
				members: ['ARE', 'QUEUE', 'SEA', 'WHY'],
			},
		],
	},
	{
		id: 3,
		date: '2023-06-14',
		answers: [
			{
				level: 0,
				group: 'FACIAL FEATURES',
				members: ['CHEEK', 'EYE', 'MOUTH', 'NOSE'],
			},
			{
				level: 1,
				group: 'SYNONYMS FOR EAT',
				members: ['CHOW', 'GOBBLE', 'SCARF', 'WOLF'],
			},
			{
				level: 2,
				group: 'DOG BREEDS, INFORMALLY',
				members: ['LAB', 'PEKE', 'PIT', 'POM'],
			},
			{
				level: 3,
				group: 'MEMBERS OF A TRIO',
				members: ['AMIGO', 'KING', 'STOOGE', 'TENOR'],
			},
		],
	},
	{
		id: 4,
		date: '2023-06-15',
		answers: [
			{
				level: 0,
				group: 'SNEAKER BRANDS',
				members: ['ADIDAS', 'NIKE', 'PUMA', 'REEBOK'],
			},
			{
				level: 1,
				group: 'MUSICALS BEGINNING WITH \u201cC\u201d',
				members: ['CABARET', 'CAROUSEL', 'CATS', 'CHICAGO'],
			},
			{
				level: 2,
				group: 'CLEANING VERBS',
				members: ['DUST', 'MOP', 'SWEEP', 'VACUUM'],
			},
			{
				level: 3,
				group: '___ MAN SUPERHEROES',
				members: ['BAT', 'IRON', 'SPIDER', 'SUPER'],
			},
		],
	},
	{
		id: 5,
		date: '2023-06-16',
		answers: [
			{
				level: 0,
				group: 'STREAMING SERVICES',
				members: ['HULU', 'NETFLIX', 'PEACOCK', 'PRIME'],
			},
			{
				level: 1,
				group: 'CONDIMENTS',
				members: ['KETCHUP', 'MAYO', 'RELISH', 'TARTAR'],
			},
			{
				level: 2,
				group: 'SYNONYMS FOR SAD',
				members: ['BLUE', 'DOWN', 'GLUM', 'LOW'],
			},
			{
				level: 3,
				group: 'CLUE CHARACTERS',
				members: ['GREEN', 'MUSTARD', 'PLUM', 'SCARLET'],
			},
		],
	},
	{
		id: 6,
		date: '2023-06-17',
		answers: [
			{
				level: 0,
				group: 'MONOPOLY SQUARES',
				members: ['BOARDWALK', 'CHANCE', 'GO', 'JAIL'],
			},
			{
				level: 1,
				group: 'SHADES OF BLUE',
				members: ['BABY', 'MIDNIGHT', 'POWDER', 'ROYAL'],
			},
			{
				level: 2,
				group: 'RAPPERS',
				members: ['COMMON', 'FUTURE', 'ICE CUBE', 'Q-TIP'],
			},
			{
				level: 3,
				group: 'MEMBERS OF A SEPTET',
				members: ['SEA', 'SIN', 'SISTER', 'WONDER'],
			},
		],
	},
	{
		id: 7,
		date: '2023-06-18',
		answers: [
			{
				level: 0,
				group: 'LEG PARTS',
				members: ['ANKLE', 'KNEE', 'SHIN', 'THIGH'],
			},
			{
				level: 1,
				group: 'BABY ANIMALS',
				members: ['CALF', 'CUB', 'JOEY', 'KID'],
			},
			{
				level: 2,
				group: 'SLANG FOR TOILET',
				members: ['CAN', 'HEAD', 'JOHN', 'THRONE'],
			},
			{
				level: 3,
				group: '___ FISH THAT AREN\u2019T FISH',
				members: ['CRAY', 'JELLY', 'SILVER', 'STAR'],
			},
		],
	},
	{
		id: 8,
		date: '2023-06-19',
		answers: [
			{
				level: 0,
				group: 'BOARD GAMES',
				members: ['BACKGAMMON', 'CHECKERS', 'CHESS', 'GO'],
			},
			{
				level: 1,
				group: 'MATTRESS SIZES',
				members: ['FULL', 'KING', 'QUEEN', 'TWIN'],
			},
			{
				level: 2,
				group: 'THINGS THAT ARE RED',
				members: ['CHERRY', 'FIRE TRUCK', 'RUBY', 'STOP SIGN'],
			},
			{
				level: 3,
				group: 'THINGS WITH KEYS',
				members: ['CRYPTOGRAPHY', 'FLORIDA', 'LOCKSMITH', 'PIANO'],
			},
		],
	},
	{
		id: 9,
		date: '2023-06-20',
		answers: [
			{
				level: 0,
				group: 'SPORTS',
				members: ['CRICKET', 'FENCING', 'POLO', 'SQUASH'],
			},
			{
				level: 1,
				group: 'TOPS',
				members: ['CAMI', 'HALTER', 'TANK', 'TEE'],
			},
			{
				level: 2,
				group: 'VEGETABLES',
				members: ['BEET', 'CARROT', 'CORN', 'ONION'],
			},
			{
				level: 3,
				group: 'INSECTS',
				members: ['ANT', 'BEETLE', 'MANTIS', 'TERMITE'],
			},
		],
	},
	{
		id: 10,
		date: '2023-06-21',
		answers: [
			{
				level: 0,
				group: 'FRUIT',
				members: ['DATE', 'KIWI', 'LEMON', 'ORANGE'],
			},
			{
				level: 1,
				group: 'COUNTRIES',
				members: ['CHAD', 'GEORGIA', 'JORDAN', 'TOGO'],
			},
			{
				level: 2,
				group: 'BIRDS',
				members: ['CRANE', 'JAY', 'SWALLOW', 'TURKEY'],
			},
			{
				level: 3,
				group: 'ZODIAC SYMBOLS',
				members: ['FISH', 'GOAT', 'SCALES', 'TWINS'],
			},
		],
	},
	{
		id: 11,
		date: '2023-06-22',
		answers: [
			{
				level: 0,
				group: 'SPICES BEGINNING WITH \u201cC\u201d',
				members: ['CARDAMOM', 'CLOVE', 'CORIANDER', 'CUMIN'],
			},
			{
				level: 1,
				group: 'TERMS OF ENDEARMENT',
				members: ['BOO', 'HONEY', 'SUGAR', 'SWEETIE'],
			},
			{
				level: 2,
				group: 'THINGS WITH WINGS',
				members: ['AIRPLANE', 'ANGEL', 'BIRD', 'PEGASUS'],
			},
			{
				level: 3,
				group: 'SPICE GIRLS',
				members: ['BABY', 'GINGER', 'POSH', 'SCARY'],
			},
		],
	},
	{
		id: 12,
		date: '2023-06-23',
		answers: [
			{
				level: 0,
				group: 'ANIMAL GROUP NAMES',
				members: ['FLOCK', 'PACK', 'POD', 'SCHOOL'],
			},
			{
				level: 1,
				group: 'DEADLY SINS',
				members: ['ENVY', 'GREED', 'LUST', 'PRIDE'],
			},
			{
				level: 2,
				group: 'SLOW ANIMALS',
				members: ['LORIS', 'SLOTH', 'SNAIL', 'TORTOISE'],
			},
			{
				level: 3,
				group: 'TRIG FUNCTIONS',
				members: ['COT', 'SEC', 'SIN', 'TAN'],
			},
		],
	},
	{
		id: 13,
		date: '2023-06-24',
		answers: [
			{
				level: 0,
				group: 'AIRLINES',
				members: ['FRONTIER', 'SPIRIT', 'UNITED', 'VIRGIN'],
			},
			{
				level: 1,
				group: 'GREEK LETTERS',
				members: ['BETA', 'CHI', 'DELTA', 'IOTA'],
			},
			{
				level: 2,
				group: 'SILENT \u201cG\u201d',
				members: ['GNAT', 'GNAW', 'GNOCCHI', 'GNOME'],
			},
			{
				level: 3,
				group: 'HOMOPHONES',
				members: ['GNU', 'KNEW', 'NEW', 'NU'],
			},
		],
	},
	{
		id: 14,
		date: '2023-06-25',
		answers: [
			{
				level: 0,
				group: 'BEDS',
				members: ['BUNK', 'CANOPY', 'MURPHY', 'TRUNDLE'],
			},
			{
				level: 1,
				group: 'FAMOUS BROTHERS',
				members: ['JONAS', 'MARX', 'WARNER', 'WRIGHT'],
			},
			{
				level: 2,
				group: 'HONDAS',
				members: ['ACCORD', 'CIVIC', 'PASSPORT', 'PILOT'],
			},
			{
				level: 3,
				group: 'VIDEO GAME CHARACTERS',
				members: ['CRASH', 'LINK', 'MARIO', 'SONIC'],
			},
		],
	},
	{
		id: 15,
		date: '2023-06-26',
		answers: [
			{
				level: 0,
				group: 'BIRD SOUNDS',
				members: ['CAW', 'CHIRP', 'CLUCK', 'TWEET'],
			},
			{
				level: 1,
				group: 'COLORS',
				members: ['BROWN', 'PINK', 'TURQUOISE', 'VIOLET'],
			},
			{
				level: 2,
				group: 'FISHING GEAR',
				members: ['LURE', 'REEL', 'ROD', 'TACKLE'],
			},
			{
				level: 3,
				group: 'FICTIONAL PIRATES',
				members: ['HOOK', 'JONES', 'SILVER', 'SPARROW'],
			},
		],
	},
	{
		id: 16,
		date: '2023-06-27',
		answers: [
			{
				level: 0,
				group: 'COFFEE DRINKS',
				members: ['AMERICANO', 'CAPPUCCINO', 'ESPRESSO', 'LATTE'],
			},
			{
				level: 1,
				group: 'TREE NUTS',
				members: ['ALMOND', 'CASHEW', 'PECAN', 'WALNUT'],
			},
			{
				level: 2,
				group: 'SHADES OF GREEN',
				members: ['EMERALD', 'FOREST', 'KELLY', 'OLIVE'],
			},
			{
				level: 3,
				group: 'MR. ___',
				members: ['BEAN', 'CLEAN', 'FOX', 'PEANUT'],
			},
		],
	},
	{
		id: 17,
		date: '2023-06-28',
		answers: [
			{
				level: 0,
				group: 'NECKWEAR',
				members: ['ASCOT', 'BOLO', 'SCARF', 'TIE'],
			},
			{
				level: 1,
				group: 'SHIP DIRECTIONS',
				members: ['BOW', 'PORT', 'STARBOARD', 'STERN'],
			},
			{
				level: 2,
				group: 'DETERGENTS',
				members: ['ALL', 'ERA', 'GAIN', 'TIDE'],
			},
			{
				level: 3,
				group: '___ TRIANGLE',
				members: ['ACUTE', 'BERMUDA', 'LOVE', 'RIGHT'],
			},
		],
	},
	{
		id: 18,
		date: '2023-06-29',
		answers: [
			{
				level: 0,
				group: 'MUSCLES, INFORMALLY',
				members: ['LAT', 'PEC', 'QUAD', 'TRI'],
			},
			{
				level: 1,
				group: 'AWARDS',
				members: ['CUP', 'MEDAL', 'RIBBON', 'TROPHY'],
			},
			{
				level: 2,
				group: 'TITLE TV DOCTORS',
				members: ['GREY', 'HOUSE', 'HOWSER', 'QUINN'],
			},
			{
				level: 3,
				group: 'NFL PLAYERS',
				members: ['BEAR', 'BILL', 'BROWN', 'COMMANDER'],
			},
		],
	},
	{
		id: 19,
		date: '2023-06-30',
		answers: [
			{
				level: 0,
				group: 'OFF-WHITE SHADES',
				members: ['CREAM', 'EGGSHELL', 'IVORY', 'VANILLA'],
			},
			{
				level: 1,
				group: 'ANTI-VAMPIRE',
				members: ['CRUCIFIX', 'GARLIC', 'MIRROR', 'STAKE'],
			},
			{
				level: 2,
				group: 'KINDS OF MEAT',
				members: ['BEEF', 'PORK', 'POULTRY', 'VENISON'],
			},
			{
				level: 3,
				group: 'SYNONYMS FOR ARGUMENT',
				members: ['ROW', 'QUARREL', 'SPAT', 'TIFF'],
			},
		],
	},
	{
		id: 20,
		date: '2023-07-01',
		answers: [
			{
				level: 0,
				group: 'GRAINS',
				members: ['BARLEY', 'OAT', 'RYE', 'SPELT'],
			},
			{
				level: 1,
				group: 'ROYAL TITLES',
				members: ['BARON', 'EARL', 'KING', 'PRINCE'],
			},
			{
				level: 2,
				group: 'UNIVERSITIES',
				members: ['BROWN', 'DUKE', 'HOWARD', 'RICE'],
			},
			{
				level: 3,
				group: 'BEST DIRECTOR OSCAR WINNERS',
				members: ['BONG', 'FORD', 'LEE', 'STONE'],
			},
		],
	},
	{
		id: 21,
		date: '2023-07-02',
		answers: [
			{
				level: 0,
				group: 'MUSIC GENRES',
				members: ['JAZZ', 'POP', 'PUNK', 'RAP'],
			},
			{
				level: 1,
				group: 'WEB BROWSERS',
				members: ['CHROME', 'EDGE', 'OPERA', 'SAFARI'],
			},
			{
				level: 2,
				group: '\u201cLITTLE WOMEN\u201d SISTERS',
				members: ['AMY', 'BETH', 'JO', 'MEG'],
			},
			{
				level: 3,
				group: 'LIL ___ RAPPERS',
				members: ['BABY', 'JON', 'KIM', 'WAYNE'],
			},
		],
	},
	{
		id: 22,
		date: '2023-07-03',
		answers: [
			{
				level: 0,
				group: 'DOG BREEDS',
				members: ['BOXER', 'DALMATIAN', 'HUSKY', 'POODLE'],
			},
			{
				level: 1,
				group: 'ANIMAL NOSES',
				members: ['BEAK', 'MUZZLE', 'SNOUT', 'TRUNK'],
			},
			{
				level: 2,
				group: 'TRAFFIC SIGNS',
				members: ['DETOUR', 'SLOW', 'STOP', 'YIELD'],
			},
			{
				level: 3,
				group: 'SOUND ___',
				members: ['ASLEEP', 'BARRIER', 'BITE', 'WAVE'],
			},
		],
	},
	{
		id: 23,
		date: '2023-07-04',
		answers: [
			{
				level: 0,
				group: '60\u2019s BAND MEMBERS',
				members: ['BEACH BOY', 'BEATLE', 'BYRD', 'MONKEE'],
			},
			{
				level: 1,
				group: 'DANCE FADS',
				members: ['DOUGIE', 'MACARENA', 'MASHED POTATO', 'TWIST'],
			},
			{
				level: 2,
				group: 'MAGAZINES',
				members: ['FORTUNE', 'ROLLING STONE', 'VOGUE', 'WIRED'],
			},
			{
				level: 3,
				group: 'THINGS WITH LINKS',
				members: ['CHAIN', 'GOLF COURSE', 'SAUSAGE', 'WEBSITE'],
			},
		],
	},
	{
		id: 24,
		date: '2023-07-05',
		answers: [
			{
				level: 0,
				group: 'CANDY BARS',
				members: ['BOUNTY', 'CRUNCH', 'HEATH', 'MILKY WAY'],
			},
			{
				level: 1,
				group: 'VIDEO GAME CONSOLES',
				members: ['DREAMCAST', 'GENESIS', 'SWITCH', 'WII'],
			},
			{
				level: 2,
				group: 'EAR PARTS',
				members: ['ANVIL', 'COCHLEA', 'HAMMER', 'STIRRUP'],
			},
			{
				level: 3,
				group: 'BAND NAMES MINUS NUMBERS',
				members: ['BLINK', 'MAROON', 'SUM', 'U'],
			},
		],
	},
	{
		id: 25,
		date: '2023-07-06',
		answers: [
			{
				level: 0,
				group: 'DESSERTS',
				members: ['CHEESECAKE', 'FLAN', 'MOUSSE', 'TIRAMISU'],
			},
			{
				level: 1,
				group: 'MILD OATHS',
				members: ['DARN', 'FUDGE', 'HECK', 'SHOOT'],
			},
			{
				level: 2,
				group: 'ANIMALS WITH TUSKS',
				members: ['ELEPHANT', 'HIPPO', 'NARWHAL', 'WARTHOG'],
			},
			{
				level: 3,
				group: 'MUSTACHES',
				members: ['HANDLEBAR', 'HORSESHOE', 'PENCIL', 'WALRUS'],
			},
		],
	},
	{
		id: 26,
		date: '2023-07-07',
		answers: [
			{
				level: 0,
				group: 'EUROPEAN COUNTRIES',
				members: ['DENMARK', 'GREECE', 'POLAND', 'PORTUGAL'],
			},
			{
				level: 1,
				group: 'SYNONYMS FOR IMITATE',
				members: ['COPY', 'ECHO', 'MIMIC', 'PARROT'],
			},
			{
				level: 2,
				group: 'TOMS',
				members: ['CRUISE', 'HOLLAND', 'PETTY', 'WAITS'],
			},
			{
				level: 3,
				group: 'WORDS SPELLED WITH ROMAN NUMERALS',
				members: ['DILL', 'LIVID', 'MILD', 'MIX'],
			},
		],
	},
	{
		id: 27,
		date: '2023-07-08',
		answers: [
			{
				level: 0,
				group: 'HATS',
				members: ['BERET', 'BOWLER', 'FEDORA', 'FEZ'],
			},
			{
				level: 1,
				group: 'ORGANS',
				members: ['HEART', 'KIDNEY', 'LIVER', 'LUNG'],
			},
			{
				level: 2,
				group: 'PARTS OF A BOOK',
				members: ['COVER', 'JACKET', 'PAGE', 'SPINE'],
			},
			{
				level: 3,
				group: 'JACK ___',
				members: ['ASS', 'KNIFE', 'POT', 'RABBIT'],
			},
		],
	},
	{
		id: 28,
		date: '2023-07-09',
		answers: [
			{
				level: 0,
				group: 'SEVEN DWARFS',
				members: ['BASHFUL', 'DOC', 'GRUMPY', 'HAPPY'],
			},
			{
				level: 1,
				group: 'FILE EXTENSIONS',
				members: ['GIF', 'PDF', 'TIFF', 'ZIP'],
			},
			{
				level: 2,
				group: 'FLIGHTLESS BIRDS',
				members: ['EMU', 'KIWI', 'OSTRICH', 'PENGUIN'],
			},
			{
				level: 3,
				group: 'TROPICAL FRUITS',
				members: ['BANANA', 'COCONUT', 'MANGO', 'PINEAPPLE'],
			},
		],
	},
	{
		id: 29,
		date: '2023-07-10',
		answers: [
			{
				level: 0,
				group: 'WINGED INSECTS',
				members: ['FLY', 'GNAT', 'MOTH', 'WASP'],
			},
			{
				level: 1,
				group: 'ARITHMETIC OPERATIONS',
				members: ['ADD', 'DIVIDE', 'MULTIPLY', 'SUBTRACT'],
			},
			{
				level: 2,
				group: 'FISH',
				members: ['TANG', 'TETRA', 'SKATE', 'SOLE'],
			},
			{
				level: 3,
				group: '___ CAT',
				members: ['ALLEY', 'COOL', 'COPY', 'LAP'],
			},
		],
	},
	{
		id: 30,
		date: '2023-07-11',
		answers: [
			{
				level: 0,
				group: 'NFL PLAYERS',
				members: ['BRONCO', 'COWBOY', 'PACKER', 'RAVEN'],
			},
			{
				level: 1,
				group: 'PASTA SHAPES',
				members: ['BOWTIE', 'ELBOW', 'SHELL', 'SPIRAL'],
			},
			{
				level: 2,
				group: 'JOINTS',
				members: ['HIP', 'KNEE', 'SHOULDER', 'WRIST'],
			},
			{
				level: 3,
				group: 'MOVIES WITH \u201c!\u201d',
				members: ['AIRPLANE', 'MOTHER', 'OKLAHOMA', 'THEM'],
			},
		],
	},
	{
		id: 31,
		date: '2023-07-12',
		answers: [
			{
				level: 0,
				group: 'VEGETABLES THAT ARE ALSO FRUITS',
				members: ['CUCUMBER', 'EGGPLANT', 'PEPPER', 'TOMATO'],
			},
			{
				level: 1,
				group: '3-D SHAPES',
				members: ['CONE', 'CUBE', 'PYRAMID', 'SPHERE'],
			},
			{
				level: 2,
				group: 'WORDS WITH \u201ci\u201d',
				members: ['MAC', 'PAD', 'PHONE', 'POD'],
			},
			{
				level: 3,
				group: 'WORDS WITH TWO PRONUNCIATIONS',
				members: ['JOB', 'LIMA', 'MOBILE', 'POLISH'],
			},
		],
	},
	{
		id: 32,
		date: '2023-07-13',
		answers: [
			{
				level: 0,
				group: 'SHOE PARTS',
				members: ['HEEL', 'LACE', 'SOLE', 'TONGUE'],
			},
			{
				level: 1,
				group: 'BOARD GAMES',
				members: ['CLUE', 'RISK', 'SORRY', 'TROUBLE'],
			},
			{
				level: 2,
				group: 'FICTIONAL SPIES',
				members: ['BOND', 'HUNT', 'RYAN', 'SMART'],
			},
			{
				level: 3,
				group: 'RUBBER ___',
				members: ['BAND', 'CEMENT', 'DUCKIE', 'SOUL'],
			},
		],
	},
	{
		id: 33,
		date: '2023-07-14',
		answers: [
			{
				level: 0,
				group: 'BOATS',
				members: ['FERRY', 'JUNK', 'TUG', 'YACHT'],
			},
			{
				level: 1,
				group: 'SANDWICHES',
				members: ['CLUB', 'CUBAN', 'MELT', 'SUB'],
			},
			{
				level: 2,
				group: 'CUTS OF BEEF',
				members: ['FLANK', 'LOIN', 'ROUND', 'SHANK'],
			},
			{
				level: 3,
				group: 'NICKNAMES THAT ARE VERBS',
				members: ['CHUCK', 'JOSH', 'ROB', 'SUE'],
			},
		],
	},
	{
		id: 34,
		date: '2023-07-15',
		answers: [
			{
				level: 0,
				group: 'PLEASANT SMELLS',
				members: ['AROMA', 'BOUQUET', 'FRAGRANCE', 'SCENT'],
			},
			{
				level: 1,
				group: 'MUSIC GENRES',
				members: ['BLUES', 'COUNTRY', 'FUNK', 'SOUL'],
			},
			{
				level: 2,
				group: 'ROCK PAPER SCISSORS',
				members: ['PAPER', 'ROCK', 'SCISSORS', 'SHOOT'],
			},
			{
				level: 3,
				group: 'MALE ANIMALS',
				members: ['BOAR', 'BUCK', 'BULL', 'JACK'],
			},
		],
	},
	{
		id: 35,
		date: '2023-07-16',
		answers: [
			{
				level: 0,
				group: 'U.S. COINS',
				members: ['DIME', 'NICKEL', 'PENNY', 'QUARTER'],
			},
			{
				level: 1,
				group: 'METAL ELEMENTS',
				members: ['IRON', 'LEAD', 'TIN', 'ZINC'],
			},
			{
				level: 2,
				group: 'LUCKY CHARMS MARSHMALLOWS',
				members: ['CLOVER', 'HORSESHOE', 'MOON', 'RAINBOW'],
			},
			{
				level: 3,
				group: '___ AND ___',
				members: ['AGAIN', 'HALF', 'NECK', 'SO'],
			},
		],
	},
	{
		id: 36,
		date: '2023-07-17',
		answers: [
			{
				level: 0,
				group: 'MARSUPIALS',
				members: ['KANGAROO', 'KOALA', 'WALLABY', 'WOMBAT'],
			},
			{
				level: 1,
				group: 'CHOCOLATE BARS',
				members: ['CHUNKY', 'CRUNCH', 'MARS', 'MOUNDS'],
			},
			{
				level: 2,
				group: 'SLANG FOR MONEY',
				members: ['CHEDDAR', 'DOUGH', 'PAPER', 'STACKS'],
			},
			{
				level: 3,
				group: 'NAKED ___',
				members: ['EYE', 'GUN', 'MOLE RAT', 'TRUTH'],
			},
		],
	},
	{
		id: 37,
		date: '2023-07-18',
		answers: [
			{
				level: 0,
				group: 'MARINE MAMMALS',
				members: ['DOLPHIN', 'MANATEE', 'OTTER', 'SEAL'],
			},
			{
				level: 1,
				group: 'BIKE PARTS',
				members: ['BRAKE', 'CHAIN', 'SADDLE', 'SPOKE'],
			},
			{
				level: 2,
				group: 'SYNONYMS FOR SELL',
				members: ['HAWK', 'MOVE', 'PEDDLE', 'VEND'],
			},
			{
				level: 3,
				group: 'COUNTRIES WHEN \u201cA\u201d IS ADDED',
				members: ['CHIN', 'CUB', 'MALT', 'TONG'],
			},
		],
	},
	{
		id: 38,
		date: '2023-07-19',
		answers: [
			{
				level: 0,
				group: 'TREES',
				members: ['ASH', 'CEDAR', 'MAPLE', 'PINE'],
			},
			{
				level: 1,
				group: 'LAND FORMATIONS',
				members: ['HILL', 'MOUNTAIN', 'PLATEAU', 'VALLEY'],
			},
			{
				level: 2,
				group: 'BAGEL FLAVORS',
				members: ['EVERYTHING', 'ONION', 'PLAIN', 'POPPY'],
			},
			{
				level: 3,
				group: 'STREETS ON SCREEN',
				members: ['ELM', 'FEAR', 'JUMP', 'SESAME'],
			},
		],
	},
	{
		id: 39,
		date: '2023-07-20',
		answers: [
			{
				level: 0,
				group: 'TIMEKEEPING DEVICES',
				members: ['CLOCK', 'HOURGLASS', 'SUNDIAL', 'WATCH'],
			},
			{
				level: 1,
				group: 'HAIRSTYLES',
				members: ['BOB', 'CROP', 'PIXIE', 'SHAG'],
			},
			{
				level: 2,
				group: 'UNITS OF MEASURE',
				members: ['HERTZ', 'MOLE', 'NEWTON', 'SECOND'],
			},
			{
				level: 3,
				group: 'DR. ___',
				members: ['EVIL', 'J', 'NO', 'PEPPER'],
			},
		],
	},
	{
		id: 40,
		date: '2023-07-21',
		answers: [
			{
				level: 0,
				group: 'WOODWINDS',
				members: ['BASSOON', 'CLARINET', 'FLUTE', 'OBOE'],
			},
			{
				level: 1,
				group: 'COVERINGS',
				members: ['CAP', 'COVER', 'LID', 'TOP'],
			},
			{
				level: 2,
				group: 'SUNGLASSES',
				members: ['AVIATOR', 'CAT EYE', 'WAYFARER', 'WRAPAROUND'],
			},
			{
				level: 3,
				group: 'SEALS',
				members: ['HARBOR', 'HARP', 'HOODED', 'MONK'],
			},
		],
	},
	{
		id: 41,
		date: '2023-07-22',
		answers: [
			{
				level: 0,
				group: 'BOTTLED WATER BRANDS',
				members: ['DASANI', 'EVIAN', 'FIJI', 'VOSS'],
			},
			{
				level: 1,
				group: 'SLANG FOR COFFEE',
				members: ['BREW', 'JAVA', 'JOE', 'MUD'],
			},
			{
				level: 2,
				group: 'ISLAND COUNTRIES',
				members: ['CUBA', 'JAPAN', 'MALTA', 'PALAU'],
			},
			{
				level: 3,
				group: 'CEREAL MASCOTS',
				members: ['LUCKY', 'POP', 'SAM', 'TONY'],
			},
		],
	},
	{
		id: 42,
		date: '2023-07-23',
		answers: [
			{
				level: 0,
				group: 'SCUBA GEAR',
				members: ['FINS', 'MASK', 'SNORKEL', 'TANK'],
			},
			{
				level: 1,
				group: 'PUNCTUATION MARKS',
				members: ['COLON', 'COMMA', 'HYPHEN', 'PERIOD'],
			},
			{
				level: 2,
				group: 'RUN QUICKLY',
				members: ['BOLT', 'DASH', 'RACE', 'SPRINT'],
			},
			{
				level: 3,
				group: '___ CAT',
				members: ['DOJA', 'FAT', 'HOUSE', 'JUNGLE'],
			},
		],
	},
	{
		id: 43,
		date: '2023-07-24',
		answers: [
			{
				level: 0,
				group: 'SYNONYMS FOR ANGRY',
				members: ['FURIOUS', 'INCENSED', 'IRATE', 'LIVID'],
			},
			{
				level: 1,
				group: 'THINGS THAT ARE YELLOW',
				members: ['BANANA', 'CANARY', 'SCHOOL BUS', 'SUNFLOWER'],
			},
			{
				level: 2,
				group: 'MARINE BIRDS',
				members: ['BOOBY', 'GULL', 'PELICAN', 'PUFFIN'],
			},
			{
				level: 3,
				group: '___ BOYS',
				members: ['BEACH', 'BEASTIE', 'HARDY', 'LOST'],
			},
		],
	},
	{
		id: 44,
		date: '2023-07-25',
		answers: [
			{
				level: 0,
				group: 'STATES OF MATTER',
				members: ['GAS', 'LIQUID', 'PLASMA', 'SOLID'],
			},
			{
				level: 1,
				group: 'EDIT MENU COMMANDS',
				members: ['COPY', 'CUT', 'PASTE', 'UNDO'],
			},
			{
				level: 2,
				group: 'DEFEAT BADLY',
				members: ['CRUSH', 'ROUT', 'SHELLAC', 'TRASH'],
			},
			{
				level: 3,
				group: 'ANAGRAMS',
				members: ['LEAST', 'SLATE', 'STALE', 'TESLA'],
			},
		],
	},
	{
		id: 45,
		date: '2023-07-26',
		answers: [
			{
				level: 0,
				group: 'MODES OF TRANSPORTATION',
				members: ['BOAT', 'CAR', 'PLANE', 'TRAIN'],
			},
			{
				level: 1,
				group: 'NBA PLAYERS',
				members: ['KING', 'MAGIC', 'SUN', 'THUNDER'],
			},
			{
				level: 2,
				group: 'FAST FOOD CHAINS',
				members: ['CHECKERS', 'OUTBACK', 'SONIC', 'SUBWAY'],
			},
			{
				level: 3,
				group: 'BAND NAMES MINUS COLORS',
				members: ['DAY', 'FLOYD', 'SABBATH', 'STRIPES'],
			},
		],
	},
	{
		id: 46,
		date: '2023-07-27',
		answers: [
			{
				level: 0,
				group: 'MOVIE TITLE CITIES',
				members: ['CHICAGO', 'MUNICH', 'PHILADELPHIA', 'RIO'],
			},
			{
				level: 1,
				group: 'FASHION MAGAZINES',
				members: ['ALLURE', 'ELLE', 'GLAMOUR', 'W'],
			},
			{
				level: 2,
				group: 'STORMS',
				members: ['BLIZZARD', 'CYCLONE', 'SQUALL', 'TORNADO'],
			},
			{
				level: 3,
				group: 'COCKTAILS',
				members: ['COSMOPOLITAN', 'HURRICANE', 'MANHATTAN', 'SCREWDRIVER'],
			},
		],
	},
	{
		id: 47,
		date: '2023-07-28',
		answers: [
			{
				level: 0,
				group: 'BIOMES',
				members: ['DESERT', 'FOREST', 'GRASSLAND', 'TUNDRA'],
			},
			{
				level: 1,
				group: 'LIZARDS',
				members: ['CHAMELEON', 'GECKO', 'IGUANA', 'MONITOR'],
			},
			{
				level: 2,
				group: 'YOGA POSES',
				members: ['COBRA', 'LOTUS', 'TREE', 'WARRIOR'],
			},
			{
				level: 3,
				group: 'DANCES WHEN DOUBLED',
				members: ['CAN', 'CHA', 'GO', 'NAE'],
			},
		],
	},
	{
		id: 48,
		date: '2023-07-29',
		answers: [
			{
				level: 0,
				group: 'FABRICS',
				members: ['CORDUROY', 'DENIM', 'LINEN', 'TWEED'],
			},
			{
				level: 1,
				group: 'APPARITIONS',
				members: ['GHOST', 'PHANTOM', 'SPECTER', 'SPIRIT'],
			},
			{
				level: 2,
				group: 'SYNONYMS FOR BOTHER',
				members: ['NEEDLE', 'POKE', 'RIB', 'TEASE'],
			},
			{
				level: 3,
				group: 'DISNEY CHARACTERS',
				members: ['BEAST', 'GENIE', 'SCAR', 'STITCH'],
			},
		],
	},
	{
		id: 49,
		date: '2023-07-30',
		answers: [
			{
				level: 0,
				group: 'RELATIVES',
				members: ['AUNT', 'COUSIN', 'MOTHER', 'NEPHEW'],
			},
			{
				level: 1,
				group: 'SYNONYMS FOR OFFBEAT',
				members: ['DAFFY', 'KOOKY', 'QUIRKY', 'WACKY'],
			},
			{
				level: 2,
				group: 'DISNEY DUCKS',
				members: ['DAISY', 'DEWEY', 'DONALD', 'SCROOGE'],
			},
			{
				level: 3,
				group: '___ CLOCK',
				members: ['ALARM', 'BIOLOGICAL', 'CUCKOO', 'GRANDFATHER'],
			},
		],
	},
	{
		id: 50,
		date: '2023-07-31',
		answers: [
			{
				level: 0,
				group: 'UNITS OF LENGTH',
				members: ['FOOT', 'INCH', 'MILE', 'YARD'],
			},
			{
				level: 1,
				group: 'TYPES OF PAINT',
				members: ['ACRYLIC', 'OIL', 'TEMPERA', 'WATERCOLOR'],
			},
			{
				level: 2,
				group: 'DEEP-FRIED FOOD',
				members: ['FALAFEL', 'KATSU', 'SAMOSA', 'SCHNITZEL'],
			},
			{
				level: 3,
				group: 'STARTS OF U.S. COINS',
				members: ['DIM', 'NICK', 'PEN', 'QUART'],
			},
		],
	},
	{
		id: 51,
		date: '2023-08-01',
		answers: [
			{
				level: 0,
				group: 'LONG SANDWICHES',
				members: ['HERO', 'HOAGIE', 'GRINDER', 'SUB'],
			},
			{
				level: 1,
				group: 'DATING APPS',
				members: ['BUMBLE', 'HINGE', 'MATCH', 'TINDER'],
			},
			{
				level: 2,
				group: 'VAMPIRE MOVIES',
				members: ['BLADE', 'LOST BOYS', 'NEAR DARK', 'TWILIGHT'],
			},
			{
				level: 3,
				group: 'ADAMS',
				members: ['ANT', 'DRIVER', 'SCOTT', 'WEST'],
			},
		],
	},
	{
		id: 52,
		date: '2023-08-02',
		answers: [
			{
				level: 0,
				group: 'COMPUTER EQUIPMENT',
				members: ['KEYBOARD', 'MONITOR', 'MOUSE', 'SPEAKER'],
			},
			{
				level: 1,
				group: 'RODENTS',
				members: ['GERBIL', 'HAMSTER', 'RAT', 'VOLE'],
			},
			{
				level: 2,
				group: 'MUSICAL INSTRUMENTS',
				members: ['HARP', 'HORN', 'ORGAN', 'TRIANGLE'],
			},
			{
				level: 3,
				group: 'SYNONYMS FOR COMPLAIN',
				members: ['CARP', 'GRIPE', 'GROUSE', 'MOAN'],
			},
		],
	},
	{
		id: 53,
		date: '2023-08-03',
		answers: [
			{
				level: 0,
				group: 'ANIMAL GROUP NAMES',
				members: ['COLONY', 'HERD', 'PRIDE', 'SWARM'],
			},
			{
				level: 1,
				group: 'STONED',
				members: ['BAKED', 'BLAZED', 'HIGH', 'LIT'],
			},
			{
				level: 2,
				group: 'AP CLASSES',
				members: ['BIO', 'CHEM', 'GOV', 'STATS'],
			},
			{
				level: 3,
				group: 'TAXONOMY RANKS',
				members: ['CLASS', 'DOMAIN', 'FAMILY', 'ORDER'],
			},
		],
	},
	{
		id: 54,
		date: '2023-08-04',
		answers: [
			{
				level: 0,
				group: 'PLACES FOR WORSHIP',
				members: ['ALTAR', 'RELIQUARY', 'SHRINE', 'TEMPLE'],
			},
			{
				level: 1,
				group: 'CARTOON CATS',
				members: ['FELIX', 'GARFIELD', 'SYLVESTER', 'TOM'],
			},
			{
				level: 2,
				group: 'PRESIDENTIAL FIRST NAMES',
				members: ['CALVIN', 'CHESTER', 'GROVER', 'HARRY'],
			},
			{
				level: 3,
				group: '___ ROAD',
				members: ['ABBEY', 'HIGH', 'ROCKY', 'SILK'],
			},
		],
	},
	{
		id: 55,
		date: '2023-08-05',
		answers: [
			{
				level: 0,
				group: 'CLASSIC TOYS',
				members: ['BLOCKS', 'DOLL', 'TOP', 'YO-YO'],
			},
			{
				level: 1,
				group: 'WORDS WITH THREE G\u2019S',
				members: ['BAGGAGE', 'EGGNOG', 'GIGGLE', 'LEGGINGS'],
			},
			{
				level: 2,
				group: 'SHAKESPEARE CHARACTERS',
				members: ['DUNCAN', 'JULIET', 'PUCK', 'VIOLA'],
			},
			{
				level: 3,
				group: '___ STICK',
				members: ['FISH', 'HOCKEY', 'MEMORY', 'SELFIE'],
			},
		],
	},
	{
		id: 56,
		date: '2023-08-06',
		answers: [
			{
				level: 0,
				group: 'CLASSIC ARCADE GAMES',
				members: ['ASTEROIDS', 'BREAKOUT', 'FROGGER', 'PONG'],
			},
			{
				level: 1,
				group: 'DANCES',
				members: ['HUSTLE', 'SALSA', 'SWING', 'TANGO'],
			},
			{
				level: 2,
				group: 'TOUCHSCREEN GESTURES',
				members: ['PINCH', 'SPREAD', 'SWIPE', 'TAP'],
			},
			{
				level: 3,
				group: 'RAPPERS MINUS NUMBERS',
				members: ['CENT', 'CHAINZ', 'PAC', 'SAVAGE'],
			},
		],
	},
	{
		id: 57,
		date: '2023-08-07',
		answers: [
			{
				level: 0,
				group: 'MOVIE GENRES',
				members: ['HORROR', 'MUSICAL', 'ROMANCE', 'WESTERN'],
			},
			{
				level: 1,
				group: 'PATTERNS',
				members: ['HOUNDSTOOTH', 'PAISLEY', 'PLAID', 'STRIPES'],
			},
			{
				level: 2,
				group: 'SYNONYMS FOR FALSEHOOD',
				members: ['FIB', 'FICTION', 'LIE', 'TALE'],
			},
			{
				level: 3,
				group: 'CANDY PIECES',
				members: ['DOT', 'GOOBER', 'KISS', 'WHOPPER'],
			},
		],
	},
	{
		id: 58,
		date: '2023-08-08',
		answers: [
			{
				level: 0,
				group: 'ARACHNIDS',
				members: ['MITE', 'SCORPION', 'SPIDER', 'TICK'],
			},
			{
				level: 1,
				group: 'FISH',
				members: ['CHAR', 'EEL', 'PERCH', 'SHARK'],
			},
			{
				level: 2,
				group: 'SUPERHEROES',
				members: ['BLACK WIDOW', 'BLADE', 'FLASH', 'STORM'],
			},
			{
				level: 3,
				group: 'MTV SHOWS',
				members: ['CATFISH', 'CRIBS', 'JACKASS', 'STATE'],
			},
		],
	},
	{
		id: 59,
		date: '2023-08-09',
		answers: [
			{
				level: 0,
				group: 'UNSPECIFIED QUANTITIES',
				members: ['FEW', 'HANDFUL', 'SEVERAL', 'SOME'],
			},
			{
				level: 1,
				group: 'CELESTIAL OBJECTS',
				members: ['ASTEROID', 'COMET', 'MOON', 'PLANET'],
			},
			{
				level: 2,
				group: 'NEWSPAPERS',
				members: ['GLOBE', 'JOURNAL', 'POST', 'SUN'],
			},
			{
				level: 3,
				group: 'FRUIT HOMOPHONES',
				members: ['LYME', 'MELLON', 'PAIR', 'PLUMB'],
			},
		],
	},
	{
		id: 60,
		date: '2023-08-10',
		answers: [
			{
				level: 0,
				group: 'HORROR FRANCHISES',
				members: ['PURGE', 'RING', 'SAW', 'SCREAM'],
			},
			{
				level: 1,
				group: 'SPORTS VENUES',
				members: ['COURT', 'DIAMOND', 'FIELD', 'RINK'],
			},
			{
				level: 2,
				group: 'MAKE HAPPY',
				members: ['CHARM', 'DELIGHT', 'PLEASE', 'TICKLE'],
			},
			{
				level: 3,
				group: 'JEWELRY',
				members: ['ANKLET', 'BANGLE', 'BROOCH', 'PENDANT'],
			},
		],
	},
	{
		id: 61,
		date: '2023-08-11',
		answers: [
			{
				level: 0,
				group: 'THEORETICAL PHYSICISTS',
				members: ['EINSTEIN', 'FEYNMAN', 'HAWKING', 'OPPENHEIMER'],
			},
			{
				level: 1,
				group: 'TALENT',
				members: ['FACULTY', 'FLAIR', 'GENIUS', 'GIFT'],
			},
			{
				level: 2,
				group: 'AUSTRALIAN TERMS',
				members: ['BARBIE', 'BUSH', 'CRIKEY', 'MATE'],
			},
			{
				level: 3,
				group: '___ POINT',
				members: ['MATCH', 'MOOT', 'SELLING', 'WEST'],
			},
		],
	},
	{
		id: 62,
		date: '2023-08-12',
		answers: [
			{
				level: 0,
				group: 'STATE ABBREVIATIONS',
				members: ['CO', 'MA', 'ME', 'PA'],
			},
			{
				level: 1,
				group: 'MUSICAL NOTES',
				members: ['DO', 'FA', 'LA', 'TI'],
			},
			{
				level: 2,
				group: 'GREEK LETTERS',
				members: ['MU', 'NU', 'PI', 'XI'],
			},
			{
				level: 3,
				group: 'PERIODIC TABLE SYMBOLS',
				members: ['FE', 'HE', 'NA', 'NI'],
			},
		],
	},
	{
		id: 63,
		date: '2023-08-13',
		answers: [
			{
				level: 0,
				group: 'FASTENING VERBS',
				members: ['BUCKLE', 'BUTTON', 'SNAP', 'ZIP'],
			},
			{
				level: 1,
				group: 'SLANG FOR ZERO',
				members: ['JACK', 'NADA', 'NOTHING', 'SQUAT'],
			},
			{
				level: 2,
				group: 'GYM EXERCISES',
				members: ['CURL', 'LUNGE', 'PLANK', 'PRESS'],
			},
			{
				level: 3,
				group: '\u201cCAPTAINS\u201d',
				members: ['CRUNCH', 'KANGAROO', 'OBVIOUS', 'PLANET'],
			},
		],
	},
	{
		id: 64,
		date: '2023-08-14',
		answers: [
			{
				level: 0,
				group: 'CLASSIC DOG NAMES',
				members: ['FIDO', 'LUCKY', 'ROVER', 'SPOT'],
			},
			{
				level: 1,
				group: 'PERCEIVE',
				members: ['CATCH', 'NOTICE', 'OBSERVE', 'SEE'],
			},
			{
				level: 2,
				group: 'FISHING TERMS',
				members: ['BAIT', 'CHUM', 'FLY', 'SINKER'],
			},
			{
				level: 3,
				group: 'T-___',
				members: ['BONE', 'REX', 'SHIRT', 'STORM'],
			},
		],
	},
	{
		id: 65,
		date: '2023-08-15',
		answers: [
			{
				level: 0,
				group: 'STATES OF MATTER',
				members: ['GAS', 'LIQUID', 'PLASMA', 'SOLID'],
			},
			{
				level: 1,
				group: 'ENERGY',
				members: ['JUICE', 'SPIRIT', 'STEAM', 'VIGOR'],
			},
			{
				level: 2,
				group: 'CLASSICAL ELEMENTS',
				members: ['AIR', 'EARTH', 'FIRE', 'WATER'],
			},
			{
				level: 3,
				group: 'THINGS WITH RINGS',
				members: ['CIRCUS', 'SATURN', 'TREE', 'WEDDING'],
			},
		],
	},
	{
		id: 66,
		date: '2023-08-16',
		answers: [
			{
				level: 0,
				group: 'TIME PERIODS',
				members: ['CENTURY', 'DECADE', 'MILLENNIUM', 'YEAR'],
			},
			{
				level: 1,
				group: 'BREAKFAST FOODS',
				members: ['CEREAL', 'OMELET', 'PANCAKE', 'WAFFLE'],
			},
			{
				level: 2,
				group: 'PAINTERS',
				members: ['BACON', 'CLOSE', 'MUNCH', 'WHISTLER'],
			},
			{
				level: 3,
				group: 'ONE IN A DOZEN',
				members: ['EGG', 'JUROR', 'MONTH', 'ROSE'],
			},
		],
	},
	{
		id: 67,
		date: '2023-08-17',
		answers: [
			{
				level: 0,
				group: 'DESSERTS',
				members: ['CAKE', 'COBBLER', 'PIE', 'TART'],
			},
			{
				level: 1,
				group: 'OCCUPATIONAL SURNAMES',
				members: ['FISHER', 'MASON', 'MILLER', 'SMITH'],
			},
			{
				level: 2,
				group: 'ALTER DECEPTIVELY',
				members: ['DISTORT', 'DOCTOR', 'FUDGE', 'TWIST'],
			},
			{
				level: 3,
				group: 'SQUARE ___',
				members: ['DANCE', 'MEAL', 'ONE', 'ROOT'],
			},
		],
	},
	{
		id: 68,
		date: '2023-08-18',
		answers: [
			{
				level: 0,
				group: 'UNITS OF VOLUME',
				members: ['CUP', 'GALLON', 'PINT', 'QUART'],
			},
			{
				level: 1,
				group: 'EXTREMELY',
				members: ['AWFUL', 'QUITE', 'SUPER', 'VERY'],
			},
			{
				level: 2,
				group: 'WORLD CURRENCIES',
				members: ['RAND', 'REAL', 'STERLING', 'WON'],
			},
			{
				level: 3,
				group: '___ CAKE',
				members: ['CARROT', 'COFFEE', 'POUND', 'SPONGE'],
			},
		],
	},
	{
		id: 69,
		date: '2023-08-19',
		answers: [
			{
				level: 0,
				group: 'FRIEND',
				members: ['BUD', 'CHUM', 'MATE', 'PAL'],
			},
			{
				level: 1,
				group: 'COOKWEAR',
				members: ['CROCK', 'POT', 'SKILLET', 'WOK'],
			},
			{
				level: 2,
				group: 'SHOES',
				members: ['CLOG', 'PUMP', 'SLIDE', 'WEDGE'],
			},
			{
				level: 3,
				group: 'SLANG FOR CANNABIS',
				members: ['GRASS', 'HERB', 'MARY JANE', 'WEED'],
			},
		],
	},
	{
		id: 70,
		date: '2023-08-20',
		answers: [
			{
				level: 0,
				group: 'CAMPING SUPPLIES',
				members: ['COOLER', 'LANTERN', 'SLEEPING BAG', 'TENT'],
			},
			{
				level: 1,
				group: 'INSULT',
				members: ['BARB', 'DIG', 'DISS', 'JAB'],
			},
			{
				level: 2,
				group: 'TINY',
				members: ['MINUTE', 'SLIGHT', 'SMALL', 'WEE'],
			},
			{
				level: 3,
				group: 'HAPPY ___',
				members: ['CAMPER', 'HOUR', 'MEAL', 'MEDIUM'],
			},
		],
	},
	{
		id: 71,
		date: '2023-08-21',
		answers: [
			{
				level: 0,
				group: 'U.S. MOUNTAIN STATES',
				members: ['ARIZONA', 'COLORADO', 'NEVADA', 'UTAH'],
			},
			{
				level: 1,
				group: 'SODA BRANDS',
				members: ['CRUSH', 'MUG', 'SPRITE', 'SQUIRT'],
			},
			{
				level: 2,
				group: 'CLASSIC ROCK BANDS',
				members: ['GENESIS', 'KANSAS', 'RUSH', 'YES'],
			},
			{
				level: 3,
				group: 'TONY ___',
				members: ['HAWK', 'MONTANA', 'SOPRANO', 'STARK'],
			},
		],
	},
	{
		id: 72,
		date: '2023-08-22',
		answers: [
			{
				level: 0,
				group: 'PERFORMING ARTISTS',
				members: ['ACTOR', 'DANCER', 'SINGER', 'STAND-UP'],
			},
			{
				level: 1,
				group: 'SANTA\u2019S REINDEER',
				members: ['COMET', 'CUPID', 'DASHER', 'VIXEN'],
			},
			{
				level: 2,
				group: 'SEEN ON VALENTINE\u2019S DAY',
				members: ['CARD', 'CHOCOLATE', 'HEART', 'ROSE'],
			},
			{
				level: 3,
				group: '\u201cBAD ___\u201d MOVIES',
				members: ['BOYS', 'LIEUTENANT', 'SANTA', 'TASTE'],
			},
		],
	},
	{
		id: 73,
		date: '2023-08-23',
		answers: [
			{
				level: 0,
				group: 'FACIAL HAIR',
				members: ['BEARD', 'GOATEE', 'MUSTACHE', 'STUBBLE'],
			},
			{
				level: 1,
				group: 'BIKE PARTS',
				members: ['GEAR', 'HANDLEBAR', 'PEDAL', 'WHEEL'],
			},
			{
				level: 2,
				group: 'PURSUE',
				members: ['DOG', 'FOLLOW', 'TAIL', 'TRACK'],
			},
			{
				level: 3,
				group: 'THINGS THAT ARE CAST',
				members: ['DOUBT', 'MOVIE', 'SHADOW', 'VOTE'],
			},
		],
	},
	{
		id: 74,
		date: '2023-08-24',
		answers: [
			{
				level: 0,
				group: 'EXTINCT ANIMALS',
				members: ['DODO', 'MAMMOTH', 'MASTODON', 'TRILOBITE'],
			},
			{
				level: 1,
				group: 'FAILURES',
				members: ['BUSTS', 'FLOPS', 'MISSES', 'TURKEYS'],
			},
			{
				level: 2,
				group: 'SLANG FOR CLOTHES',
				members: ['DUDS', 'GETUP', 'OUTFIT', 'THREADS'],
			},
			{
				level: 3,
				group: 'KISS',
				members: ['PECK', 'SMACK', 'SMOOCH', 'X'],
			},
		],
	},
	{
		id: 75,
		date: '2023-08-25',
		answers: [
			{
				level: 0,
				group: 'SOCIAL GATHERING',
				members: ['BASH', 'BLOWOUT', 'PARTY', 'SHINDIG'],
			},
			{
				level: 1,
				group: 'FOUND IN A KITCHEN',
				members: ['COUNTER', 'MIXER', 'RANGE', 'SINK'],
			},
			{
				level: 2,
				group: '\u201cPINOCCHIO\u201d FIGURES',
				members: ['CRICKET', 'PUPPET', 'WHALE', 'WOODCARVER'],
			},
			{
				level: 3,
				group: 'EASTER ___',
				members: ['BUNNY', 'EGG', 'ISLAND', 'SUNDAY'],
			},
		],
	},
	{
		id: 76,
		date: '2023-08-26',
		answers: [
			{
				level: 0,
				group: 'BOARD GAMES',
				members: ['RISK', 'SORRY', 'TABOO', 'TROUBLE'],
			},
			{
				level: 1,
				group: 'NEWSPAPER SECTIONS',
				members: ['BUSINESS', 'NATIONAL', 'OPINION', 'STYLE'],
			},
			{
				level: 2,
				group: 'FIGURES IN GREEK MYTH',
				members: ['ATLAS', 'HERMES', 'NIKE', 'PARIS'],
			},
			{
				level: 3,
				group: 'FIRST WORDS IN RAPPERS\u2019 NAMES',
				members: ['FOXY', 'GUCCI', 'KILLER', 'NOTORIOUS'],
			},
		],
	},
	{
		id: 77,
		date: '2023-08-27',
		answers: [
			{
				level: 0,
				group: 'PIECES OF CHICKEN',
				members: ['BREAST', 'DRUMSTICK', 'TENDER', 'WING'],
			},
			{
				level: 1,
				group: 'GOLF TERMS',
				members: ['DRIVER', 'EAGLE', 'HOLE', 'STROKE'],
			},
			{
				level: 2,
				group: 'DRUM SET COMPONENTS',
				members: ['CYMBAL', 'KICK', 'SNARE', 'TOM'],
			},
			{
				level: 3,
				group: 'ASSOCIATED WITH \u201cCRAWL\u201d',
				members: ['INFANT', 'PUB', 'SWIMMING', 'TICKER'],
			},
		],
	},
	{
		id: 78,
		date: '2023-08-28',
		answers: [
			{
				level: 0,
				group: 'STATES OF ELATION',
				members: ['BLISS', 'CLOUD NINE', 'HEAVEN', 'PARADISE'],
			},
			{
				level: 1,
				group: 'SCAM',
				members: ['CON', 'FAST ONE', 'HUSTLE', 'RACKET'],
			},
			{
				level: 2,
				group: 'GREETING GESTURES',
				members: ['HIGH FIVE', 'HUG', 'SHAKE', 'WAVE'],
			},
			{
				level: 3,
				group: '___ LIST',
				members: ['BUCKET', 'GUEST', 'TOP TEN', 'WISH'],
			},
		],
	},
	{
		id: 79,
		date: '2023-08-29',
		answers: [
			{
				level: 0,
				group: 'DEPART QUICKLY',
				members: ['BOOK', 'BOUNCE', 'RUN', 'SPLIT'],
			},
			{
				level: 1,
				group: 'ANIMALS THAT END WITH \u201cX\u201d',
				members: ['FOX', 'IBEX', 'LYNX', 'ORYX'],
			},
			{
				level: 2,
				group: 'SHADES OF BLACK',
				members: ['EBONY', 'JET', 'ONYX', 'RAVEN'],
			},
			{
				level: 3,
				group: 'WORDS BEFORE DAYS OF THE WEEK',
				members: ['ASH', 'BLACK', 'CYBER', 'FAT'],
			},
		],
	},
	{
		id: 80,
		date: '2023-08-30',
		answers: [
			{
				level: 0,
				group: 'PLAYGROUND FIXTURES',
				members: ['SANDBOX', 'SEESAW', 'SLIDE', 'SWING'],
			},
			{
				level: 1,
				group: 'INFLUENCE',
				members: ['CLOUT', 'PULL', 'SWAY', 'WEIGHT'],
			},
			{
				level: 2,
				group: 'EGYPTIAN SYMBOLS',
				members: ['ANKH', 'CROOK', 'EYE', 'SCARAB'],
			},
			{
				level: 3,
				group: 'FONTS',
				members: ['COURIER', 'IMPACT', 'PAPYRUS', 'TIMES'],
			},
		],
	},
	{
		id: 81,
		date: '2023-08-31',
		answers: [
			{
				level: 0,
				group: 'APPETIZER UNIT',
				members: ['FRY', 'NACHO', 'POPPER', 'WING'],
			},
			{
				level: 1,
				group: 'RESPONSE TO A CORRECT ANSWER',
				members: ['BINGO', 'CORRECT', 'RIGHT', 'YES'],
			},
			{
				level: 2,
				group: 'MAR',
				members: ['CHIP', 'DING', 'NICK', 'SCRATCH'],
			},
			{
				level: 3,
				group: '___JACK',
				members: ['APPLE', 'CRACKER', 'FLAP', 'LUMBER'],
			},
		],
	},
	{
		id: 82,
		date: '2023-09-01',
		answers: [
			{
				level: 0,
				group: 'DRINK VESSELS',
				members: ['GOBLET', 'SNIFTER', 'TUMBLER', 'STEIN'],
			},
			{
				level: 1,
				group: 'WOODWINDS',
				members: ['CLARINET', 'FLUTE', 'OBOE', 'SAXOPHONE'],
			},
			{
				level: 2,
				group: 'AMERICAN POETS',
				members: ['BISHOP', 'FROST', 'OLDS', 'POUND'],
			},
			{
				level: 3,
				group: 'CONSECUTIVE DOUBLE LETTERS',
				members: ['BALLOON', 'BASSOON', 'COFFEE', 'FRICASSEE'],
			},
		],
	},
	{
		id: 83,
		date: '2023-09-02',
		answers: [
			{
				level: 0,
				group: 'AU NATUREL',
				members: ['BARE', 'NAKED', 'NUDE', 'UNCLAD'],
			},
			{
				level: 1,
				group: 'BAKED GOODS',
				members: ['BUN', 'DANISH', 'MUFFIN', 'TURNOVER'],
			},
			{
				level: 2,
				group: 'AMERICAN FOOTBALL ACTIONS',
				members: ['FUMBLE', 'PUNT', 'SACK', 'SNAP'],
			},
			{
				level: 3,
				group: 'MANICURE STEPS',
				members: ['BUFF', 'CLIP', 'FILE', 'POLISH'],
			},
		],
	},
	{
		id: 84,
		date: '2023-09-03',
		answers: [
			{
				level: 0,
				group: 'FEMALE ANIMALS',
				members: ['COW', 'DOE', 'HEN', 'MARE'],
			},
			{
				level: 1,
				group: 'PRONOUNS',
				members: ['I', 'IT', 'THEY', 'WE'],
			},
			{
				level: 2,
				group: 'ROMAN NUMERALS',
				members: ['D', 'L', 'M', 'V'],
			},
			{
				level: 3,
				group: 'HOMOPHONES',
				members: ['EWE', 'U', 'YEW', 'YOU'],
			},
		],
	},
	{
		id: 85,
		date: '2023-09-04',
		answers: [
			{
				level: 0,
				group: 'PAINTING ACCESSORIES',
				members: ['BRUSH', 'CANVAS', 'EASEL', 'PALETTE'],
			},
			{
				level: 1,
				group: 'AUTOMATIC TRANSMISSION SETTINGS',
				members: ['DRIVE', 'NEUTRAL', 'PARK', 'REVERSE'],
			},
			{
				level: 2,
				group: 'THINGS WITH TEETH',
				members: ['COMB', 'GEAR', 'SAW', 'ZIPPER'],
			},
			{
				level: 3,
				group: '___ CHAIR',
				members: ['FIRST', 'FOLDING', 'HIGH', 'LAWN'],
			},
		],
	},
	{
		id: 86,
		date: '2023-09-05',
		answers: [
			{
				level: 0,
				group: 'INFORMATION DISPLAYS',
				members: ['CHART', 'DIAGRAM', 'GRAPH', 'MAP'],
			},
			{
				level: 1,
				group: 'ADDITIONAL BENEFIT',
				members: ['BONUS', 'EXTRA', 'ICING', 'PERK'],
			},
			{
				level: 2,
				group: 'THANKSGIVING FOOD',
				members: ['GRAVY', 'PIE', 'STUFFING', 'TURKEY'],
			},
			{
				level: 3,
				group: 'SONG TITLES WITH PARENTHESES',
				members: ['I RAN', 'ISTANBUL', 'MONTERO', 'SATISFACTION'],
			},
		],
	},
	{
		id: 87,
		date: '2023-09-06',
		answers: [
			{
				level: 0,
				group: 'CREATURES IN FOLKLORE',
				members: ['GNOME', 'GOBLIN', 'OGRE', 'TROLL'],
			},
			{
				level: 1,
				group: 'FLOWER PARTS',
				members: ['BUD', 'LEAF', 'PETAL', 'STALK'],
			},
			{
				level: 2,
				group: 'ONE INVOLVED IN ESPIONAGE',
				members: ['AGENT', 'MOLE', 'PLANT', 'SPY'],
			},
			{
				level: 3,
				group: 'CHINESE ZODIAC ANIMALS',
				members: ['DRAGON', 'HORSE', 'RABBIT', 'TIGER'],
			},
		],
	},
	{
		id: 88,
		date: '2023-09-07',
		answers: [
			{
				level: 0,
				group: 'ROCKY HORROR PICTURE SHOW',
				members: ['HORROR', 'PICTURE', 'ROCKY', 'SHOW'],
			},
			{
				level: 1,
				group: 'WHO FRAMED ROGER RABBIT',
				members: ['FRAMED', 'RABBIT', 'ROGER', 'WHO'],
			},
			{
				level: 2,
				group: 'WHEN HARRY MET SALLY',
				members: ['HARRY', 'MET', 'SALLY', 'WHEN'],
			},
			{
				level: 3,
				group: 'MAD MAX FURY ROAD',
				members: ['FURY', 'MAD', 'MAX', 'ROAD'],
			},
		],
	},
	{
		id: 89,
		date: '2023-09-08',
		answers: [
			{
				level: 0,
				group: 'INHERENT NATURE',
				members: ['ESSENCE', 'HEART', 'SPIRIT', 'SOUL'],
			},
			{
				level: 1,
				group: 'FERMENTED ALCOHOLIC BEVERAGES',
				members: ['CIDER', 'PORT', 'SAKE', 'STOUT'],
			},
			{
				level: 2,
				group: 'PIXAR MOVIES',
				members: ['BRAVE', 'CARS', 'COCO', 'UP'],
			},
			{
				level: 3,
				group: '___ TAPE',
				members: ['DEMO', 'RED', 'SCOTCH', 'TICKER'],
			},
		],
	},
	{
		id: 90,
		date: '2023-09-09',
		answers: [
			{
				level: 0,
				group: 'BASEBALL CALLS',
				members: ['BALL', 'OUT', 'SAFE', 'STRIKE'],
			},
			{
				level: 1,
				group: 'HEAT SOURCES',
				members: ['FORGE', 'FURNACE', 'KILN', 'OVEN'],
			},
			{
				level: 2,
				group: 'FISH THAT ARE VERBS',
				members: ['CARP', 'CATFISH', 'FLOUNDER', 'SMELT'],
			},
			{
				level: 3,
				group: 'SILENT \u201cL\u201d',
				members: ['COLONEL', 'SALMON', 'WALK', 'YOLK'],
			},
		],
	},
	{
		id: 91,
		date: '2023-09-10',
		answers: [
			{
				level: 0,
				group: 'AMAZON ANIMALS',
				members: ['ANACONDA', 'CAPYBARA', 'JAGUAR', 'TOUCAN'],
			},
			{
				level: 1,
				group: 'LOWEST POINT',
				members: ['BASE', 'BOTTOM', 'FOOT', 'FOUNDATION'],
			},
			{
				level: 2,
				group: 'MUSICALS',
				members: ['COMPANY', 'GREASE', 'HAIR', 'RENT'],
			},
			{
				level: 3,
				group: 'SEA ___',
				members: ['CHANGE', 'CUCUMBER', 'LEGS', 'LION'],
			},
		],
	},
	{
		id: 92,
		date: '2023-09-11',
		answers: [
			{
				level: 0,
				group: 'HALLOWEEN DECORATIONS',
				members: ['BAT', 'COBWEB', 'PUMPKIN', 'TOMBSTONE'],
			},
			{
				level: 1,
				group: 'TV SHOWS',
				members: ['24', 'BONES', 'FIREFLY', 'WEEDS'],
			},
			{
				level: 2,
				group: 'SLOT MACHINE SYMBOLS',
				members: ['7', 'BAR', 'BELL', 'CHERRY'],
			},
			{
				level: 3,
				group: 'NUMBERS IN BOOK TITLES',
				members: ['22', '451', '2001', '20,000'],
			},
		],
	},
	{
		id: 93,
		date: '2023-09-12',
		answers: [
			{
				level: 0,
				group: 'HOT DRINKS',
				members: ['CHAI', 'COCOA', 'COFFEE', 'TEA'],
			},
			{
				level: 1,
				group: 'ANIMAL SOUNDS',
				members: ['BUZZ', 'CLUCK', 'MEOW', 'OINK'],
			},
			{
				level: 2,
				group: 'TREE FEATURES',
				members: ['BARK', 'BRANCH', 'ROOT', 'TRUNK'],
			},
			{
				level: 3,
				group: 'INSIDE INFO',
				members: ['DIRT', 'DISH', 'SCOOP', 'SKINNY'],
			},
		],
	},
	{
		id: 94,
		date: '2023-09-13',
		answers: [
			{
				level: 0,
				group: '\u201cSKEDADDLE!\u201d',
				members: ['GET OUT', 'GO', 'LEAVE', 'SCRAM'],
			},
			{
				level: 1,
				group: 'PRONOUNS',
				members: ['ME', 'THEM', 'US', 'YOU'],
			},
			{
				level: 2,
				group: 'ANAGRAMS',
				members: ['NOPE', 'OPEN', 'PEON', 'PONE'],
			},
			{
				level: 3,
				group: '___ BABY',
				members: ['BEANIE', 'FUR', 'NEPO', 'SANTA'],
			},
		],
	},
	{
		id: 95,
		date: '2023-09-14',
		answers: [
			{
				level: 0,
				group: 'EYE PARTS',
				members: ['IRIS', 'LENS', 'PUPIL', 'RETINA'],
			},
			{
				level: 1,
				group: 'COUNTERFEIT',
				members: ['BOGUS', 'FAKE', 'PHONY', 'SHAM'],
			},
			{
				level: 2,
				group: 'RADIO LINGO',
				members: ['COPY', 'OUT', 'OVER', 'ROGER'],
			},
			{
				level: 3,
				group: 'SONGS THAT ARE NAMES',
				members: ['ALEJANDRO', 'LOLA', 'MICHELLE', 'STAN'],
			},
		],
	},
	{
		id: 96,
		date: '2023-09-15',
		answers: [
			{
				level: 0,
				group: 'BOVIDS',
				members: ['BUFFALO', 'COW', 'GOAT', 'SHEEP'],
			},
			{
				level: 1,
				group: 'EMIT LIGHT',
				members: ['BEAM', 'GLOW', 'RADIATE', 'SHINE'],
			},
			{
				level: 2,
				group: 'GYMNASTICS APPARATUS',
				members: ['FLOOR', 'HORSE', 'RINGS', 'VAULT'],
			},
			{
				level: 3,
				group: 'WORDS THAT SOUND LIKE TWO LETTERS',
				members: ['CUTIE', 'ENVY', 'EXCEL', 'SEEDY'],
			},
		],
	},
	{
		id: 97,
		date: '2023-09-16',
		answers: [
			{
				level: 0,
				group: 'FAIRY TALE FIGURES',
				members: ['GIANT', 'PRINCESS', 'WITCH', 'WOLF'],
			},
			{
				level: 1,
				group: 'CHESS TERMS',
				members: ['BISHOP', 'MATE', 'GAMBIT', 'QUEEN'],
			},
			{
				level: 2,
				group: '\u201cPEANUTS\u201d CHARACTERS',
				members: ['CHARLIE', 'PEPPERMINT PATTY', 'PIGPEN', 'WOODSTOCK'],
			},
			{
				level: 3,
				group: 'I LOVE ___',
				members: ['LUCY', 'NEW YORK', "ROCK 'N ROLL", 'YOU'],
			},
		],
	},
	{
		id: 98,
		date: '2023-09-17',
		answers: [
			{
				level: 0,
				group: 'FRUITS',
				members: ['APRICOT', 'FIG', 'GRAPE', 'LIME'],
			},
			{
				level: 1,
				group: 'LUXURIOUS',
				members: ['DELUXE', 'GRAND', 'LAVISH', 'OPULENT'],
			},
			{
				level: 2,
				group: 'BEST ACTRESS OSCAR WINNERS',
				members: ['BERRY', 'FOSTER', 'STONE', 'SWANK'],
			},
			{
				level: 3,
				group: 'WHAT \u201cGREEN\u201d MIGHT MEAN',
				members: ['ENVIOUS', 'FRESH', 'NAIVE', 'UNWELL'],
			},
		],
	},
	{
		id: 99,
		date: '2023-09-18',
		answers: [
			{
				level: 0,
				group: 'INTELLIGENT',
				members: ['BRIGHT', 'CLEVER', 'QUICK', 'SHARP'],
			},
			{
				level: 1,
				group: 'AIRLINES',
				members: ['ALASKA', 'FRONTIER', 'SOUTHWEST', 'SPIRIT'],
			},
			{
				level: 2,
				group: 'WESTERN TROPES',
				members: ['COWBOY', 'DRIFTER', 'OUTLAW', 'SHERIFF'],
			},
			{
				level: 3,
				group: 'TV SHOW TITLE SURNAMES',
				members: ['LASSO', 'MARS', 'ROGERS', 'SMART'],
			},
		],
	},
	{
		id: 100,
		date: '2023-09-19',
		answers: [
			{
				level: 0,
				group: 'WEB BROWSER-RELATED',
				members: ['BOOKMARK', 'HISTORY', 'TAB', 'WINDOW'],
			},
			{
				level: 1,
				group: 'SHIRT FEATURES',
				members: ['BUTTON', 'COLLAR', 'CUFF', 'POCKET'],
			},
			{
				level: 2,
				group: 'CONNECTION',
				members: ['BOND', 'LINK', 'RELATION', 'TIE'],
			},
			{
				level: 3,
				group: 'DIRTY ___',
				members: ['DOZEN', 'JOKE', 'LAUNDRY', 'MARTINI'],
			},
		],
	},
	{
		id: 101,
		date: '2023-09-20',
		answers: [
			{
				level: 0,
				group: 'REPLACEMENT',
				members: ['BACKUP', 'COPY', 'EXTRA', 'SPARE'],
			},
			{
				level: 1,
				group: 'BOWLING',
				members: ['ALLEY', 'BALL', 'LANE', 'PIN'],
			},
			{
				level: 2,
				group: 'COMMON SWAG ITEMS',
				members: ['MUG', 'PEN', 'TEE', 'TOTE'],
			},
			{
				level: 3,
				group: 'NUMBER HOMOPHONES',
				members: ['ATE', 'FOR', 'TOO', 'WON'],
			},
		],
	},
	{
		id: 102,
		date: '2023-09-21',
		answers: [
			{
				level: 0,
				group: 'RESTAURANT WORKERS',
				members: ['BARTENDER', 'CHEF', 'HOST', 'SERVER'],
			},
			{
				level: 1,
				group: 'MOTOR VEHICLES',
				members: ['BUS', 'CAR', 'MOTORCYCLE', 'TRUCK'],
			},
			{
				level: 2,
				group: 'MUPPETS',
				members: ['ANIMAL', 'BEAKER', 'GONZO', 'SCOOTER'],
			},
			{
				level: 3,
				group: 'HAND- AND FOOT-RELATED SLANG',
				members: ['DIGIT', 'DOG', 'MITT', 'PIGGY'],
			},
		],
	},
	{
		id: 103,
		date: '2023-09-22',
		answers: [
			{
				level: 0,
				group: 'SODA FOUNTAIN ORDERS',
				members: ['FLOAT', 'MALT', 'SHAKE', 'SUNDAE'],
			},
			{
				level: 1,
				group: 'SET, AS PLANS',
				members: ['CONCRETE', 'FIRM', 'SOLID', 'TANGIBLE'],
			},
			{
				level: 2,
				group: 'M. NIGHT SHYAMALAN MOVIES',
				members: ['GLASS', 'OLD', 'SIGNS', 'SPLIT'],
			},
			{
				level: 3,
				group: '___BOARD',
				members: ['DASH', 'HOVER', 'KEY', 'STAR'],
			},
		],
	},
	{
		id: 104,
		date: '2023-09-23',
		answers: [
			{
				level: 0,
				group: 'ROBUST',
				members: ['FIT', 'HEALTHY', 'SOUND', 'STRONG'],
			},
			{
				level: 1,
				group: 'DECLINE',
				members: ['DIP', 'DROP', 'FALL', 'SINK'],
			},
			{
				level: 2,
				group: 'WATER SOURCES',
				members: ['FOUNTAIN', 'SPRING', 'TAP', 'WELL'],
			},
			{
				level: 3,
				group: 'WOMEN SINGERS',
				members: ['KEYS', 'NICKS', 'SUMMER', 'SWIFT'],
			},
		],
	},
	{
		id: 105,
		date: '2023-09-24',
		answers: [
			{
				level: 0,
				group: 'KITCHEN UTENSILS',
				members: ['GRATER', 'LADLE', 'PEELER', 'WHISK'],
			},
			{
				level: 1,
				group: 'VERTEBRATES',
				members: ['BIRD', 'FISH', 'MAMMAL', 'REPTILE'],
			},
			{
				level: 2,
				group: 'SUPER MARIO-RELATED',
				members: ['DINOSAUR', 'MUSHROOM', 'PLUMBER', 'PRINCESS'],
			},
			{
				level: 3,
				group: 'SITCOM FAMILIES',
				members: ['BUNKER', 'CLEAVER', 'PARTRIDGE', 'TANNER'],
			},
		],
	},
	{
		id: 106,
		date: '2023-09-25',
		answers: [
			{
				level: 0,
				group: 'BRIDAL ACCESSORIES',
				members: ['BOUQUET', 'RING', 'TRAIN', 'VEIL'],
			},
			{
				level: 1,
				group: '\u201cC\u201d WORDS FOR \u201cENVELOP\u201d',
				members: ['CAKE', 'COAT', 'COVER', 'CRUST'],
			},
			{
				level: 2,
				group: 'JACKS',
				members: ['BLACK', 'FROST', 'MA', 'SPARROW'],
			},
			{
				level: 3,
				group: 'SOCIAL MEDIA APP ENDINGS',
				members: ['BOOK', 'GRAM', 'IN', 'TUBE'],
			},
		],
	},
	{
		id: 107,
		date: '2023-09-26',
		answers: [
			{
				level: 0,
				group: 'SNAKES',
				members: ['BOA', 'MAMBA', 'PYTHON', 'VIPER'],
			},
			{
				level: 1,
				group: 'LINGERIE',
				members: ['GARTER', 'SLIP', 'TEDDY', 'THONG'],
			},
			{
				level: 2,
				group: 'SUMMARY',
				members: ['ABSTRACT', 'BRIEF', 'DIGEST', 'RUNDOWN'],
			},
			{
				level: 3,
				group: 'FULL ___',
				members: ['CIRCLE', 'HOUSE', 'MONTY', 'MOON'],
			},
		],
	},
	{
		id: 108,
		date: '2023-09-27',
		answers: [
			{
				level: 0,
				group: 'PRODUCED BY TREES',
				members: ['ACORN', 'CONE', 'POLLEN', 'SAP'],
			},
			{
				level: 1,
				group: 'CANDY STORE TREATS',
				members: ['CHOCOLATE', 'GUM', 'LICORICE', 'LOLLIPOP'],
			},
			{
				level: 2,
				group: 'TARGET OF A SCHEME',
				members: ['CHUMP', 'FOOL', 'MARK', 'SUCKER'],
			},
			{
				level: 3,
				group: 'THINGS WITH EYE(S)',
				members: ['FACE', 'HURRICANE', 'NEEDLE', 'POTATO'],
			},
		],
	},
	{
		id: 109,
		date: '2023-09-28',
		answers: [
			{
				level: 0,
				group: 'REFLECT LIGHT',
				members: ['FLASH', 'GLEAM', 'GLITTER', 'SPARKLE'],
			},
			{
				level: 1,
				group: 'WAYS TO GATHER FOOD',
				members: ['FISH', 'FORAGE', 'HUNT', 'TRAP'],
			},
			{
				level: 2,
				group: 'RAP SUBGENRES',
				members: ['BOUNCE', 'CRUNK', 'DRILL', 'GRIME'],
			},
			{
				level: 3,
				group: 'LIGHT ___',
				members: ['BEER', 'BULB', 'RAIL', 'YEAR'],
			},
		],
	},
	{
		id: 110,
		date: '2023-09-29',
		answers: [
			{
				level: 0,
				group: 'VERY IMPORTANT',
				members: ['CENTRAL', 'CRITICAL', 'KEY', 'VITAL'],
			},
			{
				level: 1,
				group: 'RECYCLING CATEGORIES',
				members: ['GLASS', 'METAL', 'PAPER', 'PLASTIC'],
			},
			{
				level: 2,
				group: 'HUDSONS',
				members: ['HENRY', 'JENNIFER', 'KATE', 'ROCK'],
			},
			{
				level: 3,
				group: 'WHAT \u201cBEAT\u201d MAY MEAN',
				members: ['ASSIGNMENT', 'DEFEAT', 'TEMPO', 'TIRED'],
			},
		],
	},
	{
		id: 111,
		date: '2023-09-30',
		answers: [
			{
				level: 0,
				group: 'PLAYING CARD SUITS',
				members: ['CLUB', 'DIAMOND', 'HEART', 'SPADE'],
			},
			{
				level: 1,
				group: 'GOLF CLUBS',
				members: ['IRON', 'PUTTER', 'WEDGE', 'WOOD'],
			},
			{
				level: 2,
				group: 'YEARN',
				members: ['ACHE', 'LONG', 'PINE', 'THIRST'],
			},
			{
				level: 3,
				group: 'INSUFFICIENT',
				members: ['LOW', 'SHORT', 'SHY', 'WANTING'],
			},
		],
	},
	{
		id: 112,
		date: '2023-10-01',
		answers: [
			{
				level: 0,
				group: 'COFFEE COUNTER ITEMS',
				members: ['CUP', 'LID', 'STIRRER', 'STRAW'],
			},
			{
				level: 1,
				group: 'NOCTURNAL ANIMALS',
				members: ['BAT', 'MOTH', 'OWL', 'WOLF'],
			},
			{
				level: 2,
				group: 'THINGS THAT ARE RED',
				members: ['BEET', 'BRICK', 'CARDINAL', 'POPPY'],
			},
			{
				level: 3,
				group: '___ FIGURE',
				members: ['ACTION', 'BALLPARK', 'GO', 'STICK'],
			},
		],
	},
	{
		id: 113,
		date: '2023-10-02',
		answers: [
			{
				level: 0,
				group: 'WAYS TO SHOW RESPECT',
				members: ['BOW', 'KNEEL', 'SALUTE', 'STAND'],
			},
			{
				level: 1,
				group: 'IPHONE APPS',
				members: ['CLOCK', 'MAIL', 'MAPS', 'NOTES'],
			},
			{
				level: 2,
				group: 'ANIMAL COVERINGS',
				members: ['DOWN', 'FUR', 'SCALES', 'SHELL'],
			},
			{
				level: 3,
				group: '\u201cPOINTERS\u201d',
				members: ['ARROW', 'DOG', 'FINGER', 'HINT'],
			},
		],
	},
	{
		id: 114,
		date: '2023-10-03',
		answers: [
			{
				level: 0,
				group: 'LONG-HAIRED ANIMALS',
				members: ['AFGHAN', 'ALPACA', 'ANGORA', 'YAK'],
			},
			{
				level: 1,
				group: 'PRATTLE ON',
				members: ['BLATHER', 'CHAT', 'JABBER', 'GAB'],
			},
			{
				level: 2,
				group: 'SNEAKER BRANDS',
				members: ['CONVERSE', 'JORDAN', 'PUMA', 'VANS'],
			},
			{
				level: 3,
				group: '___ BALLOON',
				members: ['LEAD', 'SPEECH', 'TRIAL', 'WATER'],
			},
		],
	},
	{
		id: 115,
		date: '2023-10-04',
		answers: [
			{
				level: 0,
				group: 'CHRISTMAS-RELATED',
				members: ['MISTLETOE', 'REINDEER', 'SNOWMAN', 'STOCKING'],
			},
			{
				level: 1,
				group: 'MAKE PUBLIC',
				members: ['DISPLAY', 'EXHIBIT', 'PRESENT', 'SHOW'],
			},
			{
				level: 2,
				group: 'TORUS-SHAPED FOOD',
				members: ['BAGEL', 'CHEERIO', 'DONUT', 'LIFESAVER'],
			},
			{
				level: 3,
				group: 'THINGS WITH STRIPES',
				members: ['CANDY CANE', 'CROSSWALK', 'REFEREE', 'TIGER'],
			},
		],
	},
	{
		id: 116,
		date: '2023-10-05',
		answers: [
			{
				level: 0,
				group: 'DIVISION',
				members: ['ARM', 'BRANCH', 'CHAPTER', 'WING'],
			},
			{
				level: 1,
				group: 'IMPERIAL UNITS',
				members: ['BUSHEL', 'PECK', 'STONE', 'TON'],
			},
			{
				level: 2,
				group: 'M.L.B. TEAM MEMBER',
				members: ['ANGEL', 'CUB', 'MET', 'RED'],
			},
			{
				level: 3,
				group: 'INSECT HOMOPHONES',
				members: ['AUNT', 'BEATLE', 'FLEE', 'NAT'],
			},
		],
	},
	{
		id: 117,
		date: '2023-10-06',
		answers: [
			{
				level: 0,
				group: 'LAUGHTER, IN A TEXT',
				members: ['DEAD', 'HAHA', 'LOL', 'ROFL'],
			},
			{
				level: 1,
				group: 'ART MOVEMENTS',
				members: ['DADA', 'DECO', 'GOTHIC', 'POP'],
			},
			{
				level: 2,
				group: '\u201cPETER PAN\u201d CHARACTERS',
				members: ['HOOK', 'NANA', 'PETER', 'WENDY'],
			},
			{
				level: 3,
				group: 'LADY ___',
				members: ['BIRD', 'GAGA', 'LUCK', 'MACBETH'],
			},
		],
	},
	{
		id: 118,
		date: '2023-10-07',
		answers: [
			{
				level: 0,
				group: 'RHYMES',
				members: ['DARREN', 'KAREN', 'SHARON', 'AARON'],
			},
			{
				level: 1,
				group: 'NATURAL FEATURES',
				members: ['DALE', 'BROOK', 'SAVANNA', 'CLIFF'],
			},
			{
				level: 2,
				group: 'IRREGULAR VERBS',
				members: ['DREW', 'ROSE', 'WILL', 'MAY'],
			},
			{
				level: 3,
				group: 'PALINDROMES',
				members: ['EVE', 'HANNAH', 'OTTO', 'NATAN'],
			},
		],
	},
	{
		id: 119,
		date: '2023-10-08',
		answers: [
			{
				level: 0,
				group: 'CELEBRATORY OCCASIONS',
				members: ['ANNIVERSARY', 'BIRTHDAY', 'SHOWER', 'WEDDING'],
			},
			{
				level: 1,
				group: 'PHONE CONNECTIVITY',
				members: ['BARS', 'RECEPTION', 'SERVICE', 'SIGNAL'],
			},
			{
				level: 2,
				group: 'CITIES AND TOWNS IN ENGLAND',
				members: ['BATH', 'DERBY', 'READING', 'SANDWICH'],
			},
			{
				level: 3,
				group: '___ OPERA',
				members: ['COMIC', 'MET', 'ROCK', 'SOAP'],
			},
		],
	},
	{
		id: 120,
		date: '2023-10-09',
		answers: [
			{
				level: 0,
				group: 'CROPS',
				members: ['CORN', 'CUCUMBER', 'PEPPER', 'TOMATO'],
			},
			{
				level: 1,
				group: 'SLANG FOR HEAD',
				members: ['CROWN', 'DOME', 'MELON', 'NOODLE'],
			},
			{
				level: 2,
				group: 'SONG',
				members: ['CUT', 'NUMBER', 'SINGLE', 'TRACK'],
			},
			{
				level: 3,
				group: 'THINGS THAT WHISTLE',
				members: ['BIRD', 'KETTLE', 'REFEREE', 'TRAIN'],
			},
		],
	},
	{
		id: 121,
		date: '2023-10-10',
		answers: [
			{
				level: 0,
				group: 'ORIGIN',
				members: ['GENESIS', 'GERM', 'SEED', 'SOURCE'],
			},
			{
				level: 1,
				group: 'BIBLE BOOKS',
				members: ['ACTS', 'JOB', 'KINGS', 'MARK'],
			},
			{
				level: 2,
				group: 'N.H.L. TEAMS',
				members: ['FLAMES', 'KRAKEN', 'STARS', 'WILD'],
			},
			{
				level: 3,
				group: 'POWER ___',
				members: ['NAP', 'PLANT', 'RANGER', 'TRIP'],
			},
		],
	},
	{
		id: 122,
		date: '2023-10-11',
		answers: [
			{
				level: 0,
				group: 'FILM SET DIRECTIVES',
				members: ['ACTION', 'CAMERA', 'CUT', 'LIGHTS'],
			},
			{
				level: 1,
				group: 'CONDITIONAL WORDS',
				members: ['CAN', 'COULD', 'MAY', 'MIGHT'],
			},
			{
				level: 2,
				group: 'FOREMOST',
				members: ['HEAD', 'LEAD', 'PRIME', 'TOP'],
			},
			{
				level: 3,
				group: '___ PAPER',
				members: ['BUTCHER', 'SCRAP', 'TOILET', 'WAX'],
			},
		],
	},
	{
		id: 123,
		date: '2023-10-12',
		answers: [
			{
				level: 0,
				group: 'CONCEAL',
				members: ['BLOCK', 'COVER', 'HIDE', 'MASK'],
			},
			{
				level: 1,
				group: 'PARTS OF A WATCH',
				members: ['CROWN', 'DIAL', 'HAND', 'STRAP'],
			},
			{
				level: 2,
				group: 'WONDER WOMAN\u2019S COSTUME',
				members: ['LASSO', 'SHIELD', 'SWORD', 'TIARA'],
			},
			{
				level: 3,
				group: 'THINGS THAT CAN RUN',
				members: ['CANDIDATE', 'FAUCET', 'MASCARA', 'NOSE'],
			},
		],
	},
	{
		id: 124,
		date: '2023-10-13',
		answers: [
			{
				level: 0,
				group: 'BEANS',
				members: ['FAVA', 'KIDNEY', 'LIMA', 'PINTO'],
			},
			{
				level: 1,
				group: 'CITIES BEGINNING WITH \u201cL\u201d',
				members: ['LAGOS', 'LIMERICK', 'LINCOLN', 'LUXOR'],
			},
			{
				level: 2,
				group: 'POETRY TERMS',
				members: ['LINE', 'METER', 'RHYME', 'VERSE'],
			},
			{
				level: 3,
				group: '\u201cTHE(E) ___\u201d RAPPERS',
				members: ['CREATOR', 'DUDE', 'RAPPER', 'STALLION'],
			},
		],
	},
	{
		id: 125,
		date: '2023-10-14',
		answers: [
			{
				level: 0,
				group: 'BUTT',
				members: ['BOTTOM', 'BUNS', 'SEAT', 'TAIL'],
			},
			{
				level: 1,
				group: 'ROTARY PHONE PARTS',
				members: ['CORD', 'CRADLE', 'DIAL', 'HANDSET'],
			},
			{
				level: 2,
				group: 'SLANG FOR HOME',
				members: ['CRIB', 'DIGS', 'JOINT', 'PAD'],
			},
			{
				level: 3,
				group: 'PLUNDER',
				members: ['BOOTY', 'LOOT', 'SPOILS', 'SWAG'],
			},
		],
	},
	{
		id: 126,
		date: '2023-10-15',
		answers: [
			{
				level: 0,
				group: 'TOOLS',
				members: ['FILE', 'HAMMER', 'LEVEL', 'SAW'],
			},
			{
				level: 1,
				group: 'PULL',
				members: ['JERK', 'TUG', 'WRENCH', 'YANK'],
			},
			{
				level: 2,
				group: 'SHORTCUT COMMANDS',
				members: ['COPY', 'FIND', 'PRINT', 'SAVE'],
			},
			{
				level: 3,
				group: 'TITLE MOVIE ANIMALS',
				members: ['BABE', 'BEETHOVEN', 'CHARLOTTE', 'WILLY'],
			},
		],
	},
	{
		id: 127,
		date: '2023-10-16',
		answers: [
			{
				level: 0,
				group: 'DAYS OF THE WEEK',
				members: ['FRIDAY', 'SATURDAY', 'SUNDAY', 'THURSDAY'],
			},
			{
				level: 1,
				group: 'GO BAD',
				members: ['ROT', 'SOUR', 'SPOIL', 'TURN'],
			},
			{
				level: 2,
				group: '\u201cTHE ADDAMS FAMILY\u201d CHARACTERS',
				members: ['FESTER', 'LURCH', 'THING', 'WEDNESDAY'],
			},
			{
				level: 3,
				group: 'FAT ___',
				members: ['CAT', 'CHANCE', 'LIP', 'TUESDAY'],
			},
		],
	},
	{
		id: 128,
		date: '2023-10-17',
		answers: [
			{
				level: 0,
				group: 'TAUNTS',
				members: ['BOO', 'HISS', 'JEER', 'RASPBERRY'],
			},
			{
				level: 1,
				group: 'FAILURE',
				members: ['BOMB', 'DUD', 'FLOP', 'LEMON'],
			},
			{
				level: 2,
				group: 'RUDELY BREAK OFF CONTACT',
				members: ['DESERT', 'GHOST', 'IGNORE', 'JILT'],
			},
			{
				level: 3,
				group: 'ROCK ___',
				members: ['BOTTOM', 'CANDY', 'GARDEN', 'STAR'],
			},
		],
	},
	{
		id: 129,
		date: '2023-10-18',
		answers: [
			{
				level: 0,
				group: 'SOMETHING TIRESOME',
				members: ['BORE', 'DRAG', 'SNOOZE', 'YAWN'],
			},
			{
				level: 1,
				group: 'BIT OF WIND',
				members: ['BREEZE', 'DRAFT', 'GUST', 'PUFF'],
			},
			{
				level: 2,
				group: 'PIQUANCY',
				members: ['BITE', 'KICK', 'TANG', 'ZIP'],
			},
			{
				level: 3,
				group: 'SINGULAR OF THINGS SEEN IN PAIRS',
				members: ['BOXER', 'GOGGLE', 'PANT', 'TONG'],
			},
		],
	},
	{
		id: 130,
		date: '2023-10-19',
		answers: [
			{
				level: 0,
				group: 'FALSIFY',
				members: ['FABRICATE', 'FAKE', 'FIX', 'FORGE'],
			},
			{
				level: 1,
				group: 'MILD OATHS',
				members: ['FIDDLESTICKS', 'FIE', 'FRICK', 'FUDGE'],
			},
			{
				level: 2,
				group: 'TV SHOWS',
				members: ['FARGO', 'FIREFLY', 'FLEABAG', 'FLIPPER'],
			},
			{
				level: 3,
				group: 'FAST ___',
				members: ['FASHION', 'FOOD', 'FORWARD', 'FRIENDS'],
			},
		],
	},
	{
		id: 131,
		date: '2023-10-20',
		answers: [
			{
				level: 0,
				group: 'ANIMAL HOMES',
				members: ['DEN', 'HIVE', 'LAIR', 'NEST'],
			},
			{
				level: 1,
				group: 'VIRTUAL SPACES',
				members: ['CLOUD', 'METAVERSE', 'NET', 'WEB'],
			},
			{
				level: 2,
				group: 'EQUITABLE',
				members: ['EQUAL', 'EVEN', 'FAIR', 'JUST'],
			},
			{
				level: 3,
				group: '___ BURGER',
				members: ['GOOD', 'IMPOSSIBLE', 'NOTHING', 'WARREN'],
			},
		],
	},
	{
		id: 132,
		date: '2023-10-21',
		answers: [
			{
				level: 0,
				group: 'TABLEWARE',
				members: ['BOWL', 'DISH', 'PLATE', 'SAUCER'],
			},
			{
				level: 1,
				group: 'NONSENSE',
				members: ['BALONEY', 'BUNK', 'CROCK', 'TRIPE'],
			},
			{
				level: 2,
				group: 'BRA PARTS',
				members: ['CUP', 'HOOK', 'STRAP', 'WIRE'],
			},
			{
				level: 3,
				group: 'ACRONYMS',
				members: ['LASER', 'RADAR', 'SCUBA', 'SPAM'],
			},
		],
	},
	{
		id: 133,
		date: '2023-10-22',
		answers: [
			{
				level: 0,
				group: 'RELAX',
				members: ['CHILL', 'HANG', 'LOAF', 'LOUNGE'],
			},
			{
				level: 1,
				group: 'CATCHY SONG',
				members: ['BANGER', 'BOP', 'GROOVE', 'JAM'],
			},
			{
				level: 2,
				group: 'BRITISH CUISINE',
				members: ['MASH', 'ROAST', 'SCONE', 'TRIFLE'],
			},
			{
				level: 3,
				group: 'STICKY SITUATION',
				members: ['BIND', 'PICKLE', 'SCRAPE', 'SPOT'],
			},
		],
	},
	{
		id: 134,
		date: '2023-10-23',
		answers: [
			{
				level: 0,
				group: 'CELL PHONE MODES',
				members: ['FOCUS', 'RING', 'SILENT', 'VIBRATE'],
			},
			{
				level: 1,
				group: 'IMPEL',
				members: ['DRIVE', 'INSPIRE', 'MOTIVATE', 'SPUR'],
			},
			{
				level: 2,
				group: 'ROMANTIC BEGINNINGS',
				members: ['CONNECTION', 'FEELINGS', 'SPARK', 'VIBE'],
			},
			{
				level: 3,
				group: 'HARD ___',
				members: ['CANDY', 'COPY', 'KNOCKS', 'SELTZER'],
			},
		],
	},
	{
		id: 135,
		date: '2023-10-24',
		answers: [
			{
				level: 0,
				group: 'ANIMAL GROUPS',
				members: ['COLONY', 'HERD', 'PRIDE', 'SCHOOL'],
			},
			{
				level: 1,
				group: 'SMALL OPENING',
				members: ['CRANNY', 'NICHE', 'NOOK', 'RECESS'],
			},
			{
				level: 2,
				group: 'PARADIGMATIC',
				members: ['CLASSIC', 'DEFINITIVE', 'MODEL', 'TEXTBOOK'],
			},
			{
				level: 3,
				group: 'RHYMING COMPOUND WORDS',
				members: ['BACKPACK', 'BIGWIG', 'DOWNTOWN', 'RAGTAG'],
			},
		],
	},
	{
		id: 136,
		date: '2023-10-25',
		answers: [
			{
				level: 0,
				group: 'GRAMMAR TENSE TERMS',
				members: ['FUTURE', 'PAST', 'PERFECT', 'PRESENT'],
			},
			{
				level: 1,
				group: '\u201cGRACIOUS ME!\u201d',
				members: ['GOODNESS', 'HEAVENS', 'LORD', 'MERCY'],
			},
			{
				level: 2,
				group: '12 DAYS OF CHRISTMAS',
				members: ['DRUMMER', 'LADY', 'RING', 'SWAN'],
			},
			{
				level: 3,
				group: '___ SYRUP',
				members: ['CORN', 'COUGH', 'MAPLE', 'SIMPLE'],
			},
		],
	},
	{
		id: 137,
		date: '2023-10-26',
		answers: [
			{
				level: 0,
				group: 'INCREASE',
				members: ['BUILD', 'GROW', 'SWELL', 'MOUNT'],
			},
			{
				level: 1,
				group: 'EXCELLENT, IN OLD SLANG',
				members: ['ACES', 'KEEN', 'NEATO', 'NIFTY'],
			},
			{
				level: 2,
				group: 'FINE BUBBLES',
				members: ['FOAM', 'FROTH', 'HEAD', 'LATHER'],
			},
			{
				level: 3,
				group: 'SPHERICAL THINGS',
				members: ['BUBBLE', 'GLOBE', 'MARBLE', 'PEARL'],
			},
		],
	},
	{
		id: 138,
		date: '2023-10-27',
		answers: [
			{
				level: 0,
				group: 'SHAMELESS BOLDNESS',
				members: ['BRASS', 'CHEEK', 'GALL', 'NERVE'],
			},
			{
				level: 1,
				group: 'METAL ELEMENTS',
				members: ['COPPER', 'GOLD', 'NICKEL', 'SILVER'],
			},
			{
				level: 2,
				group: 'W.N.B.A. TEAMS',
				members: ['MERCURY', 'SKY', 'SPARKS', 'LIBERTY'],
			},
			{
				level: 3,
				group: 'THINGS WITH TRUNKS',
				members: ['CARS', 'ELEPHANTS', 'SWIMMERS', 'TREES'],
			},
		],
	},
	{
		id: 139,
		date: '2023-10-28',
		answers: [
			{
				level: 0,
				group: 'SENSES',
				members: ['SIGHT', 'SMELL', 'TASTE', 'TOUCH'],
			},
			{
				level: 1,
				group: 'APPEARANCE',
				members: ['DRESS', 'LOOK', 'MANNER', 'STYLE'],
			},
			{
				level: 2,
				group: '\u201cAGREE!\u201d',
				members: ['DITTO', 'LIKEWISE', 'SAME', 'SECOND'],
			},
			{
				level: 3,
				group: '___ MOON',
				members: ['BLUE', 'HARVEST', 'NEW', 'SAILOR'],
			},
		],
	},
	{
		id: 140,
		date: '2023-10-29',
		answers: [
			{
				level: 0,
				group: 'MISHMASH',
				members: ['HASH', 'JUMBLE', 'MEDLEY', 'STEW'],
			},
			{
				level: 1,
				group: 'GO UP AGAINST',
				members: ['CHALLENGE', 'CONFRONT', 'FACE', 'OPPOSE'],
			},
			{
				level: 2,
				group: 'GROUP OF OFFSPRING',
				members: ['BROOD', 'CLUTCH', 'HATCH', 'LITTER'],
			},
			{
				level: 3,
				group: 'GUITAR PARTS',
				members: ['BODY', 'BRIDGE', 'FRET', 'NECK'],
			},
		],
	},
	{
		id: 141,
		date: '2023-10-30',
		answers: [
			{
				level: 0,
				group: 'BIRD FEATURES',
				members: ['BEAK', 'FEATHER', 'TALON', 'WING'],
			},
			{
				level: 1,
				group: 'BLINK OF AN EYE',
				members: ['FLASH', 'HEARTBEAT', 'SECOND', 'WINK'],
			},
			{
				level: 2,
				group: 'MAHJONG TILES',
				members: ['BAMBOO', 'DRAGON', 'SEASON', 'WIND'],
			},
			{
				level: 3,
				group: '___ BUTTON',
				members: ['BELLY', 'HOT', 'PANIC', 'SNOOZE'],
			},
		],
	},
	{
		id: 142,
		date: '2023-10-31',
		answers: [
			{
				level: 0,
				group: 'FLOWERS',
				members: ['DAISY', 'ROSE', 'TULIP', 'VIOLET'],
			},
			{
				level: 1,
				group: 'SEEN ON A FARM',
				members: ['BARN', 'CHICKEN', 'FARMER', 'TRACTOR'],
			},
			{
				level: 2,
				group: 'HORROR DIRECTORS',
				members: ['ASTER', 'CARPENTER', 'CRAVEN', 'WAN'],
			},
			{
				level: 3,
				group: '___ JACKET',
				members: ['DUST', 'LIFE', 'SPORTS', 'YELLOW'],
			},
		],
	},
	{
		id: 143,
		date: '2023-11-01',
		answers: [
			{
				level: 0,
				group: 'SOCIAL MEDIA ACTIONS',
				members: ['FOLLOW', 'LIKE', 'SHARE', 'SUBSCRIBE'],
			},
			{
				level: 1,
				group: 'USE A NEEDLE AND THREAD',
				members: ['DARN', 'HEM', 'SEAM', 'SEW'],
			},
			{
				level: 2,
				group: 'SHOWS SET IN HOSPITALS',
				members: ['ER', 'HOUSE', 'RATCHED', 'SCRUBS'],
			},
			{
				level: 3,
				group: 'EXPRESSIONS OF HESITATION',
				members: ['ERM', 'UH', 'UM', 'WELL'],
			},
		],
	},
	{
		id: 144,
		date: '2023-11-02',
		answers: [
			{
				level: 0,
				group: 'IGNITE',
				members: ['BURN', 'KINDLE', 'LIGHT', 'TORCH'],
			},
			{
				level: 1,
				group: 'INFORMATION',
				members: ['DATA', 'INFO', 'INTEL', 'NEWS'],
			},
			{
				level: 2,
				group: 'SMALL WOODED AREA',
				members: ['DELL', 'GLEN', 'HOLLOW', 'VALLEY'],
			},
			{
				level: 3,
				group: 'THINGS WITH CORES',
				members: ['APPLE', 'COMPUTER', 'PLANET', 'REACTOR'],
			},
		],
	},
	{
		id: 145,
		date: '2023-11-03',
		answers: [
			{
				level: 0,
				group: 'NEVERTHELESS',
				members: ['HOWEVER', 'STILL', 'THOUGH', 'YET'],
			},
			{
				level: 1,
				group: 'REPEATED WORDS IN EXPRESSIONS',
				members: ['HEAR', 'KNOCK', 'THERE', 'TUT'],
			},
			{
				level: 2,
				group: 'WORDS ABBREVIATED WITH LETTERS',
				members: ['ARE', 'SEE', 'WHY', 'YOU'],
			},
			{
				level: 3,
				group: 'ROYAL ___',
				members: ['FAMILY', 'FLUSH', 'JELLY', 'WE'],
			},
		],
	},
	{
		id: 146,
		date: '2023-11-04',
		answers: [
			{
				level: 0,
				group: 'WAYS TO PREPARE',
				members: ['DRILL', 'PRACTICE', 'STUDY', 'TRAIN'],
			},
			{
				level: 1,
				group: 'HOLLOW CYLINDERS',
				members: ['HOSE', 'PIPE', 'STRAW', 'TUBE'],
			},
			{
				level: 2,
				group: 'WEAPONS IN THE GAME CLUE',
				members: ['CANDLESTICK', 'KNIFE', 'ROPE', 'WRENCH'],
			},
			{
				level: 3,
				group: '\u201cE-\u201d THINGS',
				members: ['CIGARETTE', 'BIKE', 'TICKET', 'SPORTS'],
			},
		],
	},
	{
		id: 147,
		date: '2023-11-05',
		answers: [
			{
				level: 0,
				group: 'UNCHANGING',
				members: ['EVEN', 'LEVEL', 'STABLE', 'STEADY'],
			},
			{
				level: 1,
				group: 'LONG, SHARP OBJECTS',
				members: ['LANCE', 'PIN', 'SKEWER', 'SPIT'],
			},
			{
				level: 2,
				group: 'MUSIC PUBLICATIONS',
				members: ['BILLBOARD', 'PITCHFORK', 'ROLLING STONE', 'SPIN'],
			},
			{
				level: 3,
				group: 'WORDS WITH NUMERICAL PREFIXES',
				members: ['UNIFORM', 'BICYCLE', 'TRILOGY', 'QUADRANT'],
			},
		],
	},
	{
		id: 148,
		date: '2023-11-06',
		answers: [
			{
				level: 0,
				group: 'INVESTMENTS',
				members: ['BOND', 'CD', 'OPTION', 'STOCK'],
			},
			{
				level: 1,
				group: 'TERMS FOR RECORDS',
				members: ['LP', 'PLATTER', 'VINYL', 'WAX'],
			},
			{
				level: 2,
				group: 'CUBE-SHAPED',
				members: ['BOUILLON', 'DIE', 'ICE', 'SUGAR'],
			},
			{
				level: 3,
				group: 'WORDS THAT GO WITH \u201cBONE\u201d',
				members: ['FUNNY', 'HERRING', 'SOUP', 'WISH'],
			},
		],
	},
	{
		id: 149,
		date: '2023-11-07',
		answers: [
			{
				level: 0,
				group: 'DIGITAL NOTIFICATION SOUNDS',
				members: ['CHIME', 'DING', 'PING', 'RING'],
			},
			{
				level: 1,
				group: 'TATTLE',
				members: ['RAT', 'SING', 'SNITCH', 'SQUEAL'],
			},
			{
				level: 2,
				group: 'GROUP WITHIN A GROUP',
				members: ['CAMP', 'DIVISION', 'FACTION', 'WING'],
			},
			{
				level: 3,
				group: 'MICROSOFT PRODUCTS',
				members: ['BING', 'EDGE', 'SURFACE', 'WORD'],
			},
		],
	},
	{
		id: 150,
		date: '2023-11-08',
		answers: [
			{
				level: 0,
				group: 'BROUGHT TO THE BEACH',
				members: ['FLIP-FLOP', 'SUNSCREEN', 'TOWEL', 'UMBRELLA'],
			},
			{
				level: 1,
				group: 'TYPES OF FRENCH FRIES',
				members: ['CURLY', 'SHOESTRING', 'WAFFLE', 'WEDGE'],
			},
			{
				level: 2,
				group: 'EQUIVOCATE',
				members: ['HEDGE', 'SEE-SAW', 'WAVER', 'YO-YO'],
			},
			{
				level: 3,
				group: 'SECOND WORDS OF VODKA COCKTAILS',
				members: ['BREEZE', 'MARY', 'MULE', 'RUSSIAN'],
			},
		],
	},
	{
		id: 151,
		date: '2023-11-09',
		answers: [
			{
				level: 0,
				group: 'DOCTORS\u2019 ORDERS',
				members: ['DIET', 'EXERCISE', 'FRESH AIR', 'SLEEP'],
			},
			{
				level: 1,
				group: 'EMAIL ACTIONS',
				members: ['COMPOSE', 'FORWARD', 'REPLY ALL', 'SEND'],
			},
			{
				level: 2,
				group: 'PODCASTS',
				members: ['RADIOLAB', 'SERIAL', 'UP FIRST', 'WTF'],
			},
			{
				level: 3,
				group: '___ COMEDY',
				members: ['BLACK', 'DIVINE', 'PROP', 'SKETCH'],
			},
		],
	},
	{
		id: 152,
		date: '2023-11-10',
		answers: [
			{
				level: 0,
				group: 'SPICES',
				members: ['ANISE', 'DILL', 'NUTMEG', 'SAGE'],
			},
			{
				level: 1,
				group: 'INTELLIGENT',
				members: ['BRIGHT', 'QUICK', 'SHARP', 'SMART'],
			},
			{
				level: 2,
				group: 'DEODORANTS',
				members: ['AXE', 'DEGREE', 'OLD SPICE', 'SECRET'],
			},
			{
				level: 3,
				group: 'MEDIEVAL WEAPONS',
				members: ['CLUB', 'MACE', 'SPEAR', 'SWORD'],
			},
		],
	},
	{
		id: 153,
		date: '2023-11-11',
		answers: [
			{
				level: 0,
				group: 'SPARSE/LACKING',
				members: ['LIGHT', 'SHORT', 'SPARE', 'THIN'],
			},
			{
				level: 1,
				group: 'FUN TIME',
				members: ['BALL', 'BLAST', 'KICK', 'RIOT'],
			},
			{
				level: 2,
				group: 'FILMMAKING EQUIPMENT',
				members: ['BOOM', 'DOLLY', 'LENS', 'TRIPOD'],
			},
			{
				level: 3,
				group: '\u201cGET A ___!\u201d',
				members: ['CLUE', 'GRIP', 'LIFE', 'ROOM'],
			},
		],
	},
	{
		id: 154,
		date: '2023-11-12',
		answers: [
			{
				level: 0,
				group: 'PRESIDENTS',
				members: ['FORD', 'GRANT', 'LINCOLN', 'WILSON'],
			},
			{
				level: 1,
				group: 'SPORTS PROFESSIONALS',
				members: ['COACH', 'GM', 'PLAYER', 'SCOUT'],
			},
			{
				level: 2,
				group: 'CAR COMPANIES',
				members: ['BMW', 'HONDA', 'JAGUAR', 'SUBARU'],
			},
			{
				level: 3,
				group: 'COMMON PREFIXES',
				members: ['AUTO', 'POST', 'SEMI', 'SUB'],
			},
		],
	},
	{
		id: 155,
		date: '2023-11-13',
		answers: [
			{
				level: 0,
				group: 'UNIT OF LANGUAGE',
				members: ['LETTER', 'PARAGRAPH', 'SENTENCE', 'WORD'],
			},
			{
				level: 1,
				group: 'TRADEMARK',
				members: ['FEATURE', 'HALLMARK', 'STAMP', 'TRAIT'],
			},
			{
				level: 2,
				group: 'FUNNY PERSON',
				members: ['CARD', 'CLOWN', 'CUTUP', 'JOKER'],
			},
			{
				level: 3,
				group: 'THINGS WITH LEAVES',
				members: ['BOOK', 'TABLE', 'TEA', 'TREE'],
			},
		],
	},
	{
		id: 156,
		date: '2023-11-14',
		answers: [
			{
				level: 0,
				group: 'BASIC EMOTIONS',
				members: ['ANGER', 'FEAR', 'HAPPINESS', 'SURPRISE'],
			},
			{
				level: 1,
				group: 'BIT OF VOCAL FANFARE',
				members: ['BEHOLD', 'PRESTO', 'TADA', 'VOILA'],
			},
			{
				level: 2,
				group: 'OBTAIN',
				members: ['GET', 'LAND', 'SECURE', 'WIN'],
			},
			{
				level: 3,
				group: '___ ANT',
				members: ['ADAM', 'CARPENTER', 'FIRE', 'RED'],
			},
		],
	},
	{
		id: 157,
		date: '2023-11-15',
		answers: [
			{
				level: 0,
				group: '\u201cGROSS!\u201d',
				members: ['EW', 'ICK', 'PU', 'UGH'],
			},
			{
				level: 1,
				group: 'MAGAZINES',
				members: ['O', 'OK', 'US', 'W'],
			},
			{
				level: 2,
				group: '\u201cYES\u201d IN DIFFERENT LANGUAGES',
				members: ['HAI', 'JA', 'SI', 'DA'],
			},
			{
				level: 3,
				group: 'HOMOPHONES',
				members: ['OUI', 'WE', 'WEE', 'WII'],
			},
		],
	},
	{
		id: 158,
		date: '2023-11-16',
		answers: [
			{
				level: 0,
				group: 'BALDERDASH',
				members: ['BULL', 'HOGWASH', 'NONSENSE', 'ROT'],
			},
			{
				level: 1,
				group: 'HELM',
				members: ['DIRECT', 'GUIDE', 'LEAD', 'STEER'],
			},
			{
				level: 2,
				group: 'SINGLE/PLURAL ANIMALS',
				members: ['BUFFALO', 'DEER', 'FISH', 'MOOSE'],
			},
			{
				level: 3,
				group: 'GREAT ___',
				members: ['DANE', 'LAKE', 'SEAL', 'WHITE'],
			},
		],
	},
	{
		id: 159,
		date: '2023-11-17',
		answers: [
			{
				level: 0,
				group: 'BODYWEIGHT EXERCISES',
				members: ['DIPS', 'LUNGES', 'PLANKS', 'SQUATS'],
			},
			{
				level: 1,
				group: 'EMAIL SIGN-OFFS',
				members: ['BEST', 'CHEERS', 'REGARDS', 'THANKS'],
			},
			{
				level: 2,
				group: 'M.L.B. TEAMS, FOR SHORT',
				members: ['CARDS', 'JAYS', 'NATS', 'YANKS'],
			},
			{
				level: 3,
				group: 'ELIZABETHS (AND ONE ELISABETH)',
				members: ['BANKS', 'MOSS', 'TAYLOR', 'WARREN'],
			},
		],
	},
	{
		id: 160,
		date: '2023-11-18',
		answers: [
			{
				level: 0,
				group: 'QUICK PEEK',
				members: ['GANDER', 'GLANCE', 'GLIMPSE', 'LOOK'],
			},
			{
				level: 1,
				group: 'DECEIT',
				members: ['ACT', 'BLUFF', 'CHARADE', 'FRONT'],
			},
			{
				level: 2,
				group: 'PARTS OF A MOUNTAIN',
				members: ['CLIFF', 'CRAG', 'LEDGE', 'RIDGE'],
			},
			{
				level: 3,
				group: 'HOMOPHONES',
				members: ['PEAK', 'PEEK', 'PEKE', 'PIQUE'],
			},
		],
	},
	{
		id: 161,
		date: '2023-11-19',
		answers: [
			{
				level: 0,
				group: 'ONSET',
				members: ['BIRTH', 'CREATION', 'DAWN', 'START'],
			},
			{
				level: 1,
				group: 'VENERABLE',
				members: ['AUGUST', 'GRAND', 'NOBLE', 'REGAL'],
			},
			{
				level: 2,
				group: 'WALK',
				members: ['MARCH', 'STEP', 'STRIDE', 'TREAD'],
			},
			{
				level: 3,
				group: '___ DAY HOLIDAYS',
				members: ['EARTH', 'GROUNDHOG', 'LABOR', 'MAY'],
			},
		],
	},
	{
		id: 162,
		date: '2023-11-20',
		answers: [
			{
				level: 0,
				group: 'RELIGIOUS FIGURES',
				members: ['CARDINAL', 'LAMA', 'MONK', 'PASTOR'],
			},
			{
				level: 1,
				group: 'PRIMATES',
				members: ['BABOON', 'BONOBO', 'GIBBON', 'GORILLA'],
			},
			{
				level: 2,
				group: 'CHUTNEY VARIETIES',
				members: ['MANGO', 'MINT', 'TAMARIND', 'TOMATO'],
			},
			{
				level: 3,
				group: 'IMITATE',
				members: ['APE', 'MIME', 'MIRROR', 'PARROT'],
			},
		],
	},
	{
		id: 163,
		date: '2023-11-21',
		answers: [
			{
				level: 0,
				group: 'TYPES OF TEETH',
				members: ['CANINE', 'FANG', 'MOLAR', 'TUSK'],
			},
			{
				level: 1,
				group: 'FASHIONABLE',
				members: ['CHIC', 'HIP', 'HOT', 'IN'],
			},
			{
				level: 2,
				group: 'DANCE MOVES',
				members: ['FLOSS', 'ROBOT', 'VOGUE', 'WORM'],
			},
			{
				level: 3,
				group: 'THINGS THAT SUCK',
				members: ['LEECH', 'STRAW', 'VACUUM', 'VAMPIRE'],
			},
		],
	},
	{
		id: 164,
		date: '2023-11-22',
		answers: [
			{
				level: 0,
				group: 'AREAS BETWEEN MOUNTAINS AND HILLS',
				members: ['CANYON', 'GULCH', 'PASS', 'RAVINE'],
			},
			{
				level: 1,
				group: 'EAT VORACIOUSLY',
				members: ['GORGE', 'GULP', 'SCARF', 'WOLF'],
			},
			{
				level: 2,
				group: 'FEATURED IN \u201cSNOW WHITE\u201d',
				members: ['APPLE', 'BASHFUL', 'MIRROR', 'QUEEN'],
			},
			{
				level: 3,
				group: '\u201cC\u201d + BIRD',
				members: ['CHEN', 'CLARK', 'COWL', 'CRAVEN'],
			},
		],
	},
	{
		id: 165,
		date: '2023-11-23',
		answers: [
			{
				level: 0,
				group: 'FOODS WITH CRUSTS',
				members: ['PASTY', 'PIE', 'TART', 'TURNOVER'],
			},
			{
				level: 1,
				group: 'ENDING IN A SILENT \u201cT\u201d',
				members: ['BOUQUET', 'PARFAIT', 'RAGOUT', 'RAPPORT'],
			},
			{
				level: 2,
				group: 'COUNTRIES WITH RED AND WHITE FLAGS',
				members: ['JAPAN', 'POLAND', 'TUNISIA', 'TURKEY'],
			},
			{
				level: 3,
				group: 'N.B.A. GREATS',
				members: ['BIRD', 'CURRY', 'JAMES', 'JORDAN'],
			},
		],
	},
	{
		id: 166,
		date: '2023-11-24',
		answers: [
			{
				level: 0,
				group: 'CRITICIZE',
				members: ['KNOCK', 'PAN', 'ROAST', 'SLAM'],
			},
			{
				level: 1,
				group: 'REALITY SHOWS',
				members: ['ALONE', 'CATFISH', 'CHOPPED', 'SURVIVOR'],
			},
			{
				level: 2,
				group: 'CAR BRANDS',
				members: ['FIAT', 'JAGUAR', 'MINI', 'RAM'],
			},
			{
				level: 3,
				group: '___ PAD',
				members: ['BACHELOR', 'LILY', 'MAXI', 'MOUSE'],
			},
		],
	},
	{
		id: 167,
		date: '2023-11-25',
		answers: [
			{
				level: 0,
				group: 'SECLUDED',
				members: ['HIDDEN', 'PRIVATE', 'REMOTE', 'SECRET'],
			},
			{
				level: 1,
				group: 'AGGREGATE SIZE',
				members: ['AMOUNT', 'NUMBER', 'QUANTITY', 'VOLUME'],
			},
			{
				level: 2,
				group: 'BODIES OF WATER',
				members: ['CANAL', 'CHANNEL', 'SOUND', 'STRAIT'],
			},
			{
				level: 3,
				group: 'READS THE SAME ROTATED 180\u00b0',
				members: ['96', 'MOW', 'NOON', 'SIS'],
			},
		],
	},
	{
		id: 168,
		date: '2023-11-26',
		answers: [
			{
				level: 0,
				group: 'MUNICIPALITIES',
				members: ['CITY', 'COUNTY', 'TOWN', 'VILLAGE'],
			},
			{
				level: 1,
				group: 'BLENDER BUTTONS',
				members: ['CHOP', 'GRIND', 'PULSE', 'PUREE'],
			},
			{
				level: 2,
				group: 'FINANCIAL TERMS',
				members: ['CAPITAL', 'EQUITY', 'INTEREST', 'STOCK'],
			},
			{
				level: 3,
				group: '___ LEAGUE',
				members: ['IVY', 'JUSTICE', 'LITTLE', 'PREMIER'],
			},
		],
	},
	{
		id: 169,
		date: '2023-11-27',
		answers: [
			{
				level: 0,
				group: 'CARRY A TUNE',
				members: ['HUM', 'SING', 'SCAT', 'WHISTLE'],
			},
			{
				level: 1,
				group: 'WHOLE AMOUNT',
				members: ['COUNT', 'GROSS', 'SUM', 'TOTAL'],
			},
			{
				level: 2,
				group: 'MOJITO INGREDIENTS',
				members: ['LIME', 'MINT', 'RUM', 'SODA'],
			},
			{
				level: 3,
				group: 'THINGS THAT ARE \u201cSTICKY\u201d',
				members: ['GLUE', 'GUM', 'TAPE', 'STICK'],
			},
		],
	},
	{
		id: 170,
		date: '2023-11-28',
		answers: [
			{
				level: 0,
				group: 'ROOMS IN A HOUSE',
				members: ['BEDROOM', 'DEN', 'KITCHEN', 'STUDY'],
			},
			{
				level: 1,
				group: 'LAND SURROUNDED BY WATER',
				members: ['ATOLL', 'BAR', 'ISLAND', 'KEY'],
			},
			{
				level: 2,
				group: 'FILL TO EXCESS',
				members: ['CRAM', 'JAM', 'PACK', 'STUFF'],
			},
			{
				level: 3,
				group: 'BEAN ___',
				members: ['BAG', 'COUNTER', 'DIP', 'SPROUT'],
			},
		],
	},
	{
		id: 171,
		date: '2023-11-29',
		answers: [
			{
				level: 0,
				group: 'FOOT PARTS',
				members: ['ARCH', 'BALL', 'SOLE', 'TOE'],
			},
			{
				level: 1,
				group: 'MUSICAL INSTRUMENTS',
				members: ['BASS', 'HARP', 'HORN', 'ORGAN'],
			},
			{
				level: 2,
				group: 'DOG COMMANDS',
				members: ['COME', 'DOWN', 'SIT', 'STAY'],
			},
			{
				level: 3,
				group: 'BADDIE',
				members: ['DOG', 'HEEL', 'JERK', 'SNAKE'],
			},
		],
	},
	{
		id: 172,
		date: '2023-11-30',
		answers: [
			{
				level: 0,
				group: 'AVOID',
				members: ['DODGE', 'DUCK', 'ESCAPE', 'SKIRT'],
			},
			{
				level: 1,
				group: 'HITCHCOCK MOVIES',
				members: ['BIRDS', 'NOTORIOUS', 'REBECCA', 'ROPE'],
			},
			{
				level: 2,
				group: 'SIDEKICKS',
				members: ['GOOSE', 'HOBBES', 'ROBIN', 'WATSON'],
			},
			{
				level: 3,
				group: '___ CHEESE',
				members: ['COTTAGE', 'CREAM', 'SAY', 'STRING'],
			},
		],
	},
	{
		id: 173,
		date: '2023-12-01',
		answers: [
			{
				level: 0,
				group: 'PLACES TO SHOP',
				members: ['MALL', 'MARKET', 'OUTLET', 'STORE'],
			},
			{
				level: 1,
				group: 'WAYS TO REMOVE HAIR',
				members: ['SHAVE', 'THREAD', 'TWEEZE', 'WAX'],
			},
			{
				level: 2,
				group: 'PORTION OF PROFIT',
				members: ['CUT', 'PIECE', 'SHARE', 'TAKE'],
			},
			{
				level: 3,
				group: 'KINDS OF WRENCHES',
				members: ['ALLEN', 'CRESCENT', 'MONKEY', 'SOCKET'],
			},
		],
	},
	{
		id: 174,
		date: '2023-12-02',
		answers: [
			{
				level: 0,
				group: 'CONTAINERS',
				members: ['BASKET', 'BIN', 'CHEST', 'HAMPER'],
			},
			{
				level: 1,
				group: 'CIRCULAR SHAPES',
				members: ['BAND', 'CIRCLE', 'HOOP', 'RING'],
			},
			{
				level: 2,
				group: 'RESTRICT',
				members: ['CAP', 'CHECK', 'CURB', 'LIMIT'],
			},
			{
				level: 3,
				group: '___ JAM',
				members: ['NBA', 'PAPER', 'PEARL', 'TRAFFIC'],
			},
		],
	},
	{
		id: 175,
		date: '2023-12-03',
		answers: [
			{
				level: 0,
				group: 'MONTHLY BILLS',
				members: ['CABLE', 'ELECTRIC', 'GAS', 'WATER'],
			},
			{
				level: 1,
				group: 'RELATED TO SOUND/HEARING',
				members: ['ACOUSTIC', 'AUDITORY', 'HEARD', 'SONIC'],
			},
			{
				level: 2,
				group: 'CONNECT',
				members: ['COUPLE', 'HITCH', 'LINK', 'TIE'],
			},
			{
				level: 3,
				group: 'EXCITE, WITH \u201cUP\u201d',
				members: ['AMP', 'FIRE', 'HYPE', 'PUMP'],
			},
		],
	},
	{
		id: 176,
		date: '2023-12-04',
		answers: [
			{
				level: 0,
				group: 'UNIT OF BREAD',
				members: ['BAGUETTE', 'BUN', 'LOAF', 'ROLL'],
			},
			{
				level: 1,
				group: 'ASSURE, AS A WIN',
				members: ['CLINCH', 'GUARANTEE', 'LOCK', 'SECURE'],
			},
			{
				level: 2,
				group: 'SMALL IMPERFECTION',
				members: ['CHIP', 'MARK', 'NICK', 'SCRATCH'],
			},
			{
				level: 3,
				group: 'HEAD OF ___',
				members: ['HAIR', 'LETTUCE', 'STATE', 'STEAM'],
			},
		],
	},
	{
		id: 177,
		date: '2023-12-05',
		answers: [
			{
				level: 0,
				group: 'ENORMOUS',
				members: ['BIG', 'GIANT', 'GREAT', 'HUGE'],
			},
			{
				level: 1,
				group: 'BOOKSTORE SECTIONS',
				members: ['FICTION', 'HUMOR', 'POETRY', 'TRAVEL'],
			},
			{
				level: 2,
				group: 'TV SHOWS WITH HAPPY-SOUNDING NAMES',
				members: ['CHEERS', 'EUPHORIA', 'FELICITY', 'GLEE'],
			},
			{
				level: 3,
				group: '___ CRANE',
				members: ['CONSTRUCTION', 'FRASIER', 'PAPER', 'WHOOPING'],
			},
		],
	},
	{
		id: 178,
		date: '2023-12-06',
		answers: [
			{
				level: 0,
				group: 'FOUND ON SHEET MUSIC',
				members: ['CLEF', 'NOTE', 'REST', 'STAFF'],
			},
			{
				level: 1,
				group: 'ZODIAC SYMBOLS',
				members: ['BULL', 'CRAB', 'SCALES', 'TWINS'],
			},
			{
				level: 2,
				group: 'RECORD LABELS',
				members: ['CAPITOL', 'COLUMBIA', 'VIRGIN', 'ISLAND'],
			},
			{
				level: 3,
				group: 'ZODIAC SIGN BEGINNINGS',
				members: ['CAN', 'GEM', 'LIB', 'TAU'],
			},
		],
	},
	{
		id: 179,
		date: '2023-12-07',
		answers: [
			{
				level: 0,
				group: 'STATE ABBREVIATIONS',
				members: ['HI', 'LA', 'MA', 'OK'],
			},
			{
				level: 1,
				group: 'CABLE CHANNELS',
				members: ['BET', 'E', 'HALLMARK', 'USA'],
			},
			{
				level: 2,
				group: 'IN THE NATO ALPHABET',
				members: ['ALFA', 'BRAVO', 'ROMEO', 'TANGO'],
			},
			{
				level: 3,
				group: '___-___',
				members: ['BOO', 'POM', 'TOM', 'YO'],
			},
		],
	},
	{
		id: 180,
		date: '2023-12-08',
		answers: [
			{
				level: 0,
				group: 'DECLINE',
				members: ['EBB', 'FADE', 'FLAG', 'WANE'],
			},
			{
				level: 1,
				group: 'ABSOLUTE',
				members: ['PURE', 'SHEER', 'TOTAL', 'UTTER'],
			},
			{
				level: 2,
				group: 'EXPRESS',
				members: ['AIR', 'SPEAK', 'STATE', 'VOICE'],
			},
			{
				level: 3,
				group: 'SUPERHERO LAST NAMES',
				members: ['BANNER', 'PRINCE', 'STARK', 'WAYNE'],
			},
		],
	},
	{
		id: 181,
		date: '2023-12-09',
		answers: [
			{
				level: 0,
				group: 'ICE CREAM TREATS',
				members: ['FLOAT', 'SHAKE', 'SPLIT', 'SUNDAE'],
			},
			{
				level: 1,
				group: 'HARDWARE FASTENERS',
				members: ['BOLT', 'NAIL', 'RIVET', 'SCREW'],
			},
			{
				level: 2,
				group: 'KINDS OF COOKING OIL',
				members: ['CORN', 'OLIVE', 'PALM', 'PEANUT'],
			},
			{
				level: 3,
				group: 'STICKY ___',
				members: ['FINGERS', 'NOTE', 'RICE', 'WICKET'],
			},
		],
	},
	{
		id: 182,
		date: '2023-12-10',
		answers: [
			{
				level: 0,
				group: 'PARTS OF A RIVER',
				members: ['BANK', 'BED', 'DELTA', 'MOUTH'],
			},
			{
				level: 1,
				group: 'SOMETHING EASY TO DO',
				members: ['BREEZE', 'CINCH', 'PICNIC', 'SNAP'],
			},
			{
				level: 2,
				group: 'WRAP AROUND IN A CIRCLE',
				members: ['COIL', 'SPIRAL', 'TWIST', 'WIND'],
			},
			{
				level: 3,
				group: 'JUMP INTO THE AIR',
				members: ['BOUND', 'LEAP', 'SPRING', 'VAULT'],
			},
		],
	},
	{
		id: 183,
		date: '2023-12-11',
		answers: [
			{
				level: 0,
				group: 'LUXURIOUS FABRICS',
				members: ['CHIFFON', 'SATIN', 'SILK', 'VELVET'],
			},
			{
				level: 1,
				group: 'COME DOWN TO REST',
				members: ['PERCH', 'ROOST', 'SETTLE', 'LAND'],
			},
			{
				level: 2,
				group: 'SHOE PARTS',
				members: ['EYELET', 'LACE', 'SOLE', 'TONGUE'],
			},
			{
				level: 3,
				group: 'THINGS THAT ARE DELIVERED',
				members: ['BABY', 'BLOW', 'PACKAGE', 'SPEECH'],
			},
		],
	},
	{
		id: 184,
		date: '2023-12-12',
		answers: [
			{
				level: 0,
				group: 'MURKY CONDITION',
				members: ['CLOUD', 'FOG', 'HAZE', 'MIST'],
			},
			{
				level: 1,
				group: 'FOLLOW',
				members: ['SHADOW', 'TAIL', 'TRACK', 'TRAIL'],
			},
			{
				level: 2,
				group: 'PINBALL MACHINE COMPONENTS',
				members: ['BALL', 'BUMPER', 'FLIPPER', 'PLUNGER'],
			},
			{
				level: 3,
				group: '___LAND',
				members: ['FIN', 'GREEN', 'ICE', 'IRE'],
			},
		],
	},
	{
		id: 185,
		date: '2023-12-13',
		answers: [
			{
				level: 0,
				group: 'GOLF COURSE PARTS',
				members: ['BUNKER', 'FAIRWAY', 'GREEN', 'ROUGH'],
			},
			{
				level: 1,
				group: '\u201cI GIVE!\u201d',
				members: ['ENOUGH', 'MERCY', 'STOP', 'UNCLE'],
			},
			{
				level: 2,
				group: 'INDECENT',
				members: ['BAWDY', 'BLUE', 'COARSE', 'RISQUE'],
			},
			{
				level: 3,
				group: '\u201d-OUGH\u201d WORDS THAT DON\u2019T RHYME',
				members: ['BOUGH', 'COUGH', 'DOUGH', 'TOUGH'],
			},
		],
	},
	{
		id: 186,
		date: '2023-12-14',
		answers: [
			{
				level: 0,
				group: 'PESTER',
				members: ['BADGER', 'BUG', 'HOUND', 'NAG'],
			},
			{
				level: 1,
				group: 'SPORTS VENUES',
				members: ['ARENA', 'BOWL', 'DOME', 'FIELD'],
			},
			{
				level: 2,
				group: 'SEPARATE',
				members: ['DIVIDE', 'FORK', 'PART', 'SPLIT'],
			},
			{
				level: 3,
				group: 'SILVER ___',
				members: ['FOX', 'LINING', 'SCREEN', 'SPOON'],
			},
		],
	},
	{
		id: 187,
		date: '2023-12-15',
		answers: [
			{
				level: 0,
				group: 'CURMUDGEON',
				members: ['CRAB', 'CRANK', 'GROUCH', 'GRUMP'],
			},
			{
				level: 1,
				group: 'GET LOW',
				members: ['CROUCH', 'DUCK', 'SQUAT', 'STOOP'],
			},
			{
				level: 2,
				group: 'NATIONAL SYMBOLS',
				members: ['ANTHEM', 'FLAG', 'MOTTO', 'SEAL'],
			},
			{
				level: 3,
				group: 'SWINDLER',
				members: ['CHEAT', 'CROOK', 'QUACK', 'SHARK'],
			},
		],
	},
	{
		id: 188,
		date: '2023-12-16',
		answers: [
			{
				level: 0,
				group: 'FARM TOOLS',
				members: ['HOE', 'PLOW', 'RAKE', 'SICKLE'],
			},
			{
				level: 1,
				group: 'SCHEME',
				members: ['PLOT', 'PLOY', 'RUSE', 'TRICK'],
			},
			{
				level: 2,
				group: 'MAKE HAPPY',
				members: ['AMUSE', 'DELIGHT', 'PLEASE', 'TICKLE'],
			},
			{
				level: 3,
				group: 'ONOMATOPOEIA',
				members: ['BANG', 'PLOP', 'SPLASH', 'THUD'],
			},
		],
	},
	{
		id: 189,
		date: '2023-12-17',
		answers: [
			{
				level: 0,
				group: 'RESERVE FOR LATER',
				members: ['BANK', 'SAVE', 'STASH', 'STORE'],
			},
			{
				level: 1,
				group: 'BOLDNESS, FIGURATIVELY',
				members: ['GALL', 'GUTS', 'NERVE', 'STONES'],
			},
			{
				level: 2,
				group: 'USED TO BUILD A SNOWMAN',
				members: ['CARROT', 'COAL', 'SNOW', 'STICKS'],
			},
			{
				level: 3,
				group: 'FUNNY ___',
				members: ['BONE', 'BUSINESS', 'GIRL', 'PAGES'],
			},
		],
	},
	{
		id: 190,
		date: '2023-12-18',
		answers: [
			{
				level: 0,
				group: 'BRIEF MOMENT',
				members: ['FLASH', 'JIFFY', 'SECOND', 'WINK'],
			},
			{
				level: 1,
				group: 'PRIMARY',
				members: ['CHIEF', 'FIRST', 'MAIN', 'PRINCIPAL'],
			},
			{
				level: 2,
				group: 'AVENUES IN N.Y.C.',
				members: ['BROADWAY', 'FIFTH', 'MADISON', 'PARK'],
			},
			{
				level: 3,
				group: '___ HOUR',
				members: ['AMATEUR', 'ELEVENTH', 'HAPPY', 'RUSH'],
			},
		],
	},
	{
		id: 191,
		date: '2023-12-19',
		answers: [
			{
				level: 0,
				group: 'ACCESSORIES',
				members: ['BELT', 'BRACELET', 'TIE', 'WATCH'],
			},
			{
				level: 1,
				group: 'COMEDIAN\u2019S OUTPUT',
				members: ['BIT', 'JOKE', 'ROUTINE', 'SKETCH'],
			},
			{
				level: 2,
				group: 'ATTRACTION',
				members: ['APPEAL', 'CHARM', 'DRAW', 'PULL'],
			},
			{
				level: 3,
				group: 'TWO LETTERS + NUMBER',
				members: ['CANINE', 'FREIGHT', 'OFTEN', 'STONE'],
			},
		],
	},
	{
		id: 192,
		date: '2023-12-20',
		answers: [
			{
				level: 0,
				group: 'CONTACT VIA PHONE',
				members: ['BUZZ', 'CALL', 'DIAL', 'RING'],
			},
			{
				level: 1,
				group: 'BOOK SECTIONS',
				members: ['APPENDIX', 'CHAPTER', 'INDEX', 'PREFACE'],
			},
			{
				level: 2,
				group: 'WEE',
				members: ['DINKY', 'LITTLE', 'MINUTE', 'SLIGHT'],
			},
			{
				level: 3,
				group: 'CARTOON MICE',
				members: ['ITCHY', 'JERRY', 'PINKY', 'SPEEDY'],
			},
		],
	},
	{
		id: 193,
		date: '2023-12-21',
		answers: [
			{
				level: 0,
				group: 'SEEN IN A LAUNDRY ROOM',
				members: ['DRYER', 'HAMPER', 'IRON', 'WASHER'],
			},
			{
				level: 1,
				group: 'SHEPHERD',
				members: ['DIRECT', 'GUIDE', 'LEAD', 'STEER'],
			},
			{
				level: 2,
				group: 'WHAT \u201cI\u201d MIGHT MEAN',
				members: ['IODINE', 'IOTA', 'MYSELF', 'ONE'],
			},
			{
				level: 3,
				group: '___ VALLEY',
				members: ['DEATH', 'HIDDEN', 'SILICON', 'UNCANNY'],
			},
		],
	},
	{
		id: 194,
		date: '2023-12-22',
		answers: [
			{
				level: 0,
				group: 'CLASSIC HALLOWEEN COSTUMES',
				members: ['ANGEL', 'CLOWN', 'PIRATE', 'WITCH'],
			},
			{
				level: 1,
				group: 'BEE CREATIONS',
				members: ['COMB', 'HIVE', 'HONEY', 'WAX'],
			},
			{
				level: 2,
				group: 'INTERVAL OF TIME',
				members: ['PERIOD', 'SPELL', 'STRETCH', 'WHILE'],
			},
			{
				level: 3,
				group: 'ANIMAL HOMOPHONES',
				members: ['DEAR', 'HAIR', 'HOARSE', 'WAIL'],
			},
		],
	},
	{
		id: 195,
		date: '2023-12-23',
		answers: [
			{
				level: 0,
				group: 'MEANS OF TRANSPORTATION',
				members: ['BOAT', 'CAR', 'PLANE', 'TRAIN'],
			},
			{
				level: 1,
				group: 'WILLING TO PARTICIPATE',
				members: ['DOWN', 'GAME', 'IN', 'ON BOARD'],
			},
			{
				level: 2,
				group: 'LITTLE BIT, IN A RECIPE',
				members: ['DASH', 'DROP', 'PINCH', 'SPLASH'],
			},
			{
				level: 3,
				group: '___BERRY ',
				members: ['BLUE', 'GOOSE', 'RASP', 'STRAW'],
			},
		],
	},
	{
		id: 196,
		date: '2023-12-24',
		answers: [
			{
				level: 0,
				group: 'GENTLE',
				members: ['LIGHT', 'MELLOW', 'MILD', 'SOFT'],
			},
			{
				level: 1,
				group: 'CUTS OF PORK',
				members: ['BELLY', 'CHOP', 'HOCK', 'SHOULDER'],
			},
			{
				level: 2,
				group: 'STATUE OF LIBERTY FEATURES',
				members: ['CROWN', 'ROBE', 'TABLET', 'TORCH'],
			},
			{
				level: 3,
				group: 'THINGS TO BLOW ON FOR WISHES/LUCK',
				members: ['CANDLE', 'DANDELION', 'DICE', 'EYELASH'],
			},
		],
	},
	{
		id: 197,
		date: '2023-12-25',
		answers: [
			{
				level: 0,
				group: 'DARLING',
				members: ['BABY', 'BOO', 'DEAR', 'LOVE'],
			},
			{
				level: 1,
				group: 'BASIC GEOMETRIC OBJECTS',
				members: ['LINE', 'POINT', 'RAY', 'SEGMENT'],
			},
			{
				level: 2,
				group: 'OOMPH',
				members: ['ENERGY', 'FIRE', 'JUICE', 'ZIP'],
			},
			{
				level: 3,
				group: 'SECRET ___',
				members: ['AGENT', 'CODE', 'SANTA', 'SAUCE'],
			},
		],
	},
	{
		id: 198,
		date: '2023-12-26',
		answers: [
			{
				level: 0,
				group: 'ROAD NAMES',
				members: ['ALLEY', 'DRIVE', 'LANE', 'STREET'],
			},
			{
				level: 1,
				group: 'PAPER IN A BOOK',
				members: ['FOLIO', 'LEAF', 'PAGE', 'SHEET'],
			},
			{
				level: 2,
				group: 'RESTRAIN',
				members: ['CHECK', 'CURB', 'LIMIT', 'STEM'],
			},
			{
				level: 3,
				group: 'THINGS YOU CAN DO TO YOUR NOSE',
				members: ['BLOW', 'HOLD', 'PICK', 'THUMB'],
			},
		],
	},
	{
		id: 199,
		date: '2023-12-27',
		answers: [
			{
				level: 0,
				group: 'INDICATION OF THINGS TO COME',
				members: ['MESSAGE', 'OMEN', 'SIGN', 'WARNING'],
			},
			{
				level: 1,
				group: 'NAME PREFIXES',
				members: ['GEN', 'MS', 'PROF', 'REV'],
			},
			{
				level: 2,
				group: 'ART MEDIUMS',
				members: ['CHARCOAL', 'INK', 'PAINT', 'PASTEL'],
			},
			{
				level: 3,
				group: '___ PEPPER',
				members: ['BELL', 'BLACK', 'DR', 'GHOST'],
			},
		],
	},
	{
		id: 200,
		date: '2023-12-28',
		answers: [
			{
				level: 0,
				group: 'PARTS OF A CAR',
				members: ['BUMPER', 'HOOD', 'TIRE', 'TRUNK'],
			},
			{
				level: 1,
				group: 'MOVE QUICKLY',
				members: ['BOLT', 'DART', 'DASH', 'ZIP'],
			},
			{
				level: 2,
				group: 'BIRDS',
				members: ['CARDINAL', 'JAY', 'LARK', 'SWIFT'],
			},
			{
				level: 3,
				group: 'JAZZ LEGENDS',
				members: ['HANCOCK', 'HOLIDAY', 'MONK', 'PARKER'],
			},
		],
	},
	{
		id: 201,
		date: '2023-12-29',
		answers: [
			{
				level: 0,
				group: 'SHIRTS',
				members: ['CROP', 'POLO', 'TANK', 'TEE'],
			},
			{
				level: 1,
				group: 'COOL, IN \u201980S SLANG',
				members: ['BAD', 'FLY', 'FRESH', 'RAD'],
			},
			{
				level: 2,
				group: 'LETTER SPELLINGS',
				members: ['BEE', 'EX', 'GEE', 'JAY'],
			},
			{
				level: 3,
				group: '___ GEORGE',
				members: ['BOY', 'BY', 'CURIOUS', 'SAINT'],
			},
		],
	},
	{
		id: 202,
		date: '2023-12-30',
		answers: [
			{
				level: 0,
				group: 'BLACK-AND-WHITE ANIMALS',
				members: ['ORCA', 'PANDA', 'SKUNK', 'ZEBRA'],
			},
			{
				level: 1,
				group: 'SEQUENCE',
				members: ['CHAIN', 'SERIES', 'STRING', 'TRAIN'],
			},
			{
				level: 2,
				group: 'HETERONYMS',
				members: ['BASS', 'DOVE', 'DESERT', 'WIND'],
			},
			{
				level: 3,
				group: '___ TRAP',
				members: ['BEAR', 'SAND', 'SPEED', 'TOURIST'],
			},
		],
	},
	{
		id: 203,
		date: '2023-12-31',
		answers: [
			{
				level: 0,
				group: 'ORGANIZATION',
				members: ['CLUB', 'GROUP', 'PARTY', 'TEAM'],
			},
			{
				level: 1,
				group: 'SHARPNESS, AS OF AN IMAGE',
				members: ['CLARITY', 'DEFINITION', 'DETAIL', 'RESOLUTION'],
			},
			{
				level: 2,
				group: 'PLACES IN FRANCE',
				members: ['CHAMPAGNE', 'DIJON', 'NICE', 'TOURS'],
			},
			{
				level: 3,
				group: 'HAPPY NEW YEAR!',
				members: ['BALL', 'COUNTDOWN', 'FIREWORKS', 'KISS'],
			},
		],
	},
	{
		id: 204,
		date: '2024-01-01',
		answers: [
			{
				level: 0,
				group: 'GARDENING NOUNS/VERBS',
				members: ['PLANT', 'SEED', 'WATER', 'WEED'],
			},
			{
				level: 1,
				group: 'KINDS OF SALADS',
				members: ['CAESAR', 'GREEK', 'GREEN', 'WEDGE'],
			},
			{
				level: 2,
				group: 'CLASSIC GAME SHOWS, FAMILIARLY',
				members: ['FEUD', 'MILLIONAIRE', 'PYRAMID', 'WHEEL'],
			},
			{
				level: 3,
				group: 'W + VOWEL SOUND',
				members: ['WAY', 'WEE', 'WHY', 'WHOA'],
			},
		],
	},
	{
		id: 205,
		date: '2024-01-02',
		answers: [
			{
				level: 0,
				group: 'B.L.T. INGREDIENTS',
				members: ['BREAD', 'BACON', 'LETTUCE', 'TOMATO'],
			},
			{
				level: 1,
				group: 'OBSTRUCT',
				members: ['BLOCK', 'CLOG', 'JAM', 'STOP'],
			},
			{
				level: 2,
				group: 'BASEBALL STATS',
				members: ['DOUBLE', 'HIT', 'RUN', 'WALK'],
			},
			{
				level: 3,
				group: 'SMALL ___',
				members: ['FRY', 'TALK', 'WONDER', 'WORLD'],
			},
		],
	},
	{
		id: 206,
		date: '2024-01-03',
		answers: [
			{
				level: 0,
				group: 'MOVE THROUGH THE AIR',
				members: ['FLOAT', 'FLY', 'GLIDE', 'SOAR'],
			},
			{
				level: 1,
				group: 'HIDDEN LISTENING DEVICES',
				members: ['BUG', 'MIKE', 'TAP', 'WIRE'],
			},
			{
				level: 2,
				group: 'SELECT, AS A BOX ON A FORM',
				members: ['CHECK', 'MARK', 'TICK', 'X'],
			},
			{
				level: 3,
				group: 'RAPPERS MINUS FIRST LETTER',
				members: ['40', 'COLE', 'PAIN', 'TIP'],
			},
		],
	},
	{
		id: 207,
		date: '2024-01-04',
		answers: [
			{
				level: 0,
				group: 'GIFT-GIVING ACCESSORIES',
				members: ['BOW', 'BOX', 'CARD', 'WRAPPING'],
			},
			{
				level: 1,
				group: 'DATING APP ACTIONS',
				members: ['BLOCK', 'MATCH', 'MESSAGE', 'SWIPE'],
			},
			{
				level: 2,
				group: 'COOL, IN SLANG',
				members: ['FIRE', 'LIT', 'SICK', 'TIGHT'],
			},
			{
				level: 3,
				group: 'LUCKY ___',
				members: ['BREAK', 'CHARM', 'DUCK', 'STRIKE'],
			},
		],
	},
	{
		id: 208,
		date: '2024-01-05',
		answers: [
			{
				level: 0,
				group: 'PLAYFULLY BOTHER',
				members: ['JOSH', 'KID', 'RIB', 'TEASE'],
			},
			{
				level: 1,
				group: 'APEX',
				members: ['HEIGHT', 'MAX', 'PEAK', 'TOP'],
			},
			{
				level: 2,
				group: 'WORDS FOR SPECIFIC QUANTITIES',
				members: ['DOZEN', 'GROSS', 'PAIR', 'SCORE'],
			},
			{
				level: 3,
				group: 'WHAT \u201cX\u201d MIGHT MEAN',
				members: ['ADULT', 'KISS', 'TEN', 'TIMES'],
			},
		],
	},
	{
		id: 209,
		date: '2024-01-06',
		answers: [
			{
				level: 0,
				group: 'STRONG SMELL',
				members: ['FUNK', 'MUSK', 'ODOR', 'TANG'],
			},
			{
				level: 1,
				group: 'MOVE BACK AND FORTH',
				members: ['ROCK', 'SWAY', 'SWING', 'WAVE'],
			},
			{
				level: 2,
				group: 'THINGS TO PICK',
				members: ['AFRO', 'BONE', 'FIGHT', 'LOCK'],
			},
			{
				level: 3,
				group: '___ BALL',
				members: ['CRYSTAL', 'DISCO', 'FOUL', 'GUTTER'],
			},
		],
	},
	{
		id: 210,
		date: '2024-01-07',
		answers: [
			{
				level: 0,
				group: 'TECH COMPANIES',
				members: ['ALPHABET', 'AMAZON', 'APPLE', 'META'],
			},
			{
				level: 1,
				group: 'KINDS OF EXAMS',
				members: ['BAR', 'FINAL', 'ORAL', 'PHYSICAL'],
			},
			{
				level: 2,
				group: 'SOMETHING EXEMPLARY',
				members: ['BEAUTY', 'GEM', 'MARVEL', 'PEACH'],
			},
			{
				level: 3,
				group: '___ TOOTH',
				members: ['BABY', 'EYE', 'SWEET', 'WISDOM'],
			},
		],
	},
	{
		id: 211,
		date: '2024-01-08',
		answers: [
			{
				level: 0,
				group: 'THINGS THAT ARE ORANGE',
				members: ['BASKETBALL', 'CARROT', 'GOLDFISH', 'PUMPKIN'],
			},
			{
				level: 1,
				group: 'LONG, SKINNY OBJECTS',
				members: ['POLE', 'ROD', 'STAFF', 'STICK'],
			},
			{
				level: 2,
				group: 'SEEN ON A GOLF COURSE',
				members: ['CART', 'CLUB', 'HOLE', 'TEE'],
			},
			{
				level: 3,
				group: 'SHAPES OF CAPITAL GREEK LETTERS',
				members: ['CIRCLE', 'HORSESHOE', 'PITCHFORK', 'TRIANGLE'],
			},
		],
	},
	{
		id: 212,
		date: '2024-01-09',
		answers: [
			{
				level: 0,
				group: 'CLEANING SUPPLIES',
				members: ['BROOM', 'MOP', 'RAG', 'SPONGE'],
			},
			{
				level: 1,
				group: 'ELEMENTS OF COOKING,  PER SAMIN NOSRAT',
				members: ['SALT', 'FAT', 'ACID', 'HEAT'],
			},
			{
				level: 2,
				group: 'THINGS THAT MAKE YOU SNEEZE',
				members: ['DUST', 'PEPPER', 'POLLEN', 'SMOKE'],
			},
			{
				level: 3,
				group: 'TITULAR FICTIONAL DETECTIVES',
				members: ['MAGNUM', 'MONK', 'SHAFT', 'TRACY'],
			},
		],
	},
	{
		id: 213,
		date: '2024-01-10',
		answers: [
			{
				level: 0,
				group: 'BIT OF MAGIC',
				members: ['CHARM', 'CURSE', 'HEX', 'SPELL'],
			},
			{
				level: 1,
				group: 'FOUND AROUND A FIREPLACE',
				members: ['FLUE', 'GRATE', 'LOG', 'POKER'],
			},
			{
				level: 2,
				group: 'THINGS SEEN AT A CASINO',
				members: ['CARDS', 'CHIPS', 'DICE', 'SLOTS'],
			},
			{
				level: 3,
				group: 'WAYS TO PREPARE CHEESE',
				members: ['CRUMBLE', 'MELT', 'SHRED', 'SLICE'],
			},
		],
	},
	{
		id: 214,
		date: '2024-01-11',
		answers: [
			{
				level: 0,
				group: 'STATES OF MATTER',
				members: ['GAS', 'LIQUID', 'PLASMA', 'SOLID'],
			},
			{
				level: 1,
				group: 'ALL-TIMER',
				members: ['GREAT', 'HERO', 'ICON', 'LEGEND'],
			},
			{
				level: 2,
				group: '\u201cPH\u201d WORDS THAT ALSO WORK WITH \u201cF\u201d',
				members: ['PHAT', 'PHEW', 'PHILLY', 'PHISH'],
			},
			{
				level: 3,
				group: '___ PITCH',
				members: ['ELEVATOR', 'FEVER', 'PERFECT', 'SALES'],
			},
		],
	},
	{
		id: 215,
		date: '2024-01-12',
		answers: [
			{
				level: 0,
				group: 'TOPIC OF DISCUSSION',
				members: ['ISSUE', 'MATTER', 'POINT', 'SUBJECT'],
			},
			{
				level: 1,
				group: 'SECTION OF ONE\u2019S LIFE',
				members: ['CHAPTER', 'PERIOD', 'PHASE', 'STAGE'],
			},
			{
				level: 2,
				group: 'PARTS OF A CAR, INFORMALLY',
				members: ['DASH', 'SHOCK', 'TANK', 'WHEEL'],
			},
			{
				level: 3,
				group: 'COLOR HOMOPHONES',
				members: ['BLEW', 'CHORAL', 'READ', 'ROWS'],
			},
		],
	},
	{
		id: 216,
		date: '2024-01-13',
		answers: [
			{
				level: 0,
				group: 'CREDENTIALS FOR ENTRY',
				members: ['BADGE', 'INVITE', 'PASS', 'TICKET'],
			},
			{
				level: 1,
				group: 'PRESIDE OVER',
				members: ['CHAIR', 'DIRECT', 'LEAD', 'RUN'],
			},
			{
				level: 2,
				group: 'AMERICAN FOOTBALL POSITIONS',
				members: ['CENTER', 'END', 'SAFETY', 'TACKLE'],
			},
			{
				level: 3,
				group: 'POSTPONE',
				members: ['HOLD', 'PUNT', 'STALL', 'TABLE'],
			},
		],
	},
	{
		id: 217,
		date: '2024-01-14',
		answers: [
			{
				level: 0,
				group: 'THINGS TO PAY',
				members: ['BILL', 'CHECK', 'INVOICE', 'TAB'],
			},
			{
				level: 1,
				group: 'THIEVE',
				members: ['PINCH', 'ROB', 'STEAL', 'SWIPE'],
			},
			{
				level: 2,
				group: 'MALE ANIMALS',
				members: ['BUCK', 'BULL', 'JACK', 'TOM'],
			},
			{
				level: 3,
				group: 'LEGWEAR, IN THE SINGULAR',
				members: ['JEAN', 'PANT', 'SHORT', 'TIGHT'],
			},
		],
	},
	{
		id: 218,
		date: '2024-01-15',
		answers: [
			{
				level: 0,
				group: 'LIST OF CANDIDATES',
				members: ['BALLOT', 'ROSTER', 'SLATE', 'TICKET'],
			},
			{
				level: 1,
				group: 'PROTECTIVE BARRIER',
				members: ['BUFFER', 'CUSHION', 'PAD', 'SHIELD'],
			},
			{
				level: 2,
				group: 'MEDICINE FORMATS',
				members: ['CAPSULE', 'CREAM', 'SYRUP', 'TABLET'],
			},
			{
				level: 3,
				group: 'PEA ___',
				members: ['COAT', 'GREEN', 'POD', 'SOUP'],
			},
		],
	},
	{
		id: 219,
		date: '2024-01-16',
		answers: [
			{
				level: 0,
				group: 'DECEIVE',
				members: ['CON', 'DUPE', 'FOOL', 'TRICK'],
			},
			{
				level: 1,
				group: 'INSIDE INFO',
				members: ['DOPE', 'SCOOP', 'SKINNY', 'WORD'],
			},
			{
				level: 2,
				group: 'TILT TO ONE SIDE',
				members: ['CANT', 'LEAN', 'LIST', 'SLOPE'],
			},
			{
				level: 3,
				group: 'WORDS SPELLED WITH AN UPSIDE-DOWN CALCULATOR',
				members: ['BOOB', 'EGGSHELL', 'GIGGLE', 'HELLO'],
			},
		],
	},
	{
		id: 220,
		date: '2024-01-17',
		answers: [
			{
				level: 0,
				group: 'DATA SET DATA',
				members: ['MEAN', 'MEDIAN', 'MODE', 'RANGE'],
			},
			{
				level: 1,
				group: 'CHEMISTRY TERMS',
				members: ['BASE', 'BOND', 'ELEMENT', 'SOLUTION'],
			},
			{
				level: 2,
				group: 'ADJECTIVE INTENSIFIERS',
				members: ['AWFUL', 'PRETTY', 'RATHER', 'REAL'],
			},
			{
				level: 3,
				group: 'RADIO HALL OF FAME MEMBERS',
				members: ['GLASS', 'GROSS', 'KING', 'STERN'],
			},
		],
	},
	{
		id: 221,
		date: '2024-01-18',
		answers: [
			{
				level: 0,
				group: 'SHOW OFF',
				members: ['GRANDSTAND', 'PEACOCK', 'POSTURE', 'STRUT'],
			},
			{
				level: 1,
				group: 'FOREMOST',
				members: ['MAIN', 'PARAMOUNT', 'PRIME', 'SUPREME'],
			},
			{
				level: 2,
				group: 'COLORS IN BRAZIL\u2019S FLAG',
				members: ['BLUE', 'GREEN', 'WHITE', 'YELLOW'],
			},
			{
				level: 3,
				group: '___ LETTER',
				members: ['CHAIN', 'COVER', 'LOVE', 'SCARLET'],
			},
		],
	},
	{
		id: 222,
		date: '2024-01-19',
		answers: [
			{
				level: 0,
				group: 'SUNDAE TOPPINGS',
				members: ['CHERRY', 'FUDGE', 'NUTS', 'SPRINKLES'],
			},
			{
				level: 1,
				group: 'LEAVE HIGH AND DRY',
				members: ['DESERT', 'DITCH', 'MAROON', 'STRAND'],
			},
			{
				level: 2,
				group: '\u201cPHOOEY!\u201d',
				members: ['CURSES', 'DARN', 'RATS', 'SHOOT'],
			},
			{
				level: 3,
				group: 'WORDS IN TONGUE TWISTERS',
				members: ['FUZZY', 'PEPPERS', 'SEASHELLS', 'WOODCHUCK'],
			},
		],
	},
	{
		id: 223,
		date: '2024-01-20',
		answers: [
			{
				level: 0,
				group: 'DECLINE',
				members: ['DIP', 'DROP', 'FALL', 'SINK'],
			},
			{
				level: 1,
				group: 'MOVE WITH SPEED',
				members: ['BLAZE', 'FLY', 'RACE', 'TEAR'],
			},
			{
				level: 2,
				group: 'KINDS OF DANCE',
				members: ['MODERN', 'SALSA', 'SWING', 'TAP'],
			},
			{
				level: 3,
				group: 'BABY ___',
				members: ['BOOM', 'CARROT', 'SHOWER', 'TALK'],
			},
		],
	},
	{
		id: 224,
		date: '2024-01-21',
		answers: [
			{
				level: 0,
				group: 'RIP OFF',
				members: ['FLEECE', 'HOSE', 'ROB', 'STIFF'],
			},
			{
				level: 1,
				group: 'THINGS MADE OF WAX',
				members: ['CANDLE', 'CRAYON', 'HONEYCOMB', 'SEAL'],
			},
			{
				level: 2,
				group: 'PARTS OF AN AIRPLANE',
				members: ['CABIN', 'ENGINE', 'NOSE', 'WING'],
			},
			{
				level: 3,
				group: 'UNITS OF VEGETABLES',
				members: ['BULB', 'EAR', 'HEAD', 'STALK'],
			},
		],
	},
	{
		id: 225,
		date: '2024-01-22',
		answers: [
			{
				level: 0,
				group: 'SYMBOLIC RODS',
				members: ['BATON', 'SCEPTER', 'STAFF', 'WAND'],
			},
			{
				level: 1,
				group: 'DENTAL TERMS',
				members: ['CAVITY', 'CROWN', 'FILLING', 'PLAQUE'],
			},
			{
				level: 2,
				group: 'RUBBER STAMP WORDS',
				members: ['APPROVED', 'PAID', 'URGENT', 'VOID'],
			},
			{
				level: 3,
				group: '___ YEAR',
				members: ['GAP', 'LEAP', 'LIGHT', 'SCHOOL'],
			},
		],
	},
	{
		id: 226,
		date: '2024-01-23',
		answers: [
			{
				level: 0,
				group: 'BRING INTO BEING',
				members: ['COIN', 'CREATE', 'DEVISE', 'INVENT'],
			},
			{
				level: 1,
				group: 'EXCELLENT',
				members: ['FINE', 'PRIME', 'QUALITY', 'STERLING'],
			},
			{
				level: 2,
				group: 'SYMBOLS ABOVE NUMBERS ON A KEYBOARD',
				members: ['AT', 'DOLLAR', 'PERCENT', 'POUND'],
			},
			{
				level: 3,
				group: 'PASS THE ___',
				members: ['BAR', 'BUCK', 'TIME', 'TORCH'],
			},
		],
	},
	{
		id: 227,
		date: '2024-01-24',
		answers: [
			{
				level: 0,
				group: 'SMARTPHONE FEATURES BEGINNING WITH \u201cC\u201d',
				members: ['CALCULATOR', 'CALENDAR', 'CAMERA', 'CLOCK'],
			},
			{
				level: 1,
				group: 'PARTS OF THE EYE',
				members: ['CONE', 'IRIS', 'LENS', 'PUPIL'],
			},
			{
				level: 2,
				group: 'FAMILIAL NICKNAMES',
				members: ['DADA', 'GRAMMY', 'MUM', 'POPPY'],
			},
			{
				level: 3,
				group: 'WORDS PRONOUNCED DIFFERENTLY WITH ACCENT MARKS',
				members: ['EXPOSE', 'PATE', 'RESUME', 'ROSE'],
			},
		],
	},
	{
		id: 228,
		date: '2024-01-25',
		answers: [
			{
				level: 0,
				group: 'OF-THE-MOMENT',
				members: ['BIG', 'HOT', 'IN', 'POPULAR'],
			},
			{
				level: 1,
				group: 'PICTOGRAPH',
				members: ['CHARACTER', 'GLYPH', 'ICON', 'SYMBOL'],
			},
			{
				level: 2,
				group: 'IMPOSE, AS A PENALTY',
				members: ['ASSESS', 'CHARGE', 'FINE', 'LEVY'],
			},
			{
				level: 3,
				group: 'WORDS BEGINNING WITH BODY PARTS',
				members: ['HANDSOME', 'HIPPO', 'LEGEND', 'LIPID'],
			},
		],
	},
	{
		id: 229,
		date: '2024-01-26',
		answers: [
			{
				level: 0,
				group: 'BASEBALL EQUIPMENT',
				members: ['BALL', 'BASE', 'BAT', 'GLOVE'],
			},
			{
				level: 1,
				group: 'HARD HIT',
				members: ['BLOW', 'LICK', 'SOCK', 'STRIKE'],
			},
			{
				level: 2,
				group: 'ORIGINAL MONOPOLY TOKENS',
				members: ['BOOT', 'IRON', 'THIMBLE', 'TOP HAT'],
			},
			{
				level: 3,
				group: '___ BUNNY',
				members: ['BAD', 'BUGS', 'DUST', 'HONEY'],
			},
		],
	},
	{
		id: 230,
		date: '2024-01-27',
		answers: [
			{
				level: 0,
				group: 'HURT',
				members: ['ACHE', 'BURN', 'SMART', 'STING'],
			},
			{
				level: 1,
				group: 'LOOK AFTER',
				members: ['GUARD', 'MIND', 'TEND', 'WATCH'],
			},
			{
				level: 2,
				group: 'SOUGHT AFTER IN \u201cTHE WIZARD OF OZ\u201d',
				members: ['BRAIN', 'COURAGE', 'HEART', 'HOME'],
			},
			{
				level: 3,
				group: 'SILENT \u201cW\u201d',
				members: ['ANSWER', 'TWO', 'WRIST', 'WRONG'],
			},
		],
	},
	{
		id: 231,
		date: '2024-01-28',
		answers: [
			{
				level: 0,
				group: 'HIGHEST POINT',
				members: ['CREST', 'PEAK', 'SUMMIT', 'VERTEX'],
			},
			{
				level: 1,
				group: '\u201cCAN I GET YOUR ___?\u201d (PHONE INFO REQUEST)',
				members: ['CELL', 'CONTACT', 'DIGITS', 'NUMBER'],
			},
			{
				level: 2,
				group: 'MODIFIERS MEANING \u201cSMALL\u201d',
				members: ['BABY', 'MINI', 'POCKET', 'TOY'],
			},
			{
				level: 3,
				group: 'INSIDE A SCRABBLE BOX',
				members: ['BAG', 'BOARD', 'RACKS', 'TILES'],
			},
		],
	},
	{
		id: 232,
		date: '2024-01-29',
		answers: [
			{
				level: 0,
				group: 'DO SOME MARKETING FOR',
				members: ['PITCH', 'PLUG', 'PROMOTE', 'PUSH'],
			},
			{
				level: 1,
				group: 'ROMANTIC TWOSOME',
				members: ['COUPLE', 'ITEM', 'PAIR', 'THING'],
			},
			{
				level: 2,
				group: 'TENNIS SCORING TERMS',
				members: ['AD', 'ALL', 'DEUCE', 'LOVE'],
			},
			{
				level: 3,
				group: 'WORDS WITH \u201cFRUIT\u201d',
				members: ['BREAD', 'DRAGON', 'JACK', 'PASSION'],
			},
		],
	},
	{
		id: 233,
		date: '2024-01-30',
		answers: [
			{
				level: 0,
				group: 'HIT HARD',
				members: ['BANG', 'HAMMER', 'POUND', 'SLAM'],
			},
			{
				level: 1,
				group: 'NEWSPAPER NAMES',
				members: ['CHRONICLE', 'HERALD', 'REGISTER', 'SUN'],
			},
			{
				level: 2,
				group: 'CRESCENT-SHAPED THINGS',
				members: ['BANANA', 'CROISSANT', 'MOON', 'SICKLE'],
			},
			{
				level: 3,
				group: 'POWER-UPS IN SUPER MARIO WORLD',
				members: ['FEATHER', 'FLOWER', 'MUSHROOM', 'STAR'],
			},
		],
	},
	{
		id: 234,
		date: '2024-01-31',
		answers: [
			{
				level: 0,
				group: 'MERRIMENT',
				members: ['CHEER', 'GLEE', 'FESTIVITY', 'MIRTH'],
			},
			{
				level: 1,
				group: 'BOOKED FOR A WEDDING',
				members: ['BAND', 'CATERER', 'FLORIST', 'OFFICIANT'],
			},
			{
				level: 2,
				group: 'RHYMES',
				members: ['CHOIR', 'FIRE', 'LIAR', 'FRYER'],
			},
			{
				level: 3,
				group: '___ PIT',
				members: ['BARBECUE', 'ORCHESTRA', 'SNAKE', 'TAR'],
			},
		],
	},
	{
		id: 235,
		date: '2024-02-01',
		answers: [
			{
				level: 0,
				group: 'MAKE SHORTER',
				members: ['CLIP', 'CUT', 'PARE', 'TRIM'],
			},
			{
				level: 1,
				group: 'MUSCULAR',
				members: ['BUILT', 'JACKED', 'RIPPED', 'SWOLE'],
			},
			{
				level: 2,
				group: 'ENTHUSIAST',
				members: ['BUFF', 'FAN', 'LOVER', 'NUT'],
			},
			{
				level: 3,
				group: 'WRINKLY THINGS',
				members: ['BRAIN', 'PRUNE', 'PUG', 'WALNUT'],
			},
		],
	},
	{
		id: 236,
		date: '2024-02-02',
		answers: [
			{
				level: 0,
				group: 'TIME OFF',
				members: ['BREAK', 'HOLIDAY', 'LEAVE', 'RECESS'],
			},
			{
				level: 1,
				group: 'FEATURES OF A BELT',
				members: ['BUCKLE', 'HOLE', 'LOOP', 'STRAP'],
			},
			{
				level: 2,
				group: 'HOMOPHONES',
				members: ['HOLEY', 'HOLI', 'HOLY', 'WHOLLY'],
			},
			{
				level: 3,
				group: '___WOOD',
				members: ['DOG', 'DRIFT', 'HOLLY', 'SANDAL'],
			},
		],
	},
	{
		id: 237,
		date: '2024-02-03',
		answers: [
			{
				level: 0,
				group: 'COMMERCIAL ORGANIZATION',
				members: ['AGENCY', 'COMPANY', 'ENTERPRISE', 'FIRM'],
			},
			{
				level: 1,
				group: 'FARM FIXTURES',
				members: ['COOP', 'PEN', 'STABLE', 'STY'],
			},
			{
				level: 2,
				group: 'CLASSIC DOG NAMES',
				members: ['FLUFFY', 'REX', 'ROVER', 'SPOT'],
			},
			{
				level: 3,
				group: 'COLORS MINUS THEIR FIRST LETTERS',
				members: ['INK', 'LACK', 'OLD', 'RANGE'],
			},
		],
	},
	{
		id: 238,
		date: '2024-02-04',
		answers: [
			{
				level: 0,
				group: 'DRINKS WITH CAFFEINE',
				members: ['COCOA', 'COFFEE', 'MATE', 'TEA'],
			},
			{
				level: 1,
				group: 'UNEXCITING',
				members: ['BORING', 'DULL', 'MUNDANE', 'VANILLA'],
			},
			{
				level: 2,
				group: 'COMEDIAN\u2019S PERFORMANCE',
				members: ['ACT', 'BIT', 'ROUTINE', 'SET'],
			},
			{
				level: 3,
				group: 'MARTINI SPECIFICATIONS',
				members: ['DIRTY', 'DRY', 'TWIST', 'UP'],
			},
		],
	},
	{
		id: 239,
		date: '2024-02-05',
		answers: [
			{
				level: 0,
				group: '"GIVE ME A BREAK!"',
				members: ['BROTHER', 'LORD', 'PLEASE', 'SHEESH'],
			},
			{
				level: 1,
				group: 'ECCLESIASTICAL TITLES',
				members: ['BISHOP', 'CARDINAL', 'PASTOR', 'PRIOR'],
			},
			{
				level: 2,
				group: 'ROCK & ROLL HALL OF FAME INDUCTEES',
				members: ['HEART', 'MADONNA', 'PRINCE', 'QUEEN'],
			},
			{
				level: 3,
				group: 'CITY HOMOPHONES',
				members: ['DELI', 'NIECE', 'ROAM', 'SOUL'],
			},
		],
	},
	{
		id: 240,
		date: '2024-02-06',
		answers: [
			{
				level: 0,
				group: 'OSTENTATIOUS, AS AN OUTFIT',
				members: ['BRIGHT', 'FLASHY', 'GARISH', 'LOUD'],
			},
			{
				level: 1,
				group: 'EUPHEMISMS FOR FLATULENCE',
				members: ['GAS', 'STINKER', 'TOOT', 'WIND'],
			},
			{
				level: 2,
				group: 'KINDS OF BLOND',
				members: ['DIRTY', 'HONEY', 'PLATINUM', 'STRAWBERRY'],
			},
			{
				level: 3,
				group: 'WHAT \u201cO\u201d MIGHT MEAN',
				members: ['HUG', 'OF', 'OXYGEN', 'ZERO'],
			},
		],
	},
	{
		id: 241,
		date: '2024-02-07',
		answers: [
			{
				level: 0,
				group: 'SEA CREATURES',
				members: ['CRAB', 'RAY', 'SPONGE', 'SQUID'],
			},
			{
				level: 1,
				group: 'BASIC TWO-DIMENSIONAL SHAPES',
				members: ['CIRCLE', 'DIAMOND', 'SQUARE', 'TRIANGLE'],
			},
			{
				level: 2,
				group: 'BOXING MANEUVERS',
				members: ['BOB', 'CROSS', 'HOOK', 'WEAVE'],
			},
			{
				level: 3,
				group: 'FANCY ___',
				members: ['FEAST', 'FREE', 'PANTS', 'THAT'],
			},
		],
	},
	{
		id: 242,
		date: '2024-02-08',
		answers: [
			{
				level: 0,
				group: 'ARCHERY EQUIPMENT',
				members: ['ARROW', 'BOW', 'QUIVER', 'TARGET'],
			},
			{
				level: 1,
				group: 'CARD GAMES',
				members: ['BRIDGE', 'GIN', 'SPIT', 'WAR'],
			},
			{
				level: 2,
				group: 'WALLOP',
				members: ['BELT', 'CLOCK', 'DECK', 'SLUG'],
			},
			{
				level: 3,
				group: 'CLASSIC TATTOOS',
				members: ['ANCHOR', 'DRAGON', 'HEART', 'ROSE'],
			},
		],
	},
	{
		id: 243,
		date: '2024-02-09',
		answers: [
			{
				level: 0,
				group: 'MUSIC PLAYER BUTTONS',
				members: ['REWIND', 'SHUFFLE', 'SKIP', 'STOP'],
			},
			{
				level: 1,
				group: 'BROADCAST',
				members: ['AIR', 'RUN', 'SCREEN', 'SHOW'],
			},
			{
				level: 2,
				group: 'THINGS YOU CAN DRAW',
				members: ['BATH', 'CARD', 'CURTAIN', 'PICTURE'],
			},
			{
				level: 3,
				group: 'NUMBER ANAGRAMS',
				members: ['EON', 'ETHER', 'NET', 'TOW'],
			},
		],
	},
	{
		id: 244,
		date: '2024-02-10',
		answers: [
			{
				level: 0,
				group: 'STOOL PIGEON',
				members: ['CANARY', 'FINK', 'RAT', 'SNITCH'],
			},
			{
				level: 1,
				group: 'CRAM INTO A TIGHT SPACE',
				members: ['JAM', 'PACK', 'SQUEEZE', 'STUFF'],
			},
			{
				level: 2,
				group: 'YOGA POSES',
				members: ['CAT', 'COW', 'MOUNTAIN', 'TRIANGLE'],
			},
			{
				level: 3,
				group: '___FLY',
				members: ['BUTTER', 'DRAGON', 'FIRE', 'HORSE'],
			},
		],
	},
	{
		id: 245,
		date: '2024-02-11',
		answers: [
			{
				level: 0,
				group: 'MONOTONOUS SOUNDS',
				members: ['BUZZ', 'DRONE', 'HUM', 'PURR'],
			},
			{
				level: 1,
				group: 'BOATS',
				members: ['BARGE', 'DORY', 'SCOW', 'SLOOP'],
			},
			{
				level: 2,
				group: 'CAPTAINS',
				members: ['AMERICA', 'HOOK', 'MORGAN', 'NEMO'],
			},
			{
				level: 3,
				group: 'PREFIXES WITH -CRACY',
				members: ['AUTO', 'BUREAU', 'DEMO', 'PLUTO'],
			},
		],
	},
	{
		id: 246,
		date: '2024-02-12',
		answers: [
			{
				level: 0,
				group: 'BAD THINGS FOR A VIDEO CALL TO DO',
				members: ['DROP', 'ECHO', 'FREEZE', 'LAG'],
			},
			{
				level: 1,
				group: 'COSTUMES WITH STRIPED SHIRTS',
				members: ['MIME', 'PRISONER', 'REFEREE', 'SAILOR'],
			},
			{
				level: 2,
				group: 'SEEN IN \u201cALADDIN\u201d',
				members: ['GENIE', 'MONKEY', 'PARROT', 'PRINCESS'],
			},
			{
				level: 3,
				group: 'MOVIES MINUS NUMBERS',
				members: ['APOLLO', 'CANDLES', 'FANTASTIC', 'SAMURAI'],
			},
		],
	},
	{
		id: 247,
		date: '2024-02-13',
		answers: [
			{
				level: 0,
				group: 'ENCOURAGE, WITH "ON"',
				members: ['EGG', 'GOAD', 'SPUR', 'URGE'],
			},
			{
				level: 1,
				group: 'SPHERICAL FOODS',
				members: ['JAWBREAKER', 'MEATBALL', 'MOZZARELLA', 'ORANGE'],
			},
			{
				level: 2,
				group: 'GROCERY STORE AISLES',
				members: ['DAIRY', 'FROZEN', 'PRODUCE', 'SNACK'],
			},
			{
				level: 3,
				group: 'GO ___',
				members: ['BANANAS', 'FIGURE', 'FISH', 'STEADY'],
			},
		],
	},
	{
		id: 248,
		date: '2024-02-14',
		answers: [
			{
				level: 0,
				group: 'TOUCH LIGHTLY',
				members: ['BRUSH', 'GRAZE', 'KISS', 'SKIM'],
			},
			{
				level: 1,
				group: 'KINDS OF NUMBERS',
				members: ['ODD', 'PERFECT', 'PRIME', 'WHOLE'],
			},
			{
				level: 2,
				group: 'SAUCES IN CHINESE CUISINE',
				members: ['OYSTER', 'PLUM', 'SOY', 'XO'],
			},
			{
				level: 3,
				group: 'BEAR ___',
				members: ['CLAW', 'FRUIT', 'HUG', 'WITNESS'],
			},
		],
	},
	{
		id: 249,
		date: '2024-02-15',
		answers: [
			{
				level: 0,
				group: 'FOLLOW ATTENTIVELY',
				members: ['MONITOR', 'SURVEY', 'TRACK', 'WATCH'],
			},
			{
				level: 1,
				group: 'WHERE YOU MIGHT FIND SAND',
				members: ['BEACH', 'DESERT', 'HOURGLASS', 'PLAYGROUND'],
			},
			{
				level: 2,
				group: 'OVEN BUTTONS',
				members: ['BAKE', 'BROIL', 'LIGHT', 'TIMER'],
			},
			{
				level: 3,
				group: 'BRITPOP BANDS',
				members: ['BLUR', 'OASIS', 'PULP', 'SUEDE'],
			},
		],
	},
	{
		id: 250,
		date: '2024-02-16',
		answers: [
			{
				level: 0,
				group: 'COMFY SHOES',
				members: ['CROC', 'LOAFER', 'MOCCASIN', 'SLIPPER'],
			},
			{
				level: 1,
				group: 'THINGS MADE WITH FEATHERS',
				members: ['BOA', 'HEADDRESS', 'PILLOW', 'SHUTTLECOCK'],
			},
			{
				level: 2,
				group: 'PROGRAMMING LANGUAGES',
				members: ['BASIC', 'JAVA', 'PYTHON', 'RUBY'],
			},
			{
				level: 3,
				group: 'THINGS THAT CAN STRIKE',
				members: ['COBRA', 'INSPIRATION', 'LIGHTNING', 'UNION'],
			},
		],
	},
	{
		id: 251,
		date: '2024-02-17',
		answers: [
			{
				level: 0,
				group: 'BIT OF HAIR',
				members: ['CURL', 'LOCK', 'RINGLET', 'TRESS'],
			},
			{
				level: 1,
				group: 'MEDIA ATTENTION',
				members: ['COVERAGE', 'EXPOSURE', 'PRESS', 'PUBLICITY'],
			},
			{
				level: 2,
				group: 'NOUN SUFFIXES',
				members: ['DOM', 'ION', 'NESS', 'SHIP'],
			},
			{
				level: 3,
				group: '___ CIRCUS',
				members: ['FAMILY', 'FLEA', 'FLYING', 'MEDIA'],
			},
		],
	},
	{
		id: 252,
		date: '2024-02-18',
		answers: [
			{
				level: 0,
				group: 'EAT A LITTLE',
				members: ['GRAZE', 'NIBBLE', 'PECK', 'SNACK'],
			},
			{
				level: 1,
				group: 'PURSUE',
				members: ['HUNT', 'TRACK', 'TRAIL', 'STALK'],
			},
			{
				level: 2,
				group: 'INGREDIENTS IN MINESTRONE',
				members: ['BEANS', 'PASTA', 'STOCK', 'VEGETABLES'],
			},
			{
				level: 3,
				group: '___CAST',
				members: ['BROAD', 'FORE', 'POD', 'TYPE'],
			},
		],
	},
	{
		id: 253,
		date: '2024-02-19',
		answers: [
			{
				level: 0,
				group: 'USED IN BUILDING A FIRE',
				members: ['KINDLING', 'LOG', 'MATCH', 'TINDER'],
			},
			{
				level: 1,
				group: 'MESS UP',
				members: ['BLOW', 'BUMBLE', 'FLUFF', 'SPOIL'],
			},
			{
				level: 2,
				group: 'WORKSHOP TOOLS',
				members: ['DRILL', 'GRINDER', 'ROUTER', 'SAW'],
			},
			{
				level: 3,
				group: 'PARTS OF A DOOR',
				members: ['FRAME', 'HANDLE', 'HINGE', 'LOCK'],
			},
		],
	},
	{
		id: 254,
		date: '2024-02-20',
		answers: [
			{
				level: 0,
				group: 'PARTY POOPER',
				members: ['BORE', 'DRAG', 'DRIP', 'DUD'],
			},
			{
				level: 1,
				group: 'MUSICAL SECTIONS',
				members: ['BRASS', 'RHYTHM', 'STRING', 'WIND'],
			},
			{
				level: 2,
				group: 'BIT OF LIQUID',
				members: ['BEAD', 'DROP', 'GLOB', 'TEAR'],
			},
			{
				level: 3,
				group: 'VEGETABLE HOMOPHONES',
				members: ['BEAT', 'CHARRED', 'LEAK', 'PEE'],
			},
		],
	},
	{
		id: 255,
		date: '2024-02-21',
		answers: [
			{
				level: 0,
				group: 'PESTERS',
				members: ['BADGERS', 'BUGS', 'HOUNDS', 'NAGS'],
			},
			{
				level: 1,
				group: 'TONY WINNERS FOR BEST MUSICAL',
				members: ['ANNIE', 'CABARET', 'CATS', 'COMPANY'],
			},
			{
				level: 2,
				group: 'THEY HAVE KEYS',
				members: ['COMPUTER', 'PIANO', 'SUPER', 'TESTS'],
			},
			{
				level: 3,
				group: 'SCHOOL OF ___',
				members: ['FISH', 'HARD KNOCKS', 'ROCK', 'THOUGHT'],
			},
		],
	},
	{
		id: 256,
		date: '2024-02-22',
		answers: [
			{
				level: 0,
				group: 'DOG SOUNDS',
				members: ['BARK', 'GROWL', 'HOWL', 'WHINE'],
			},
			{
				level: 1,
				group: 'DEPARTMENT',
				members: ['ARM', 'BRANCH', 'CHAPTER', 'WING'],
			},
			{
				level: 2,
				group: 'ORIGIN',
				members: ['CRADLE', 'FONT', 'ROOT', 'SOURCE'],
			},
			{
				level: 3,
				group: 'COLORS WITH THEIR FIRST LETTERS CHANGED',
				members: ['CLUE', 'FROWN', 'MELLOW', 'PREEN'],
			},
		],
	},
	{
		id: 257,
		date: '2024-02-23',
		answers: [
			{
				level: 0,
				group: 'PROCESSION',
				members: ['CARAVAN', 'FLEET', 'PARADE', 'TRAIN'],
			},
			{
				level: 1,
				group: 'SHADES OF GREEN',
				members: ['OLIVE', 'FOREST', 'LIME', 'MINT'],
			},
			{
				level: 2,
				group: 'WHAT \u201cBLUE\u201d MIGHT MEAN',
				members: ['DEMOCRATIC', 'EROTIC', 'NOBLE', 'SAD'],
			},
			{
				level: 3,
				group: 'THINGS WITH SPINES',
				members: ['BOOK', 'CACTUS', 'HEDGEHOG', 'SKELETON'],
			},
		],
	},
	{
		id: 258,
		date: '2024-02-24',
		answers: [
			{
				level: 0,
				group: 'MANUFACTURING LOCATIONS',
				members: ['FACTORY', 'MILL', 'PLANT', 'SHOP'],
			},
			{
				level: 1,
				group: 'WIN + LETTER',
				members: ['WIND', 'WINE', 'WING', 'WINK'],
			},
			{
				level: 2,
				group: 'PARTS OF FRUIT YOU MIGHT NOT EAT',
				members: ['CORE', 'RIND', 'SEED', 'STEM'],
			},
			{
				level: 3,
				group: 'WEIGHTS IN BOXING',
				members: ['FEATHER', 'HEAVY', 'LIGHT', 'MIDDLE'],
			},
		],
	},
	{
		id: 259,
		date: '2024-02-25',
		answers: [
			{
				level: 0,
				group: 'WALK HEAVILY',
				members: ['LUMBER', 'PLOD', 'STOMP', 'TRUDGE'],
			},
			{
				level: 1,
				group: 'FLEXIBLE',
				members: ['ELASTIC', 'LIMBER', 'PLASTIC', 'SUPPLE'],
			},
			{
				level: 2,
				group: 'FENCING EQUIPMENT',
				members: ['FOIL', 'GLOVE', 'JACKET', 'MASK'],
			},
			{
				level: 3,
				group: 'WORDS BEGINNING WITH INSTRUMENTS',
				members: ['BASSINET', 'CELLOPHANE', 'HARPOON', 'ORGANISM'],
			},
		],
	},
	{
		id: 260,
		date: '2024-02-26',
		answers: [
			{
				level: 0,
				group: 'BASIC TASTES',
				members: ['BITTER', 'SALTY', 'SOUR', 'SWEET'],
			},
			{
				level: 1,
				group: 'STAND UP TO, AS A CHALLENGE',
				members: ['BRAVE', 'CONFRONT', 'FACE', 'MEET'],
			},
			{
				level: 2,
				group: 'ILK',
				members: ['KIND', 'SORT', 'TYPE', 'VARIETY'],
			},
			{
				level: 3,
				group: 'ART MOVEMENTS, WITH -ISM',
				members: ['EXPRESSION', 'MANNER', 'ROMANTIC', 'SURREAL'],
			},
		],
	},
	{
		id: 261,
		date: '2024-02-27',
		answers: [
			{
				level: 0,
				group: "'80S FASHION TRENDS",
				members: ['HEADBAND', 'MULLET', 'NEON', 'SPANDEX'],
			},
			{
				level: 1,
				group: 'GYMNASTICS POSITIONS',
				members: ['PIKE', 'SPLIT', 'STRADDLE', 'TUCK'],
			},
			{
				level: 2,
				group: 'KINDS OF CRACKERS',
				members: ['ANIMAL', 'GOLDFISH', 'OYSTER', 'RITZ'],
			},
			{
				level: 3,
				group: '___ LADDER',
				members: ['CORPORATE', 'ROPE', 'SALMON', 'WORD'],
			},
		],
	},
	{
		id: 262,
		date: '2024-02-28',
		answers: [
			{
				level: 0,
				group: 'CHEESES, FAMILIARLY',
				members: ['AMERICAN', 'BLUE', 'JACK', 'SWISS'],
			},
			{
				level: 1,
				group: 'TRACK AND FIELD EQUIPMENT',
				members: ['HAMMER', 'HURDLE', 'JAVELIN', 'POLE'],
			},
			{
				level: 2,
				group: 'KINDS OF HEELS',
				members: ['CUBAN', 'KITTEN', 'STILETTO', 'WEDGE'],
			},
			{
				level: 3,
				group: 'DOUBLE ___',
				members: ['DATE', 'DUTCH', 'JEOPARDY', 'SPACE'],
			},
		],
	},
	{
		id: 263,
		date: '2024-02-29',
		answers: [
			{
				level: 0,
				group: 'PROPEL INTO THE AIR',
				members: ['HOP', 'JUMP', 'LEAP', 'SPRING'],
			},
			{
				level: 1,
				group: 'PLACE TO STORE VALUABLES',
				members: ['CHEST', 'COFFER', 'SAFE', 'VAULT'],
			},
			{
				level: 2,
				group: 'PERIOD',
				members: ['AGE', 'DAY', 'ERA', 'TIME'],
			},
			{
				level: 3,
				group: 'ANIMALS BACKWARD',
				members: ['DRIB', 'FLOW', 'REED', 'TANG'],
			},
		],
	},
	{
		id: 264,
		date: '2024-03-01',
		answers: [
			{
				level: 0,
				group: 'GARLIC BREAD INGREDIENTS',
				members: ['BREAD', 'BUTTER', 'GARLIC', 'PARSLEY'],
			},
			{
				level: 1,
				group: 'WAGER',
				members: ['BET', 'GAMBLE', 'RISK', 'STAKE'],
			},
			{
				level: 2,
				group: 'DISNEYLAND LANDS',
				members: ['ADVENTURE', 'FANTASY', 'FRONTIER', 'TOMORROW'],
			},
			{
				level: 3,
				group: '___ BAT',
				members: ['BASEBALL', 'CRICKET', 'FRUIT', 'VAMPIRE'],
			},
		],
	},
	{
		id: 265,
		date: '2024-03-02',
		answers: [
			{
				level: 0,
				group: 'INTELLIGENCE OPERATIVE',
				members: ['AGENT', 'ASSET', 'MOLE', 'SLEEPER'],
			},
			{
				level: 1,
				group: 'UNITS IN POETRY',
				members: ['FOOT', 'LINE', 'METER', 'VERSE'],
			},
			{
				level: 2,
				group: 'EXPRESS INDIRECTLY',
				members: ['COUCH', 'IMPLY', 'INTIMATE', 'SUGGEST'],
			},
			{
				level: 3,
				group: 'WHAT \u201cK\u201d MIGHT MEAN',
				members: ['KELVIN', 'OKAY', 'POTASSIUM', 'THOUSAND'],
			},
		],
	},
	{
		id: 266,
		date: '2024-03-03',
		answers: [
			{
				level: 0,
				group: 'LARGE AMOUNT',
				members: ['MASS', 'SEA', 'SLEW', 'TON'],
			},
			{
				level: 1,
				group: 'FALL IN UNDER PRESSURE',
				members: ['BUCKLE', 'CAVE', 'COLLAPSE', 'GIVE'],
			},
			{
				level: 2,
				group: 'WAYS TO GET ATTENTION',
				members: ['SHOUT', 'SNAP', 'WAVE', 'WHISTLE'],
			},
			{
				level: 3,
				group: 'BELLY ___',
				members: ['BUTTON', 'DANCE', 'FLOP', 'LAUGH'],
			},
		],
	},
	{
		id: 267,
		date: '2024-03-04',
		answers: [
			{
				level: 0,
				group: 'ROOMS IN THE GAME CLUE',
				members: ['HALL', 'LIBRARY', 'LOUNGE', 'STUDY'],
			},
			{
				level: 1,
				group: 'COLLEAGUE',
				members: ['ASSOCIATE', 'FELLOW', 'PARTNER', 'PEER'],
			},
			{
				level: 2,
				group: 'SEEN DURING EASTER',
				members: ['BUNNY', 'EGG', 'JELLY BEAN', 'PEEP'],
			},
			{
				level: 3,
				group: 'WHAT A MOLE CAN BE',
				members: ['ANIMAL', 'BIRTHMARK', 'SPY', 'UNIT'],
			},
		],
	},
	{
		id: 268,
		date: '2024-03-05',
		answers: [
			{
				level: 0,
				group: 'POP MEGASTARS',
				members: ['GRANDE', 'MARS', 'STYLES', 'SWIFT'],
			},
			{
				level: 1,
				group: 'METHOD',
				members: ['CHANNEL', 'MEANS', 'MEDIUM', 'VEHICLE'],
			},
			{
				level: 2,
				group: 'UNLIKELY, AS CHANCES',
				members: ['OUTSIDE', 'REMOTE', 'SLIM', 'SMALL'],
			},
			{
				level: 3,
				group: 'LIVING ___',
				members: ['LARGE', 'LEGEND', 'PROOF', 'ROOM'],
			},
		],
	},
	{
		id: 269,
		date: '2024-03-06',
		answers: [
			{
				level: 0,
				group: 'PARTS OF AN AIRPORT',
				members: ['HANGAR', 'RUNWAY', 'TARMAC', 'TERMINAL'],
			},
			{
				level: 1,
				group: 'LEGAL TERMS',
				members: ['ACTION', 'CLAIM', 'COMPLAINT', 'LAWSUIT'],
			},
			{
				level: 2,
				group: 'THINGS A JUGGLER JUGGLES',
				members: ['BEANBAG', 'CLUB', 'RING', 'TORCH'],
			},
			{
				level: 3,
				group: 'WORDS ENDING IN CLOTHING',
				members: ['FOXGLOVE', 'GUMSHOE', 'TURNCOAT', 'WINDSOCK'],
			},
		],
	},
	{
		id: 270,
		date: '2024-03-07',
		answers: [
			{
				level: 0,
				group: 'SHARED',
				members: ['COLLECTIVE', 'COMMON', 'JOINT', 'MUTUAL'],
			},
			{
				level: 1,
				group: 'RID OF CONTENTS',
				members: ['CLEAR', 'DRAIN', 'EMPTY', 'FLUSH'],
			},
			{
				level: 2,
				group: 'ASSOCIATED WITH \u201cSTUB\u201d',
				members: ['CIGARETTE', 'PENCIL', 'TICKET', 'TOE'],
			},
			{
				level: 3,
				group: '___ DREAM',
				members: ['AMERICAN', 'FEVER', 'LUCID', 'PIPE'],
			},
		],
	},
	{
		id: 271,
		date: '2024-03-08',
		answers: [
			{
				level: 0,
				group: 'THINGS TO SEW',
				members: ['DART', 'HEM', 'PLEAT', 'SEAM'],
			},
			{
				level: 1,
				group: 'WAYS TO PRESERVE FOOD',
				members: ['CAN', 'CURE', 'DRY', 'FREEZE'],
			},
			{
				level: 2,
				group: 'SHARP QUALITY',
				members: ['BITE', 'EDGE', 'PUNCH', 'SPICE'],
			},
			{
				level: 3,
				group: 'BIRDS MINUS LAST LETTER',
				members: ['CONDO', 'HAW', 'HERO', 'LOO'],
			},
		],
	},
	{
		id: 272,
		date: '2024-03-09',
		answers: [
			{
				level: 0,
				group: 'EAT VORACIOUSLY',
				members: ['DOWN', 'INHALE', 'SCARF', 'WOLF'],
			},
			{
				level: 1,
				group: 'AREAS OF ACADEMIC FOCUS',
				members: ['CONCENTRATION', 'DEGREE', 'MAJOR', 'MINOR'],
			},
			{
				level: 2,
				group: 'UNIVERSAL',
				members: ['BLANKET', 'BROAD', 'GENERAL', 'SWEEPING'],
			},
			{
				level: 3,
				group: 'SPACE ___',
				members: ['BAR', 'CADET', 'HEATER', 'STATION'],
			},
		],
	},
	{
		id: 273,
		date: '2024-03-10',
		answers: [
			{
				level: 0,
				group: 'THINGS A DOG CAN FETCH',
				members: ['BALL', 'BONE', 'FRISBEE', 'STICK'],
			},
			{
				level: 1,
				group: 'CONCEAL',
				members: ['BLOCK', 'COVER', 'HIDE', 'OBSCURE'],
			},
			{
				level: 2,
				group: 'MAC KEYBOARD KEYS',
				members: ['COMMAND', 'CONTROL', 'OPTION', 'SHIFT'],
			},
			{
				level: 3,
				group: 'EXPERIENCE A MEMORY LAPSE',
				members: ['BLANK', 'FLAKE', 'FORGET', 'SPACE'],
			},
		],
	},
	{
		id: 274,
		date: '2024-03-11',
		answers: [
			{
				level: 0,
				group: 'TREAT WITH EXCESSIVE CARE',
				members: ['BABY', 'MOTHER', 'PAMPER', 'SPOIL'],
			},
			{
				level: 1,
				group: 'BACKSIDE',
				members: ['BOOTY', 'BUM', 'CAN', 'REAR'],
			},
			{
				level: 2,
				group: 'THINGS IN A SPA LOCKER ROOM',
				members: ['ROBE', 'SLIPPERS', 'TOWEL', 'WASHCLOTH'],
			},
			{
				level: 3,
				group: 'CAT\u2019S ___',
				members: ['CRADLE', 'EYE', 'MEOW', 'PAJAMAS'],
			},
		],
	},
	{
		id: 275,
		date: '2024-03-12',
		answers: [
			{
				level: 0,
				group: 'SECTION',
				members: ['CLASS', 'DIVISION', 'RANK', 'TIER'],
			},
			{
				level: 1,
				group: 'INCLUDING',
				members: ['AND', 'ALSO', 'PLUS', 'WITH'],
			},
			{
				level: 2,
				group: 'DOG BREEDS, INFORMALLY',
				members: ['BOSTON', 'GOLDEN', 'LAB', 'PIT'],
			},
			{
				level: 3,
				group: 'FAMOUS POEMS',
				members: ['DADDY', 'HARLEM', 'HOWL', 'IF'],
			},
		],
	},
];

export default conns;
