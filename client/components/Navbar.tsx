import Link from 'next/link';
import React, { useContext } from 'react'
import { GlobalContext } from '../context'

const Navbar = () => {
	const context = useContext(GlobalContext);

	return <div>
		<div id='home-button'>Website Logo</div>
		<div id='name-display'>{context?.username ? `Welcome Back, ${context.username}` : 'Please Sign In or Sign Up'}</div>
		<Link href='/dashboard' id='dashboard'>Dashboard Button</Link>
		<button id='sign-out-button' onClick={context?.signOut}>Sign Out Button</button>
		<div id='delete-account-button'>Delete Account Button</div>
	</div>
}

export default Navbar