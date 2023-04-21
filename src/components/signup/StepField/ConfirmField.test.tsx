import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import ConfirmField from './ConfirmField';

describe('ConfirmField', () => {
  const renderConfirmField = () => renderWithProviders(<ConfirmField
    name={signupField.name}
    year={signupField.year}
    grade={signupField.grade}
    gender={{ value: given.gender, onChangeGender: jest.fn() }}
    school={{ value: { schoolId: 1, name: given.school }, onChangeSchool: jest.fn() }}
  />);

  it('회원가입할 동안 입력했던 내용을 화면에 보여준다.', () => {
    given('gender', () => 'male');
    given('school', () => '포포고등학교');

    renderConfirmField();

    expect(screen.getByDisplayValue('popo')).toBeInTheDocument();
    expect(screen.getByDisplayValue(1997)).toBeInTheDocument();
    expect(screen.getByDisplayValue('남성')).toBeInTheDocument();
    expect(screen.getByDisplayValue('포포고등학교')).toBeInTheDocument();
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
  });

  it('회원가입할 동안 입력했던 내용을 화면에 보여준다.(성별: 여성, 학교가 선택되어 있지 않을 경우)', () => {
    given('gender', () => 'female');
    given('school', () => '');

    renderConfirmField();

    expect(screen.getByDisplayValue('popo')).toBeInTheDocument();
    expect(screen.getByDisplayValue(1997)).toBeInTheDocument();
    expect(screen.getByDisplayValue('여성')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
  });
});
