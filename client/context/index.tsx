import React, { useState } from 'react'
import { CardInterface, ContextInterface } from '../interfaces';

export const GlobalContext = React.createContext<ContextInterface | null>(null);

const GlobalProvider = ({ children }: any) => {
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState<Array<CardInterface>>([]);
	const [boxes, setBoxes] = useState<Array<number>>([]);
	const [currCardIndex, setCurrCardIndex] = useState<number>(0);
	const [currCard, setCurrCard] = useState<CardInterface>();

	////// FUNCTIONS //////
	const signIn = (username: string, password: string) => {}

	const signUp = (username: string, password:string) => {}

	const signOut = () => {}

	const deleteAccount = () => {}

	const createCard = (card: CardInterface) => {}

	const getAllCards = (): Array<CardInterface> => {return []}

	const updateCard = (id: string, newCard: CardInterface) => {}

	return <GlobalContext.Provider value={{
		username,
		cards,
		boxes,
		currCardIndex,
		currCard,

		setUsername,
		setCards,
		setBoxes,
		setCurrCardIndex,
		setCurrCard,

		signIn,
		signUp,
		signOut,
		deleteAccount,
		createCard,
		getAllCards,
		updateCard
	}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider