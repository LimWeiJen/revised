import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context'

const Home: NextPage = () => {
	const context = useContext(GlobalContext);

	useEffect(() => {
		if (localStorage.getItem('id') !== null) {
			context?.signIn(localStorage.getItem('username')!, localStorage.getItem('password')!)
		}
	}, [])

	return <div>
		<Navbar />
		{context?.username ? <div>
			
		</div> : <Login />}
	</div>
}

export default Home
