import React, { useState } from 'react'
import { CardInterface, ContextInterface, UserInterface } from '../interfaces';
import { client } from '../lib';
import { v4 } from 'uuid'

export const GlobalContext = React.createContext<ContextInterface | null>(null);

const GlobalProvider = ({ children }: any) => {
	const [username, setUsername] = useState("");
	const [cards, setCards] = useState<Array<CardInterface>>([]);
	const [boxes, setBoxes] = useState<Array<Array<CardInterface>>>([[], [], [], [], []]);
	const [currCardIndex, setCurrCardIndex] = useState<number>(0);
	const [currCard, setCurrCard] = useState<CardInterface>();

	////// FUNCTIONS //////
	const signIn = async (username: string, password: string) => {
		const res: Array<UserInterface> = await client.fetch(`
			*[_type == "user" && name == "${username}" && password == "${password}"]
		`);

		if (res.length == 0) return alert('incorrect username or password');

		localStorage.setItem('id', res[0]._id);
		localStorage.setItem('username', res[0].name);
		localStorage.setItem('password', res[0].password);

		console.log(res[0].cards)

		setUsername(res[0].name)
		setCards(res[0].cards)

		let newBoxes: Array<Array<CardInterface>> = [[], [], [], [], []];
		if (res[0].cards) {
			for (let card of res[0].cards) {
				newBoxes[card.box].push(card);
			}
		}
		setBoxes(newBoxes);

		for (let box of newBoxes) {
			if (box.length > 0) {
				setCurrCard(box[0]);
				break;
			}
		}
	}

	const signUp = async (username: string, password:string) => {
		const id = v4();
		
		const newUserDoc = {
			_type: 'user',
			_id: id,
			name: username,
			password: password,
			cards: []
		}

		localStorage.setItem('id', id);		
		localStorage.setItem('username', username);
		localStorage.setItem('password', password);

		await client.createIfNotExists(newUserDoc);

		location.href = '/'
	}

	const signOut = () => {
		localStorage.removeItem('id');
		localStorage.removeItem('username');
		localStorage.removeItem('password');

		location.href = '/'
	}

	const deleteAccount = async () => {
		if (confirm('Are you sure you want to delete your account?')) {
			await client.delete(localStorage.getItem('id')!)	
			localStorage.removeItem('id');
			localStorage.removeItem('username');
			localStorage.removeItem('password');
			location.reload();
		}
	}

	const createEmptyCard = async () => {
		let id = v4();

		await client.patch(localStorage.getItem('id')!).setIfMissing({cards: []}).prepend('cards', [{
			_type: 'card',
			_id: id,
			_key: id,
			question: '',
			answer: '',
			box: 0
		}]).commit();

		await signIn(localStorage.getItem('username')!, localStorage.getItem('password')!)
	}

	const updateCard = async (newCard: CardInterface) => {
		for (let i = 0; i < cards.length; i++) {
			if (cards[i]._id === JSON.parse(JSON.stringify(currCard))._id) {
				let newCards = [...cards];
				newCards[i] = newCard;
				await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();
				await signIn(localStorage.getItem('username')!, localStorage.getItem('password')!)
				return;
			}
		}
	}

	const deleteCard = async () => {
		let newCards = [...cards].filter(card => card._id !== currCard?._id)
		await client.patch(localStorage.getItem('id')!).set({cards: newCards}).commit();
		await signIn(localStorage.getItem('username')!, localStorage.getItem('password')!);
		location.reload();
	}

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
		createEmptyCard,
		deleteCard,
		updateCard
	}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider