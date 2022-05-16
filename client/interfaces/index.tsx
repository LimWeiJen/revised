export interface ContextInterface {
	username: string,
	cards: Array<CardInterface>,
	boxes: Array<number>,
	categories: Array<string>,
	currCardIndex: number,
	currCard: CardInterface | undefined,
	signIn: () => void,
	signUp: () => void,
	signOut: () => void,
	deleteAccount: () => void,
	createCard: (card: CardInterface) => void,
	getAllCards: () => Array<CardInterface>,
	getAllCategories: () => Array<string>,
	updateCard: (id: string, newCard: CardInterface) => void
}

export interface CardInterface {
	id: string,
	question: string,
	category: string,
	answer: Array<string>,
	box: number
}