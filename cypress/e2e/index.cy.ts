describe('Index Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('시작하기');
  });
});
