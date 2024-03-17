import testRegister from '@/fixtures/testRegister';

const signupField = {
  tosAgree: { value: true, onChangeTosAgree: jest.fn() },
  year: { register: { ...testRegister, name: 'year' }, value: 1997, onClickReset: jest.fn() },
  grade: { register: { ...testRegister, name: 'grade' }, value: 1, onClickReset: jest.fn() },
  password: { register: { ...testRegister, name: 'password' }, value: '1234', onClickReset: jest.fn() },
  passwordConfirm: { register: { ...testRegister, name: 'passwordConfirm' }, value: '1234', onClickReset: jest.fn() },
  name: { register: { ...testRegister, name: 'name' }, value: 'popo', onClickReset: jest.fn() },
  email: { register: { ...testRegister, name: 'email' }, value: 'popo@gmail.com', onClickReset: jest.fn() },
  certificationNumber: { register: { ...testRegister, name: 'certificationNumber' }, value: '', onClickReset: jest.fn() },
  gender: { value: null, onChangeGender: jest.fn() },
  school: { value: { id: 10, name: '포포고등학교', address: '서울' }, onChangeSchool: jest.fn() },
};

export default signupField;
