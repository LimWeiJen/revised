import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'
import FlashCard from '../components/Flashcard'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context'

const Home: NextPage = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	////// USE EFFECTS //////
	useEffect(() => {
		// authenticate the user
		if (localStorage.getItem('id') !== null) {
			context?.signIn(localStorage.getItem('username')!, localStorage.getItem('password')!, false)
		}
	}, [])

	return <div>
		<Navbar />
		{context?.username ? <div>
			<FlashCard />
			<button id='new-card-button' onClick={context?.createEmptyCard}>New Card Button</button>
		</div> : <Login />}
	</div>
}

export default Home
