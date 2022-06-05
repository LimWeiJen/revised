describe('revised app', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
		cy.get('#name-input').type('John Doe')
		cy.get('#password-input').type('password')
		cy.get('#sign-in-button').click()
		cy.get('#name-display').should('have.text', 'John Doe')
		cy.get('#name-input').should('not.exist')
	})

	it('should sign out', () => {
		cy.get('#name-display').should('have.text', 'John Doe')
		cy.get('#sign-out-button').click()
		cy.get('#name-input').should('exist')
	})

	it('should sign in incorrectly', () => {
		cy.get('#name-display').should('have.text', 'John Doe')
		cy.get('#sign-out-button').click()
		cy.get('#name-input').should('exist')

		cy.get('#name-input').type('a wrong name')
		cy.get('#password-input').type('a wrong password')
		cy.get('#sign-in-button').click()
		cy.on('window:alert', (t) => {
			expect(t).to.contains('Incorrect username or password')
		})
	})
	
	it('should create a new card', () => {
		cy.get('#card').should('not.exist')

		cy.get('#new-card-button').click()
		cy.get('#card').should('exist').children().should('have.length', 5)

		cy.get('#question').type('lorem ipsum')
		cy.get('#answer').type('dolor sit amet')
		cy.get('#save-button').click()

		cy.get('#question').should('have.value', 'lorem ipsum')
		cy.get('#answer').should('have.value', 'dolor sit amet')
		cy.get('#box').should('have.text', 'Box #0')
	})
	
	it('should answer the card correctly', () => {
		cy.get('#box').should('have.text', 'Box #0')
		cy.get('#answer').type('dolor sit amet{enter}')
		cy.get('#box').should('have.text', 'Box #1')
	})
	
	it('should answer the card incorrectly', () => {
		cy.get('#answer-reveal').should('not.exist')
		cy.get('#box').should('have.text', 'Box #1')
		cy.get('#answer').type('a wrong answer{enter}')
		cy.get('#answer-reveal').should('exist').should('have.text', 'dolor sit amet')
		cy.get('#box').should('have.text', 'Box #0')
	})
	
	it('should edit the card', () => {
		cy.get('#edit-button').click()

		cy.get('#question').should('have.value', 'lorem ipsum')
		cy.get('#answer').should('have.attr', 'placeholder', 'dolor sit amet')
		cy.get('#box').should('have.text', 'Box #0')

		cy.get('#question').invoke('val', '')
		cy.get('#question').type('ipsum lorem')
		cy.get('#answer').type('dolor amet sit')
		cy.get('#save-button').click()

		cy.get('#question').should('have.value', 'ipsum lorem')
		cy.get('#answer').should('have.value', 'dolor amet sit')
		cy.get('#box').should('have.text', 'Box #0')
	})
	
	it('should create another card', () => {
		cy.get('#new-card-button').click()
		cy.get('#card').should('exist').children().should('have.length', 5)
		cy.get('#question').should('have.value', '')
		cy.get('#answer').should('have.value', '')
		cy.get('#box').should('have.text', 'Box #0')
		
		cy.get('#question').type('lorem ipsum 2')
		cy.get('#answer').type('dolor sit amet 2')
		cy.get('#save-button').click()

		cy.get('#question').should('have.value', 'lorem ipsum 2')
		cy.get('#answer').should('have.value', 'dolor sit amet 2')
		cy.get('#box').should('have.text', 'Box #0')
	})

	it('should check the dashboard', () => {
		cy.get('#dashboard').click()
		cy.url().should('include', '/dashboard')

		cy.get('#cards').children().should('have.length', 2)

		cy.get('#home-button').click()
		cy.url().should('include', '/')
	})

	it('should reset the cards', () => {
		cy.get('#dashboard').click()
		cy.url().should('include', '/dashboard')

		cy.get('#cards').children().should('have.length', 2)

		cy.get('#reset-button').click()

		cy.get('#cards').children().each(($el, index, $list) => {
			expect($el.find('#box').text()).to.equal('Box #0')
		})
	})
	
	it('should delete all cards', () => {
		for (let i = 0; i < 2; i++) {
			cy.get('#card>#edit-button').click()
			cy.get('#card>#delete-button').should('exist').click()
		}

		cy.get('#card').should('not.exist')
	})
	
	it('should delete the account', () => {
		cy.get('#delete-account-button').click()
	})
})