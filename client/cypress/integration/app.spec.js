describe('revised app', () => {
	beforeEach(() => cy.visit('http://localhost:3000'))

	it('should create a new account', () => {
		cy.get('#name-display').should('have.text', 'Please Sign In or Sign Up')
		cy.get('#name-input').type('John Doe')
		cy.get('#password-input').type('password')
		cy.get('#sign-up-button').click()
		cy.get('#name-display').should('have.text', 'Welcome Back, John Doe')
	})

	it('should sign out', () => {
		cy.get('#name-display').should('have.text', 'Welcome Back, John Doe')
		cy.get('#sign-out-button').click()
		cy.get('#name-display').should('have.text', 'Please Sign In or Sign Up')
	})

	it('should sign in incorrectly', () => {
		cy.get('#name-display').should('have.text', 'Please Sign In or Sign Up')
		cy.get('#name-input').type('a wrong name')
		cy.get('#password-input').type('a wrong password')
		cy.get('#sign-in-button').click()
		cy.on('window:alert', (t) => {
			expect(t).to.contains('Incorrect username or password')
		})
	})

	it('should sign in', () => {
		cy.get('#name-display').should('have.text', 'Please Sign In or Sign Up')
		cy.get('#name-input').type('John Doe')
		cy.get('#password-input').type('password')
		cy.get('#sign-in-button').click()
		cy.get('#name-display').should('have.text', 'Welcome Back, John Doe')
	})
	
	it('should create a new card', () => {
		cy.get('#card').should('not.exist')

		cy.get('#new-card-button').click()
		cy.get('#card').should('exist').children().should('have.length', 4)
		cy.get('#card>#question').type('lorem ipsum')
		cy.get('#card>#answer').type('dolor sit amet')
		cy.get('#card>#save-button').click()

		cy.get('#card>#question').should('have.text', 'lorem ipsum')
		cy.get('#card>#answer').should('have.text', 'dolor sit amet')
		cy.get('#card>#box').should('have.text', '1')
	})
	
	it('should answer the card correctly', () => {
		cy.get('#card>#box').should('have.text', '1')
		cy.get('#card>#answer').type('dolor sit amet{enter}')
		cy.get('#card>#box').should('have.text', '2')
	})
	
	it('should answer the card incorrectly', () => {
		cy.get('#card>#answer-reveal').should('not.exist')
		cy.get('#card>#box').should('have.text', '2')
		cy.get('#card>#answer').type('a wrong answer{enter}')
		cy.get('#card>#answer-reveal').should('exist').should('have.text', 'dolor sit amet')
		cy.get('#card>#box').should('have.text', '1')
	})
	
	it('should edit the card', () => {
		cy.get('#card>#tools-button').click()
		cy.get('#card>#tools-button').children().should('have.length', 2)
		cy.get('#card>#tools-button>#edit-button').click()

		cy.get('#card>#question').should('have.text', 'lorem ipsum')
		cy.get('#card>#answer').should('have.text', 'dolor sit amet')
		cy.get('#card>#box').should('have.text', '1')

		cy.get('#card>#question').type('ipsum lorem')
		cy.get('#card>#answer').type('dolor amet sit')
		cy.get('#card>#save-button').click()

		cy.get('#card>#question').should('have.text', 'ipsum lorem')
		cy.get('#card>#answer').should('have.text', 'dolor amet sit')
		cy.get('#card>#box').should('have.text', '1')
	})
	
	it('should create another card', () => {
		cy.get('#new-card-button').click()
		cy.get('#card').should('exist').children().should('have.length', 4)
		cy.get('#card>#question').type('lorem ipsum 2')
		cy.get('#card>#answer').type('dolor sit amet 2')
		cy.get('#card>#save-button').click()

		cy.get('#card>#question').should('have.text', 'lorem ipsum 2')
		cy.get('#card>#answer').should('have.text', 'dolor sit amet 2')
		cy.get('#card>#box').should('have.text', '1')
	})

	it('should check the dashboard', () => {
		cy.get('#dashboard').click()
		cy.url().should('include', '/dashboard')

		cy.get('#cards').children().should('have.length', 2)
	})
	
	it('should delete all cards', () => {
		cy.get('#home-button').click()
		cy.url().should('include', '/')

		cy.get('#card>#tools-button').click()
		cy.get('#card>#tools-button').children().should('have.length', 2)
		cy.get('#card>#tools-button>#delete-button').click()

		cy.get('#card>#tools-button').click()
		cy.get('#card>#tools-button').children().should('have.length', 2)
		cy.get('#card>#tools-button>#delete-button').click()

		cy.get('#card').should('not.exist')
	})
	
	it('should delete the account', () => {
		cy.get('#delete-account-button').click()
		cy.get(':nth-child(2) > button').click()
		cy.get('#name-display').should('have.text', 'Please Sign In or Sign Up')
	})
	
})