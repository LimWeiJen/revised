import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'
import { CardInterface } from '../interfaces';

const FlashCard = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	////// VARIABLES //////
	const [isEditing, setIsEditing] = useState(false);
	const [question, setQuestion] = useState(context?.currCard?.question!);
	const [answer, setAnswer] = useState('');
	const [ansReveal, setAnsReveal] = useState<React.ReactElement>();

	////// FUNCTIONS //////
	const save = () => {

		// update the question and the answer of the curr card
		context!.currCard!.question = question;
		context!.currCard!.answer = answer;
		context?.updateCard(context?.currCard!);
		setIsEditing(false);
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;

		// create a copy of the curr card
		const newCard = context?.currCard!;

		// add one to the box index of the new card (assuming the user answered the card correctly)
		newCard.box = context?.currCard?.box! === 4 ? 0 : context?.currCard?.box! + 1;

		// if the user does not answer the card correctly
		if (answer !== context?.currCard?.answer) {
			// reveal the actual answer
			setAnsReveal(<div id='answer-reveal'>{context?.currCard?.answer}</div>);

			// set the box index of the new card to 0
			newCard.box = 0;
		}
		context?.updateCard(newCard);
	}

	return <div>{context?.currCard ? <div id='card'>
		<input id='question' type='text' disabled={!isEditing} onChange={(e) => setQuestion(e.target.value)} value={question || context?.currCard?.question!} />
		<input id='answer' type='text' placeholder={isEditing ? context.currCard.answer: ''} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setAnswer(e.target.value)} />
		{isEditing ? <button id='delete-button' onClick={context.deleteCard}>Delete Button</button> : null}
		{isEditing ? 
		<button id='save-button' onClick={save}>Save Button</button> : 
		<button id='edit-button' onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel Editing' : 'Edit Button'}</button>}
		<div id='box'>{context.currCard?.box}</div>
		{ansReveal}
	</div> : null}</div>
}

export default FlashCard