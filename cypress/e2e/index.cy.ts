describe('SignIn Page', () => {
  it('successfully loads', () => {
    cy.visit('/signin');

    cy.contains('로그인');
    cy.contains('이메일로 회원가입');
    cy.contains('비밀번호 찾기');
  });
});
