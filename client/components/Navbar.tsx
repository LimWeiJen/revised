import Link from 'next/link';
import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import { AdjustmentsIcon, LogoutIcon, UserRemoveIcon, HomeIcon } from '@heroicons/react/solid'

const Navbar = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	return <div className='flex justify-center p-5 absolute w-screen'>
		<div>
			<div id='name-display' className='text-white flex flex-col justify-center text-xl'>{context?.username}</div>
			<div id='gmail-display' className='text-white flex flex-col justify-center font-thin opacity-80 text-sm'>@{context?.username}</div>
		</div>
		<div className='flex'>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer' id='dashboard'><Link href='/dashboard'><AdjustmentsIcon className='w-8 text-white' /></Link></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer' id='sign-out-button'><LogoutIcon onClick={context?.signOut} className='w-8 text-white' /></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer' id='delete-account-button'><UserRemoveIcon onClick={context?.deleteAccount} className='w-8 text-white' /></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer' id='home-button'><Link href='/'><HomeIcon className='w-8 text-white' /></Link></div>
		</div>
	</div>
}

export default Navbar