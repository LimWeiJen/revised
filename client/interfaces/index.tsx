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
	createEmptyCard: () => void,
	deleteCard: () => void,
	updateCard: (newCard: CardInterface) => void
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