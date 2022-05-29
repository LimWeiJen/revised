import React, { useContext, useEffect } from 'react'
import EmbedCard from '../components/EmbedCard';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../context'

const Dashboard = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	return <div>
		<Navbar />
		<button id='reset-button' onClick={context?.resetCard}>Reset Button</button>
		<div id='cards'>
			{context?.cards.map((card, index) => <div key={index}>
				<EmbedCard card={card} />
			</div>)}
		</div>
	</div>
}

export default Dashboard