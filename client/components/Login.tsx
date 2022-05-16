import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'

const Login = () => {
	const context = useContext(GlobalContext)
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return <div>
		<div>
			Name: <input id='name-input' type="text" onChange={(e) => setUsername(e.target.value)}/>
		</div>
		<div>
			Password: <input id='password-input' type="text" onChange={(e) => setPassword(e.target.value)} />
		</div>
		<div>
			<button id='sign-in-button' onClick={() => context?.signIn(username, password)}>Sign In</button>
			<button id='sign-up-button' onClick={() => context?.signUp(username, password)}>Sign Up</button>
		</div>
	</div>
}

export default Login