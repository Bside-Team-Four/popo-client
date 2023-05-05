import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { act, renderHook, waitFor } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';
import { getTestForm } from '@/utils/testHelper';

import useFindPasswordForm, { FindPasswordForm, FindPasswordName } from './useFindPasswordForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@/lib/api/ApiService');

describe('useFindPasswordForm', () => {
  const routerReplace = jest.fn();
  const routerPush = jest.fn();

  const {
    resetField, formState, setError, setFocus,
  } = getTestForm();

  const register = (name: string, options: any) => ({
    ...testRegister,
    name,
    validate: options?.validate,
  });

  const handleSubmit = (onValid: (data:FindPasswordForm)=>void) => () => {
    onValid({
      email: watch('email'),
      certificationNumber: watch('certificationNumber'),
      password: (watch('password')),
      passwordConfirm: (watch('passwordConfirm')),
    });
  };
  const watch = (name: FindPasswordName) => name;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
      replace: routerReplace,
    }));
    (useForm as jest.Mock).mockImplementation(() => ({
      register,
      watch,
      resetField,
      formState,
      setError,
      setFocus,
      handleSubmit,
    }));
    (apiService.passwordMissing as jest.Mock).mockImplementation(() => given.passwordMissing);
    (apiService.passwordMissingAuth as jest.Mock).mockImplementation(
      () => given.passwordMissingAuth,
    );
    (apiService.passwordReset as jest.Mock).mockImplementation(
      () => given.passwordReset,
    );
  });

  const renderFindPasswordFormHook = () => renderHook(
    () => useFindPasswordForm(),
    {
      wrapper,
    },
  );

  describe('step별 submit event test', () => {
    describe('step0', () => {
      it('step0 submit success', async () => {
        given('passwordMissing', () => ({ code: 0, value: { userId: 100 } }));
        const { result } = renderFindPasswordFormHook();

        expect(result.current.step).toEqual(0);

        await act(async () => {
          await result.current.onSubmit();
        });

        expect(result.current.popInfo.show).toEqual(false);
        expect(result.current.step).toEqual(1);
      });

      it('step0 submit failed', async () => {
        given('passwordMissing', () => Promise.reject());
        const { result } = renderFindPasswordFormHook();

        expect(result.current.step).toEqual(0);

        await act(async () => {
          await result.current.onSubmit();
        });

        expect(result.current.popInfo.show).toEqual(true);

        if (result.current.popInfo.onOk) {
          result.current.popInfo.onOk();
        }
        expect(routerPush).toHaveBeenCalledWith('/signup');

        act(() => {
          result.current.popInfo.onClose();
        });

        expect(result.current.popInfo.show).toEqual(false);
      });
    });
    describe('step1', () => {
      it('step1 submit success', async () => {
        given('passwordMissing', () => ({ code: 0, value: { userId: 100 } }));
        given('passwordMissingAuth', () => ({ code: 0, message: 'ok' }));

        const { result } = renderFindPasswordFormHook();

        await act(async () => {
          await result.current.onSubmit();
        });
        await waitFor(() => {
          result.current.onSubmit();
        });

        await waitFor(() => {
          expect(result.current.step).toEqual(2);
        });
      });

      it('step1 submit failed', async () => {
        given('passwordMissing', () => ({ code: 0, value: { userId: 100 } }));
        given('passwordMissingAuth', () => Promise.reject());

        const { result } = renderFindPasswordFormHook();

        await act(async () => {
          await result.current.onSubmit();
        });
        await waitFor(() => {
          result.current.onSubmit();
        });

        await waitFor(() => {
          expect(result.current.popInfo.show).toEqual(true);
        });

        act(() => {
          result.current.popInfo.onClose();
        });

        expect(result.current.popInfo.show).toEqual(false);
      });
    });

    describe('step2', () => {
      it('step2 submit success', async () => {
        given('passwordMissing', () => ({ code: 0, value: { userId: 100 } }));
        given('passwordMissingAuth', () => ({ code: 0, message: 'ok' }));
        given('passwordReset', () => ({ code: 0, message: 'ok' }));

        const { result } = renderFindPasswordFormHook();

        await act(async () => {
          await result.current.onSubmit();
        });

        await act(async () => {
          await result.current.onSubmit();
        });

        await act(async () => {
          await result.current.onSubmit();
        });

        await waitFor(() => {
          expect(result.current.popInfo.show).toEqual(true);
        });

        result.current.popInfo.onClose();

        expect(routerPush).toHaveBeenCalledWith('/signin');
      });

      it('step2 submit failed', async () => {
        given('passwordMissing', () => ({ code: 0, value: { userId: 100 } }));
        given('passwordMissingAuth', () => ({ code: 0, message: 'ok' }));
        given('passwordReset', () => Promise.reject());

        const { result } = renderFindPasswordFormHook();

        await act(async () => {
          await result.current.onSubmit();
        });

        await act(async () => {
          await result.current.onSubmit();
        });

        await act(async () => {
          await result.current.onSubmit();
        });

        await waitFor(() => {
          expect(result.current.popInfo.show).toEqual(true);
        });

        act(() => {
          result.current.popInfo.onClose();
        });

        expect(result.current.popInfo.show).toEqual(false);
      });
    });
  });

  context('reset event Test', () => {
    it('email', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.email.onClickReset();

      expect(resetField).toHaveBeenCalledWith('email');
      expect(setFocus).toHaveBeenCalledWith('email');
    });
    it('certificationNumber', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.certificationNumber.onClickReset();

      expect(resetField).toHaveBeenCalledWith('certificationNumber');
      expect(setFocus).toHaveBeenCalledWith('certificationNumber');
    });
    it('password', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
    it('passwordConfirm', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.passwordConfirm.onClickReset();

      expect(resetField).toHaveBeenCalledWith('passwordConfirm');
      expect(setFocus).toHaveBeenCalledWith('passwordConfirm');
    });
  });

  it('onResend Test', async () => {
    const { result } = renderFindPasswordFormHook();

    result.current.onResend();

    await waitFor(() => {
      expect(result.current.popInfo.show).toEqual(true);
    });

    act(() => {
      result.current.popInfo.onClose();
    });

    expect(result.current.popInfo.show).toEqual(false);
  });
});
