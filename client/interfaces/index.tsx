export interface ContextInterface {
	username: string,
	cards: Array<CardInterface>,
	boxes: Array<Array<CardInterface>>,
	currCard: CardInterface | undefined,

	signIn: (username: string, password: string, showPopUp?: boolean) => void,
	signUp: (username: string, password: string) => void,
	signOut: () => void,
	deleteAccount: () => void,
	createEmptyCard: () => void,
	deleteCard: () => void,
	updateCard: (newCard: CardInterface) => void,
	resetCard: () => void
}

export interface CardInterface {
	question: string,
	answer: string,
	box: number,
	_type: 'card',
	_id: string,
	_key: string
}

export interface UserInterface {
	_id: string,
	name: string,
	password: string,
	cards: Array<CardInterface>
}