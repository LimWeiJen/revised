import Link from 'next/link';
import React, { useContext } from 'react'
import { GlobalContext } from '../context'

const Navbar = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	return <div>
		<Link href='/'><h1 id='home-button'>Website Logo</h1></Link>
		<div id='name-display'>{context?.username ? `Welcome Back, ${context.username}` : 'Please Sign In or Sign Up'}</div>
		<Link href='/dashboard'><h1 id='dashboard'>Dashboard Button</h1></Link>
		<button id='sign-out-button' onClick={context?.signOut}>Sign Out Button</button>
		<div id='delete-account-button' onClick={context?.deleteAccount}>Delete Account Button</div>
	</div>
}

export default Navbar