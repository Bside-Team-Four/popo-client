describe('Index Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('POPO');
    cy.contains('WHO');
    cy.contains('FRIEND');
    cy.contains('PROFILE');
  });
});
