import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'

const Login = () => {
	////// VARIABLES //////
	const context = useContext(GlobalContext)
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	return <div className='shadow-2xl rounded-lg flex flex-col p-5'>
		<table className='m-4'>
			<tbody className='lg:flex lg:flex-col'>
				<tr className='lg:flex justify-between mb-2'>
					<td>
						<label htmlFor='name'>Name:</label>
					</td>
					<td>
						<input className='text-black font-semibold rounded-lg outline-none border-none p-1' id='name-input' type="text" onChange={(e) => setName(e.target.value)}/>
					</td>
				</tr>
				<tr className='lg:flex justify-between mt-2'>
					<td>
						<label htmlFor='name'>Password:</label>
					</td>
					<td>
						<input className='text-black font-semibold rounded-lg outline-none border-none p-1' id='password-input' type="password" onChange={(e) => setPassword(e.target.value)} />
					</td>
				</tr>
			</tbody>
		</table>
		<div className='flex justify-between mx-4 my-2'>
			<button id='sign-in-button' className='lg:mr-2 rounded-lg font-semibold py-1 lg:px-20 transition-all hover:shadow-2xl hover:scale-110' onClick={() => context?.signIn(name, password)}>Sign In</button>
			<button id='sign-up-button' className='lg:ml-2 rounded-lg font-semibold py-1 lg:px-20 transition-all hover:shadow-2xl hover:scale-110' onClick={() => context?.signUp(name, password)}>Sign Up</button>
		</div>
	</div>
}

export default Login