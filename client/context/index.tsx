import React, { useState } from 'react'
import { CardInterface, ContextInterface, UserInterface } from '../interfaces';
import { client } from '../lib';
import { v4 } from 'uuid'

export const GlobalContext = React.createContext<ContextInterface | null>(null);

const GlobalProvider = ({ children }: any) => {
	////// VARIABLES //////
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState<Array<CardInterface>>([]);
	const [currCard, setCurrCard] = useState<CardInterface>();
	const [isEditingCard, setIsEditingCard] = useState(false);

	////// FUNCTIONS //////
	const signIn = async (username: string, password: string, showPopUp = true) => {
		
		// get the user from the database by the username and password
		const res: Array<UserInterface> = await client.fetch(`
			*[_type == "user" && name == "${username}" && password == "${password}"]
		`);

		// if no user is fetched (incorrect username or password)
		if (res.length == 0) {
			if (showPopUp) return alert('incorrect username or password');
			return;
		}

		let user = res[0];

		// store the information of the user in local storage (for authentication)
		localStorage.setItem('id', user._id);
		localStorage.setItem('username', user.name);
		localStorage.setItem('password', user.password);

		// update the username
		setUsername(user.name)

		// update the cards
		_updateCardsInClient(user.cards);
	}

	const signUp = async (username: string, password:string) => {

		// get a new unique id for the user
		const id = v4();
		
		// initialize the user doc
		const newUserDoc = {
			_type: 'user',
			_id: id,
			name: username,
			password: password,
			cards: []
		}

		// store the information of the user in local storage (for authentication)
		localStorage.setItem('id', id);		
		localStorage.setItem('username', username);
		localStorage.setItem('password', password);

		// create a new user in the database
		await client.createIfNotExists(newUserDoc);

		// reload the page
		location.reload();
	}

	const signOut = () => {

		// remove the information of the user from local storage
		localStorage.removeItem('id');
		localStorage.removeItem('username');
		localStorage.removeItem('password');

		// reload the page
		location.reload();
	}

	const deleteAccount = async () => {

		// ask for confirmation
		if (confirm('Are you sure you want to delete your account?')) {
			// delete the account from the database
			await client.delete(localStorage.getItem('id')!)	

			// remove the information of the user from local storage
			localStorage.removeItem('id');
			localStorage.removeItem('username');
			localStorage.removeItem('password');

			// reload the page
			location.reload();
		}
	}

	const createEmptyCard = async () => {
		// get a new unique id for the card
		let id = v4();

		// initialize the card doc
		const newCard: CardInterface = {
			_type: 'card',
			_id: id,
			_key: id,
			question: '',
			answer: '',
			box: 0
		}

		// update the user's cards in the database
		await client.patch(localStorage.getItem('id')!).setIfMissing({cards: []}).prepend('cards', [newCard]).commit();

		// update the cards
		_updateCardsInClient([newCard, ...cards]);

		setIsEditingCard(true);
	}

	const updateCard = async (newCard: CardInterface) => {

		// iterate through all the cards
		for (let i = 0; i < cards.length; i++) {

			// if the card's id is the same as the new card's id (that card is the card that we want to modify)
			if (cards[i]._id === currCard?._id) {

				// replace the card with the new card in the database
				let newCards = [...cards];
				newCards[i] = newCard;
				await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();
				
				// update the cards
				_updateCardsInClient(newCards);

				setIsEditingCard(false);
				return;
			}
		}
	}

	const deleteCard = async () => {
		
		// filter out the card that has the id of the curr card
		const newCards = [...cards].filter(card => card._id !== currCard?._id)

		// update the cards of the user in the database
		await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();
		
		// update the cards
		_updateCardsInClient(newCards);

		setIsEditingCard(false);
	}

	const resetCard = async () => {

		// create a copy of the cards
		let newCards = [...cards];

		// set each of the card's box index to 0
		for (let i = 0; i < newCards.length; i++) newCards[i].box = 0;
		
		// update the cards of the user in the database
		await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();

		// update the cards
		_updateCardsInClient(newCards);
	}

	////// PRIVATE FUNCTIONS //////
	const _updateCardsInClient = (newCards: Array<CardInterface>) => {
		if (!newCards) return;
		newCards.sort((a: CardInterface, b: CardInterface) => a.box - b.box)
		setCards(newCards);
		setCurrCard(newCards[0]);
	}

	return <GlobalContext.Provider value={{
		username,
		cards,
		currCard,
		isEditingCard,
		setIsEditingCard,
		signIn,
		signUp,
		signOut,
		deleteAccount,
		createEmptyCard,
		deleteCard,
		updateCard,
		resetCard
	}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider