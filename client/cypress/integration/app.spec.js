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
	
	it('should handle card creation, edition and deletion', () => {
		for (let i = 0; i < 5; i++) {
			cy.get('#new-card-button').click();
			cy.get('#card').children().should('have.length', 5);
			cy.get('#box').should('have.text', 'Box #0');
			cy.get('#question').should('have.value', '');
			cy.get('#answer').should('have.value', '');
			cy.get('#question').type(`Question ${i}`);
			cy.get('#answer').type(`Answer ${i}`);
			cy.get('#save-button').click();
			cy.get('#question').should('be.disabled');
		}

		for (let i = 4; i >= 0; i--) {
			cy.get('#question').should('have.value', `Question ${i}`);
			cy.get(`#edit-button`).click();
			cy.get('#question').invoke('val', '');
			cy.get('#question').type(`Question ${5+i}`);
			cy.get('#save-button').click();
			cy.get('#question').should('be.disabled');
			cy.get('#question').should('have.value', `Question ${5+i}`);
			cy.get('#answer').type(`Answer ${i}{enter}`);
			if(i !== 0) cy.get('#question').should('have.value', `Question ${i-1}`);
		}
	})

	it('should check the dashboard', () => {
		cy.get('#dashboard').click()
		cy.url().should('include', '/dashboard')

		cy.get('#cards').children().should('have.length', 5)

		cy.get('#home-button').click()
		cy.url().should('include', '/')
	})

	it('should reset the cards', () => {
		cy.get('#dashboard').click()
		cy.url().should('include', '/dashboard')

		cy.get('#cards').children().should('have.length', 5)

		cy.get('#reset-button').click()

		cy.get('#cards').children().each(($el, index, $list) => {
			expect($el.find('#box').text()).to.equal('Box #0')
		})
	})
	
	it('should delete all cards', () => {
		for (let i = 0; i < 5; i++) {
			cy.get('#card>#edit-button').click()
			cy.get('#card>#delete-button').should('exist').click()
		}

		cy.get('#card').should('not.exist')
	})
})