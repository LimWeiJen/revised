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

	return <div className='flex justify-center p-5 absolute w-screen'>
		<div>
			<div id='name-display' className='text-white flex flex-col justify-center text-xl'>{context?.username}</div>
			<div id='gmail-display' className='text-white flex flex-col justify-center font-thin opacity-80 text-sm'>johndoe@gmail.com</div>
		</div>
		<div className='flex'>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Link href='/dashboard'><Image className='bg-primary-red rounded-full' id='dashboard' src={dashboardIcon} /></Link></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Image className='bg-primary-red rounded-full' id='sign-out-button' onClick={context?.signOut} src={logOutIcon} /></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Image className='bg-primary-red rounded-full' id='delete-account-button' onClick={context?.deleteAccount} src={deleteAccountIcon} /></div>
			<div className='mx-1 transition-all hover:scale-110 hover:cursor-pointer'><Link href='/'><Image className='bg-primary-red rounded-full' id='dashboard' src={websiteLogo} /></Link></div>
		</div>
	</div>
}

export default Navbar