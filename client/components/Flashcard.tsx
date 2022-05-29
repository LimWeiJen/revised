import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'
import deleteIcon from '../public/icons/delete_FILL0_wght400_GRAD0_opsz48.svg'
import saveIcon from '../public/icons/save_FILL0_wght400_GRAD0_opsz48.svg'
import editIcon from '../public/icons/edit_note_FILL1_wght400_GRAD0_opsz48.svg'
import Image from 'next/image'

const FlashCard = () => {
	////// CONTEXT //////
	const context = useContext(GlobalContext);

	////// VARIABLES //////
	const [question, setQuestion] = useState(context?.currCard?.question!);
	const [answer, setAnswer] = useState('');
	const [ansReveal, setAnsReveal] = useState<React.ReactElement>();

	////// FUNCTIONS //////
	const save = () => {

		// update the question and the answer of the curr card
		context!.currCard!.question = question;
		context!.currCard!.answer = answer;
		context?.updateCard(context?.currCard!);
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

	return <div>
		{context?.currCard ? 
		<div className='bg-primary-red shadow-2xl rounded-lg flex flex-col justify-center p-5 w-[40rem] h-[20rem]' id='card'>
			<textarea className={`${context.isEditingCard ? 'bg-secondary-red text-primary-red' : 'bg-primary-red text-primary-white'}  p-1 outline-none border-none`} id='question' disabled={!context.isEditingCard} onChange={(e) => setQuestion(e.target.value)} value={question || context?.currCard?.question!} />
			<input className='bg-secondary-red text-primary-red rounded-lg p-1 outline-none border-none' id='answer' type='text' placeholder={context.isEditingCard ? context.currCard.answer: ''} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setAnswer(e.target.value)} />
			{context.isEditingCard ? <div className='mx-1 hover:cursor-pointer'><Image width={30} height={30} className='rounded-full transition-all hover:bg-secondary-red' src={deleteIcon} id='delete-button' onClick={context.deleteCard} /></div> : null}
			{context.isEditingCard ? 
			<div className='mx-1 hover:cursor-pointer'><Image src={saveIcon} id='save-button' width={30} height={30} className='rounded-full transition-all hover:bg-secondary-red' onClick={save} /></div> : 
			<div className='mx-1 hover:cursor-pointer'><Image src={editIcon} id='edit-button' width={30} height={30} className='rounded-full transition-all hover:bg-secondary-red' onClick={() => context.setIsEditingCard(!context.isEditingCard)} /></div>}
			<div id='box' className='text-primary-white'>{context.currCard?.box}</div>
			{ansReveal}
		</div> : null}
	</div>
}

export default FlashCard