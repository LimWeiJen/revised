import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'
import { CardInterface } from '../interfaces';

const FlashCard = () => {
	const context = useContext(GlobalContext);

	const [isEditing, setIsEditing] = useState(true);
	const [question, setQuestion] = useState(context?.currCard?.question!);
	const [answer, setAnswer] = useState('');

	const save = () => {
		const newCard: CardInterface = {
			id: context?.currCard?.id!,
			question: question,
			answer: answer,
			box: 0
		}
		context?.updateCard(context.currCard?.id!, newCard);
		setIsEditing(false);
	}

	return <div>{context?.currCard ? <div id='card'>
		{!isEditing ? <div id='tools-button'>Tools Button</div> : null}
		<input id='question' type='text' disabled={!isEditing} onChange={(e) => setQuestion(e.target.value)} value={question} />
		<input id='answer' type='text' placeholder={isEditing ? 'answer': ''} onChange={(e) => setAnswer(e.target.value)} />
		{isEditing ? <div id='save-button' onClick={save}>Save Button</div> : null}
		<div id='box'>{context.currCard?.box}</div>
	</div> : null}</div>
}

export default FlashCard