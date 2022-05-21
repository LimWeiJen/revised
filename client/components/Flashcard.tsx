import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'
import { CardInterface } from '../interfaces';

const FlashCard = () => {
	const context = useContext(GlobalContext);

	const [isEditing, setIsEditing] = useState(false);
	const [question, setQuestion] = useState(context?.currCard?.question!);
	const [answer, setAnswer] = useState('');

	const save = () => {
		const newCard: CardInterface = {
			_id: context?.currCard?._id!,
			_type: 'card',
			_key: context?.currCard?._id!,
			question: question,
			answer: answer,
			box: 0
		}
		context?.updateCard(newCard);
		setIsEditing(false);
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && answer === context?.currCard?.answer) {
			const newCard: CardInterface = {
				_id: context.currCard._id,
				_type: 'card',
				_key: context.currCard._id,
				question: context.currCard.question,
				answer: answer,
				box: context.currCard.box + 1
			}
			context?.updateCard(newCard);
		}
	}

	return <div>{context?.currCard ? <div id='card'>
		<input id='question' type='text' disabled={!isEditing} onChange={(e) => setQuestion(e.target.value)} value={question || context?.currCard?.question!} />
		<input id='answer' type='text' placeholder={isEditing ? 'answer': ''} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setAnswer(e.target.value)} />
		{isEditing ? 
		<button id='save-button' onClick={save}>Save Button</button> : 
		<button id='edit-button' onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel Editing' : 'Edit Button'}</button>}
		<div id='box'>{context.currCard?.box}</div>
	</div> : null}</div>
}

export default FlashCard