import React from 'react'
import { CardInterface } from '../interfaces'

const EmbedCard = ({card}: {card: CardInterface}) => {
	return <div className='m-5'>
		<div className='text-white font-bold'>Box #{card.box}</div>
		<div className='text-white'>{card.question}</div>
		<div className='bg-dark-red text-white p-3 rounded-lg'>{card.answer}</div>
	</div>
}

export default EmbedCard