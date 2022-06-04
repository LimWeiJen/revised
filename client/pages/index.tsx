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
		{context?.username ? <div>
			<Navbar />
			<div className='grid place-items-center h-screen'>
				<FlashCard />
			</div>
		</div> : 
		<div className='h-screen grid place-items-center text-white'>
			<div className='flex flex-col justify-center'>
				<div className='font-thin text-center'>@revised</div>
				<div className='font-bold text-7xl text-center mt-2'>Revised</div>
				<div className='font-thin text-lg text-center mb-6'>Never Too Late To Study</div>
				<Login />
			</div>
			<h1 className='font-thin absolute bottom-4'>created by @limweijen ^_^</h1>
		</div>}
	</div>
}

export default Home
