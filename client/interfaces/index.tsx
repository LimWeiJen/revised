import { Dispatch, SetStateAction } from "react"

export interface ContextInterface {
	username: string,
	cards: Array<CardInterface>,
	boxes: Array<Array<CardInterface>>,
	currCardIndex: number,
	currCard: CardInterface | undefined,

	setUsername: Dispatch<SetStateAction<string>>,
	setCards: Dispatch<SetStateAction<Array<CardInterface>>>,
	setBoxes: Dispatch<SetStateAction<Array<Array<CardInterface>>>>,
	setCurrCardIndex: Dispatch<SetStateAction<number>>,
	setCurrCard: Dispatch<SetStateAction<CardInterface | undefined>>,

	signIn: (username: string, password:string) => void,
	signUp: (username: string, password:string) => void,
	signOut: () => void,
	deleteAccount: () => void,
	createCard: (card: CardInterface) => void,
	getAllCards: () => Array<CardInterface>,
	updateCard: (id: string, newCard: CardInterface) => void
}

export interface CardInterface {
	id: string,
	question: string,
	category: string,
	answer: Array<string>,
	box: number
}

export interface UserInterface {
	_id: string,
	name: string,
	password: string,
	cards: Array<CardInterface>
}