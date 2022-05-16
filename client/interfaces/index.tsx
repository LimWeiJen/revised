import { Dispatch, SetStateAction } from "react"

export interface ContextInterface {
	username: string,
	cards: Array<CardInterface>,
	boxes: Array<number>,
	currCardIndex: number,
	currCard: CardInterface | undefined,

	setUsername: Dispatch<SetStateAction<string>>,
	setCards: Dispatch<SetStateAction<Array<CardInterface>>>,
	setBoxes: Dispatch<SetStateAction<Array<number>>>,
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