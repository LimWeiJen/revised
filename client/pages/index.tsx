import type { NextPage } from 'next'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import FlashCard from '../components/Flashcard'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context'
import addIcon from '../public/icons/add_FILL0_wght400_GRAD0_opsz48.svg'

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
		{context?.username ? <div className='grid place-items-center h-screen'>
			<FlashCard />
			<div className='absolute bottom-0 right-0 m-5 transition-all hover:scale-110 hover:cursor-pointer'>
				<Image id='new-card-button' className='bg-primary-red rounded-full' onClick={context?.createEmptyCard} src={addIcon} />
			</div>
		</div> : 
		<div className='grid place-items-center h-screen'>
			<Login />
		</div>}
	</div>
}

export default Home
