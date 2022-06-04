import React, { useContext } from 'react'
import EmbedCard from '../components/EmbedCard';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../context'

const Dashboard = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	return <div>
		<Navbar />
		<div className='grid place-items-center h-screen'>
			<div>
				<div className='flex justify-center'>
					<button className='mx-1 hover:cursor-pointer bg-dark-red text-white px-8 py-2 font-bold rounded-full' id='reset-button' onClick={context?.resetCard}>Reset All</button>
					<button className='mx-1 hover:cursor-pointer bg-dark-red text-white px-8 py-2 font-bold rounded-full' id='delete-all-button'>Delete All</button>
				</div>
				<div id='cards' className='grid grid-cols-2'>
					{context?.cards.map((card, index) => <div key={index}>
						<EmbedCard card={card} />
					</div>)}
				</div>
			</div>
		</div>
	</div>
}

export default Dashboard