import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'

const Login = () => {
	const context = useContext(GlobalContext)
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	return <div>
		<div>
			Name: <input id='name-input' type="text" onChange={(e) => setName(e.target.value)}/>
		</div>
		<div>
			Password: <input id='password-input' type="text" onChange={(e) => setPassword(e.target.value)} />
		</div>
		<div>
			<button id='sign-in-button' onClick={() => context?.signIn(name, password)}>Sign In</button>
			<button id='sign-up-button' onClick={() => context?.signUp(name, password)}>Sign Up</button>
		</div>
	</div>
}

export default Login