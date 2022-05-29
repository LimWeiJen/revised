import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import logOutIcon from '../public/icons/logout_FILL0_wght400_GRAD0_opsz48.svg'
import deleteAccountIcon from '../public/icons/person_remove_FILL0_wght400_GRAD0_opsz48.svg'
import dashboardIcon from '../public/icons/manage_accounts_FILL0_wght400_GRAD0_opsz48.svg'
import websiteLogo from '../public/icons/websiteLogo.svg'

const Navbar = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	return <div className='bg-secondary-red flex justify-between shadow-2xl p-5 absolute w-screen'>
		<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Link href='/'><Image className='bg-primary-red rounded-full' id='dashboard' src={websiteLogo} /></Link></div>
		<div id='name-display' className='text-primary-red h-10 flex flex-col justify-center text-2xl font-bold'>{context?.username ? `Welcome Back, ${context.username}` : 'Please Sign In or Sign Up'}</div>
		<div className='flex'>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Link href='/dashboard'><Image className='bg-primary-red rounded-full' id='dashboard' src={dashboardIcon} /></Link></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Image className='bg-primary-red rounded-full' id='sign-out-button' onClick={context?.signOut} src={logOutIcon} /></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Image className='bg-primary-red rounded-full' id='delete-account-button' onClick={context?.deleteAccount} src={deleteAccountIcon} /></div>
		</div>
	</div>
}

export default Navbar