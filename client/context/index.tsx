import React, { useState } from 'react'
import { CardInterface, ContextInterface } from '../interfaces';

export const GlobalContext = React.createContext<ContextInterface | null>(null);

const GlobalProvider = ({ children }: any) => {
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState<Array<CardInterface>>([]);
	const [boxes, setBoxes] = useState<Array<number>>([]);
	const [categories, setCategories] = useState<Array<string>>([]);
	const [currCardIndex, setCurrCardIndex] = useState<number>(0);
	const [currCard, setCurrCard] = useState<CardInterface>();

	////// FUNCTIONS //////
	const signIn = () => {}

	const signUp = () => {}

	const signOut = () => {}

	const deleteAccount = () => {}

	const createCard = (card: CardInterface) => {}

	const getAllCards = (): Array<CardInterface> => {return []}

	const getAllCategories = (): Array<string> => {return []}

	const updateCard = (id: string, newCard: CardInterface) => {}

	return <GlobalContext.Provider value={{
		username,
		cards,
		boxes,
		categories,
		currCardIndex,
		currCard,
		signIn,
		signUp,
		signOut,
		deleteAccount,
		createCard,
		getAllCards,
		getAllCategories,
		updateCard
	}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider