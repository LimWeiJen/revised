import React from 'react'
import { CardInterface } from '../interfaces'

const EmbedCard = ({card}: {card: CardInterface}) => {
	return <div>
		<div>{card.question}</div>
		<div>{card.answer}</div>
		<div>{card.box}</div>
	</div>
}

export default EmbedCard