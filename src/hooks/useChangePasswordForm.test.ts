import { useForm } from 'react-hook-form';

import { act, renderHook } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';
import { getTestForm } from '@/utils/testHelper';

import useChangePasswordForm, { ChangePasswordForm, ChangePasswordName } from './useChangePasswordForm';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@/lib/api/ApiService');

describe('useChangePasswordForm', () => {
  (apiService.passwordChange as jest.Mock).mockImplementation(
    () => ({
      code: 0,
      message: 'ok',
    }),
  );

  const {
    resetField, formState, setError, setFocus,
  } = getTestForm();

  const register = (name: string, options: any) => ({
    ...testRegister,
    name,
    validate: options?.validate,
  });

  const handleSubmit = (onValid: (data:ChangePasswordForm)=>void) => () => {
    onValid({
      currentPassword: (watch('currentPassword')),
      password: (watch('password')),
      passwordConfirm: (watch('passwordConfirm')),
    });
  };
  const watch = (name: ChangePasswordName) => name;

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockImplementation(() => ({
      register,
      watch,
      resetField,
      formState,
      setError,
      setFocus,
      handleSubmit,
    }));
  });

  const renderChangePasswordForm = () => renderHook(
    () => useChangePasswordForm(),
    {
      wrapper,
    },
  );

  it('submit test', async () => {
    const { result } = renderChangePasswordForm();

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.showPop).toBe(true);
  });

  it('closemodal test', async () => {
    const { result } = renderChangePasswordForm();

    await act(async () => {
      await result.current.closeModal();
    });

    expect(result.current.showPop).toBe(false);
  });

  describe('reset event', () => {
    it('certificationNumber', () => {
      const { result } = renderChangePasswordForm();

      result.current.formData.currentPassword.onClickReset();

      expect(resetField).toHaveBeenCalledWith('currentPassword');
      expect(setFocus).toHaveBeenCalledWith('currentPassword');
    });
    it('password', () => {
      const { result } = renderChangePasswordForm();

      result.current.formData.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
    it('passwordConfirm', () => {
      const { result } = renderChangePasswordForm();

      result.current.formData.passwordConfirm.onClickReset();

      expect(resetField).toHaveBeenCalledWith('passwordConfirm');
      expect(setFocus).toHaveBeenCalledWith('passwordConfirm');
    });
  });
});
