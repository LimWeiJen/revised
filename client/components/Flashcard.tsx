import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context'

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
		setAnswer('');
	}

	const handleKeyDown = async (e: React.KeyboardEvent) => {
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

	const createNewCard = () => {
		setQuestion('');
		setAnswer('');
		context?.createEmptyCard();
	}

	const editCard = () => {
		setAnswer(context?.currCard?.answer!);
		context?.setIsEditingCard(true);
	}

	return <div>
		{context?.currCard ? 
		<div className='flex flex-col justify-center p-5 lg:w-[40rem] h-[20rem]' id='card'>
			<div id='box' className='text-white text-2xl font-semibold'>Box #{context.currCard?.box}</div>
			<textarea className={`${context.isEditingCard ? 'text-black bg-dark-red' : 'text-white bg-red'} font-light p-1 outline-none border-none`} id='question' disabled={!context.isEditingCard} onChange={(e) => setQuestion(e.target.value)} value={question || context?.currCard?.question!} />
			<input className='bg-dark-red my-5 rounded-lg p-1 py-2 outline-none border-none text-white' id='answer' type='text' value={answer} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setAnswer(e.target.value)} />
			<div className='flex justify-evenly'>
				{context.isEditingCard ? <div id='delete-button' className='mx-1 transition-all hover:scale-110 hover:shadow-xl hover:cursor-pointer bg-dark-red px-8 py-2 font-bold rounded-full text-white' onClick={context.deleteCard}>Delete</div> : null}
				{context.isEditingCard ? 
				<button id='save-button' className='mx-1 hover:cursor-pointer transition-all hover:scale-110 hover:shadow-xl bg-white px-8 py-2 font-bold rounded-full' onClick={save}>Save</button> : 
				<button id='edit-button' className='mx-1 hover:cursor-pointer transition-all hover:scale-110 hover:shadow-xl bg-white px-8 py-2 font-bold rounded-full' onClick={editCard}>Edit</button>}
				<button id='new-card-button' className='mx-1 hover:cursor-pointer transition-all hover:scale-110 hover:shadow-xl bg-dark-red px-8 py-2 font-bold rounded-full text-white' onClick={createNewCard}>New</button>
			</div>
			<div className='text-white font-light opacity-80'>
				{ansReveal}
			</div>
		</div> : <div>
			<div className='mx-1 transition-all hover:scale-110 hover:shadow-xl hover:cursor-pointer bg-white px-8 py-2 font-bold rounded-full' id='new-card-button' onClick={createNewCard}>Let's start by creating a new flashcard!</div>
		</div>}
	</div>
}

export default FlashCard