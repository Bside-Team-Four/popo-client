describe('Index Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('PoPo');
    cy.contains('알림');
    cy.contains('친구추가');
    cy.contains('프로필');
  });
});
