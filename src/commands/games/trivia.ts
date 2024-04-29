import pkg from 'whatsapp-web.js';
import baseuser from '../../models/baseuser.js';

import { type triviaBase, type triviaQuestion } from '../../types/games.js';

const categories = [
	{ id: 9, name: 'General Knowledge' },
	{ id: 10, name: 'Entertainment: Books' },
	{ id: 11, name: 'Entertainment: Film' },
	{ id: 12, name: 'Entertainment: Music' },
	{ id: 13, name: 'Entertainment: Musicals & Theatres' },
	{ id: 14, name: 'Entertainment: Television' },
	{ id: 15, name: 'Entertainment: Video Games' },
	{ id: 16, name: 'Entertainment: Board Games' },
	{ id: 17, name: 'Science & Nature' },
	{ id: 18, name: 'Science: Computers' },
	{ id: 19, name: 'Science: Mathematics' },
	{ id: 20, name: 'Mythology' },
	{ id: 21, name: 'Sports' },
	{ id: 22, name: 'Geography' },
	{ id: 23, name: 'History' },
	{ id: 24, name: 'Politics' },
	{ id: 25, name: 'Art' },
	{ id: 26, name: 'Celebrities' },
	{ id: 27, name: 'Animals' },
	{ id: 28, name: 'Vehicles' },
	{ id: 29, name: 'Entertainment: Comics' },
	{ id: 30, name: 'Science: Gadgets' },
	{ id: 31, name: 'Entertainment: Japanese Anime & Manga' },
	{ id: 32, name: 'Entertainment: Cartoon & Animations' },
];
const { Client, LocalAuth, MessageMedia } = pkg;
class trivia implements triviaBase {
	constructor(client: pkg.Client, id: string) {
		this.chatid = id;
		this.client = client;
		this.timed = false;
		this.difficulty = '';
		this.category = '';
		this.choices = false;
		this.questioncount = 0;
		this.questions = [];
		this.sessiontoken = '';
	}

	chatid: string;

	client: pkg.Client;

	timed: boolean;

	difficulty: string;

	category: string;

	choices: boolean;

	questioncount: number;

	questions: triviaQuestion[];

	sessiontoken: string;

	async getSession() {
		const data = await fetch(
			'https://opentdb.com/api_token.php?command=request'
		);
		const json = await data.json();
		this.sessiontoken = json.token;
	}

	async loadQuestions() {
		let fetchcount = 20;
		if (this.category) {
			const url = `https://opentdb.com/api_count.php?category=${this.category}`;
			const response = await fetch(url);
			const data = await response.json();
			if (this.difficulty) {
				if (this.difficulty == 'easy') {
					this.questioncount =
						data.category_question_count.total_easy_question_count;
				}

				if (this.difficulty == 'medium') {
					this.questioncount =
						data.category_question_count.total_medium_question_count;
				}

				if (this.difficulty == 'hard') {
					this.questioncount =
						data.category_question_count.total_hard_question_count;
				}
			} else {
				this.questioncount = data.category_question_count.total_question_count;
			}

			fetchcount = this.questioncount > 20 ? 20 : this.questioncount;
		}

		let furl = `https://opentdb.com/api.php?amount=${fetchcount}`;
		if (this.category) {
			furl += `&category=${this.category}`;
		}

		if (this.difficulty) {
			furl += `&difficulty=${this.difficulty}`;
		}

		furl += `&encode=url3986&token = ${this.sessiontoken}`;
		const qfetch = await fetch(furl);
		const qjson = await qfetch.json();
		if (qjson.response_code == 4) {
			this.client.sendMessage(
				this.chatid,
				'There are no more questions left for this category!'
			);
			this.client.ingame = false;
			return;
		}

		this.questions = qjson.results;

		this.questions.forEach(question => {
			question.question = decodeURIComponent(question.question);
			question.correct_answer = decodeURIComponent(question.correct_answer);
			question.incorrect_answers.forEach(answer => {
				const decodedanswer = decodeURIComponent(answer);
				question.incorrect_answers[question.incorrect_answers.indexOf(answer)] =
					decodedanswer;
			});
		});
		this.sendQuestion();
	}

	async sendQuestion() {
		if (this.questions.length == 0) {
			this.loadQuestions();
			return;
		}

		const question = this.questions.shift();
		const questiontext = question.question;
		const correctanswer = question.correct_answer;
		const incorrectanswers = question.incorrect_answers;
		const answers = [correctanswer, ...incorrectanswers];
		answers.sort();
		const answerindex = answers.indexOf(correctanswer) + 1;
		if (this.choices) {
			let answerlist = '';
			let n = 1;
			answers.forEach(answer => {
				answerlist += `${n}) ${answer}\n`;
				n++;
				// remove \n from last answer
			});
			answerlist = answerlist.slice(0, -1);
			this.client.sendMessage(this.chatid, `${questiontext} \n\n${answerlist}`);
		} else {
			this.client.sendMessage(this.chatid, `${questiontext}`);
		}

		const triv = this;
		let answ = 1;
		let done = false;
		this.client.on('message_create', async function wait(msg) {
			const chat = await msg.getChat();
			if (chat.id._serialized != triv.chatid) {
				return;
			}

			const user = await msg.getContact();
			let res = msg.body;
			if (res == 'QUIT') {
				done = true;
				await triv.client.sendMessage(triv.chatid, 'Game stopped!');
				triv.client.ingame = false;
				await triv.client.removeListener('message_create', wait);
				return;
			}

			if (res == 'SKIP' && answ == 1) {
				answ++;
				done = true;
				await msg.reply(`Correct answer - ${correctanswer}`);
				triv.sendQuestion();
				await triv.client.removeListener('message_create', wait);
				return;
			}

			res = res.toLowerCase();
			if (res.startsWith('ans ')) {
				res = res.slice(4);
				if (
					res.toLowerCase() == correctanswer.toLowerCase() ||
					parseInt(res) == answerindex
				) {
					if (answ != 1) {
						return;
					}

					answ++;
					done = true;
					await msg.react('✅');
					const winner = new baseuser({
						userId: user.number,
						users: triv.client.cachedUsers,
					});
					winner.addTrivia();
					await triv.client.removeListener('message_create', wait);
					triv.sendQuestion();
				} else if (triv.choices) {
					done = true;
					await msg.react('❌');
					await triv.client.removeListener('message_create', wait);
					await msg.reply(`Correct answer - ${correctanswer}`);
					triv.sendQuestion();
				}
			}
		});
		if (!done && this.timed) {
			done = true;
			setTimeout(async () => {
				await triv.client.sendMessage(
					triv.chatid,
					`Time's up!\n\nAnswer - ${correctanswer}`
				);
				triv.sendQuestion();
			}, 15000);
		}
	}
}

export const name = 'trivia';
export const args = true;
export const aliases = ['triv', 'tv'];
export const description = 'Start a game of trivia';
export const category = 'Games';
/**
 * @memberof! module:Games
 * @name trivia
 * @description
 * Implements a trivia game using the Open Trivia DB within WhatsApp.
 * 
 * **Usage (within the bot):**
 * - Call `getSession` to obtain a session token from the Open Trivia DB.
 * - Use `loadQuestions` to retrieve questions based on the configured options. 
 * - Call `sendQuestion` to send a question to the chat and handle user responses. 
 * 
 * **User Commands:**
 * - `!trivia` - Starts a new trivia game with random questions.
 * - `!trivia {category ID}` - Starts a game with questions from a specific category.
 * - `!trivia --choices` - Enables multiple choice questions.
 * - `!trivia --{easy/medium/hard}` - Sets the difficulty level of questions. 
 * - `!trivia --timed` - Enables timed mode for answering questions.
 * - `ans {answer}` - Submits an answer to the current question.
 * - `SKIP` - Skips the current question and reveals the answer. 
 * - `QUIT` - Ends the trivia game. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	const chat = await msg.getChat();
	if (client.ingame) {
		msg.reply('A game is currenty active!');
		return;
	}

	const game = new trivia(client, chat.id._serialized);
	if (args.length != 0) {
		if (args[0] == 'categories') {
			let categoryList = '';
			categories.forEach(category => {
				categoryList += `*${category.id}* => ${category.name}\n`;
			});
			categoryList += `@${process.env.PHONE} trivia <ID>  for a specific category`;
			msg.reply(categoryList);
			return;
		}
		if (args[0] == 'help') {
			msg.reply(
				'*trivia* for random questions \n*trivia <id>* for specific category* \n*trivia --choices* for multiple choice question \n*trivia --<easy/medium/hard>* for difficulty of questions \n*trivia --timed* for timed mode \n*QUIT* to stop the trivia \n *SKIP* to skip a quesiton'
			);
			return;
		}

		if (args[0]) {
			const category = categories.find(
				category => category.id === parseInt(args[0])
			);
			if (category) {
				game.category = String(category.id);
			}
		}

		if (args.includes('--timed')) {
			game.timed = true;
		}

		if (args.includes('--choices')) {
			game.choices = true;
		}

		if (args.includes('--easy')) {
			game.difficulty = 'easy';
		} else if (args.includes('--medium')) {
			game.difficulty = 'medium';
		} else if (args.includes('--hard')) {
			game.difficulty = 'hard';
		}
	}

	client.ingame = true;

	msg.reply(
		`Starting trivia! \n\n Category - ${game.category ? categories.find(category => category.id === parseInt(game.category)).name : 'Any'} \n Difficulty - ${game.difficulty ? game.difficulty : 'Any'} \n Timed - ${game.timed ? 'Yes' : 'No'} \n Multiple Choices - ${game.choices ? 'Yes' : 'No'}`
	);
	await game.getSession();
	game.loadQuestions();
}
