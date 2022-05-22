import React, { useState } from 'react'
import { CardInterface, ContextInterface, UserInterface } from '../interfaces';
import { client } from '../lib';
import { v4 } from 'uuid'

export const GlobalContext = React.createContext<ContextInterface | null>(null);

const GlobalProvider = ({ children }: any) => {
	////// VARIABLES //////
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState<Array<CardInterface>>([]);
	const [boxes, setBoxes] = useState<Array<Array<CardInterface>>>([[], [], [], [], []]);
	const [currCard, setCurrCard] = useState<CardInterface>();

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

		// update the cards of the user
		setCards(user.cards)

		// update the boxes
		let newBoxes: Array<Array<CardInterface>> = [[], [], [], [], []];
		if (user.cards) {

			// iterate through all the cards of the user
			// if the user's card has the box index of 0, put it in the 0th box, if the user's card has the box index of 1, put it in the 1st box, and so on
			for (let card of user.cards) {
				newBoxes[card.box].push(card);
			}
		}
		setBoxes(newBoxes);

		// update currCard to the first card of the first non-empty box
		for (let box of newBoxes) {
			if (box.length > 0) {
				setCurrCard(box[0]);
				break;
			}
		}
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

		// update the user's cards in the database
		await client.patch(localStorage.getItem('id')!).setIfMissing({cards: []}).prepend('cards', [{
			_type: 'card',
			_id: id,
			_key: id,
			question: '',
			answer: '',
			box: 0
		}]).commit();

		// sign in again to refresh the page
		await signIn(localStorage.getItem('username')!, localStorage.getItem('password')!, false)
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
				
				// sign in again to refresh the page
				await signIn(localStorage.getItem('username')!, localStorage.getItem('password')!)
				return;
			}
		}
	}

	const deleteCard = async () => {
		
		// filter out the card that has the id of the curr card
		let newCards = [...cards].filter(card => card._id !== currCard?._id)

		// update the cards of the user in the database
		await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();
		
		// reload the page
		location.reload();
	}

	const resetCard = async () => {

		// create a copy of the cards
		let newCards = [...cards];

		// set each of the card's box index to 0
		for (let i = 0; i < newCards.length; i++) newCards[i].box = 0;
		
		// update the cards of the user in the database
		await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();

		// reload the page
		location.reload();
	}

	return <GlobalContext.Provider value={{
		username,
		cards,
		boxes,
		currCard,

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