import { FieldError } from 'react-hook-form';

import { fireEvent, screen } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import { fireTimeEvent, renderWithProviders } from '@/utils/testHelper';

import TextField from './TextField';

const fixturesItem = {
  register: { ...testRegister, name: 'name' },
  label: '이름',
  type: 'text',
};

type RenderProps = {
  value?: string;
  error?: FieldError;
  message?: string;
};

describe('TextField', () => {
  const onClickReset = jest.fn();

  const renderTextField = ({ value = '', error, message }:RenderProps) => renderWithProviders(
    <TextField
      register={fixturesItem.register}
      value={value}
      label={fixturesItem.label}
      type={fixturesItem.type}
      onClickReset={onClickReset}
      error={error}
      message={message}
    />,
  );

  context('message props가 주어지면', () => {
    it('message(도움말)을 렌더링한다.', () => {
      renderTextField({ message: '테스트 input입니다.' });

      expect(screen.getByText(/테스트 input입니다./)).toBeInTheDocument();
    });
  });

  context('error props가 주어지면', () => {
    it('error message를 렌더링한다.', () => {
      renderTextField({ error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByText(/테스트 error입니다./)).toBeInTheDocument();
    });

    it('Input Wrapper의 테두리 색상이 변경된다.', () => {
      renderTextField({ error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('border-color', '#F05C2E');
      expect(screen.getByTestId('input-label')).toHaveStyleRule('color', '#F05C2E');
    });

    it('error icon을 렌더링한다.', () => {
      renderTextField({ error: { type: '', message: '테스트 error입니다.' } });

      expect(screen.getByAltText('error icon')).toBeInTheDocument();
    });
  });

  context('focus on 일때', () => {
    it('Input Wrapper의 테두리 색상이 변경된다.', () => {
      renderTextField({});

      fireEvent.focus(screen.getByTestId('name-test-input'));

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('border-color', '#000000');
    });
  });

  context('focus out 일때', () => {
    it('value값이 있으면 Input Wrapper의 background 색상을 변경한다.', async () => {
      renderTextField({ value: 'test' });

      await fireTimeEvent(() => fireEvent.blur(screen.getByTestId('name-test-input')), 300);

      expect(screen.getByTestId('input-wrapper')).toHaveStyleRule('background-color', '#80808633');
    });
  });
});
