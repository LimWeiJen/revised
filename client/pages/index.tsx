import type { NextPage } from 'next'
import { useContext } from 'react'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../context'

const Home: NextPage = () => {
	const context = useContext(GlobalContext);

	return <div>
		<Navbar />
		{context?.username ? null : <Login />}
	</div>
}

export default Home
