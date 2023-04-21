import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { fireEvent, screen } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import { fireTimeEvent, renderWithProviders } from '@/utils/testHelper';

import TextField from './TextField';

const fixtureRegister = { ...testRegister, name: 'name' };

type RenderProps = {
  register?: UseFormRegisterReturn;
  value?: string;
  name?: string;
  error?: FieldError;
  message?: string;
  readOnly?: boolean;
};

describe('TextField', () => {
  const onClickReset = jest.fn();

  const renderTextField = ({
    register, value = '', error, message, readOnly = false, name,
  }:RenderProps) => renderWithProviders(
    <TextField
      register={register}
      value={value}
      label="이름"
      onClickReset={onClickReset}
      error={error}
      name={name}
      message={message}
      readOnly={readOnly}
    />,
  );

  context('message props가 주어지면', () => {
    it('message(도움말)을 렌더링한다.', () => {
      renderTextField({ register: fixtureRegister, message: '테스트 input입니다.' });

      expect(screen.getByText(/테스트 input입니다./)).toBeInTheDocument();
    });
  });

  context('error props가 주어지면', () => {
    it('error message를 렌더링한다.', () => {
      renderTextField({ register: fixtureRegister, error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByText(/테스트 error입니다./)).toBeInTheDocument();
    });

    it('Input Wrapper의 테두리 색상이 변경된다.', () => {
      renderTextField({ register: fixtureRegister, error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('border-color', '#F05C2E');
      expect(screen.getByTestId('input-label')).toHaveStyleRule('color', '#F05C2E');
    });

    it('error icon을 렌더링한다.', () => {
      renderTextField({ register: fixtureRegister, error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByAltText('error icon')).toBeInTheDocument();
    });
  });

  context('focus on 일때', () => {
    it('Input Wrapper의 테두리 색상이 변경된다.', () => {
      renderTextField({ register: fixtureRegister });

      fireEvent.focus(screen.getByTestId('name-test-input'));

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('border-color', '#000000');
    });
  });

  context('focus out 일때', () => {
    it('value값이 있으면 Input Wrapper의 background 색상을 변경한다.', async () => {
      renderTextField({ register: fixtureRegister, value: 'test' });

      await fireTimeEvent(() => fireEvent.blur(screen.getByTestId('name-test-input')), 300);

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('background-color', '#80808633');
    });
  });

  context('register가 없을 경우', () => {
    it('props로 넘겨준 name으로 설정된다.', () => {
      renderTextField({ name: 'test' });

      expect(screen.getByTestId('test-test-input')).toBeInTheDocument();
    });
  });
});
