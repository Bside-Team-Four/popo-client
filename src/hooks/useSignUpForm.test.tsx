import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { act, renderHook, waitFor } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import useSignUpForm, { SignUpForm, SignUpName } from '@/hooks/useSignUpForm';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';
import { getTestForm } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@/lib/api/ApiService');

describe('useSignUpForm', () => {
  const routerReplace = jest.fn();

  const {
    resetField, formState, setError, setFocus,
  } = getTestForm();

  const register = (name: string, options: any) => ({
    ...testRegister,
    name,
    validate: options?.validate,
  });

  const handleSubmit = (onValid: (data:SignUpForm)=>void) => () => {
    onValid({
      email: watch('email'),
      certificationNumber: watch('certificationNumber'),
      password: watch('password'),
      passwordConfirm: watch('passwordConfirm'),
      name: watch('name'),
      year: given.year,
      grade: given.grade,
    });
  };
  const watch = (name: SignUpName) => name;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
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
    (apiService.signUpSendEmail as jest.Mock).mockImplementation(() => given.signUpSendEmail);
    (apiService.signUpAuthEmail as jest.Mock).mockImplementation(
      () => given.signUpAuthEmail,
    );
  });

  const renderSignUpFormHook = () => renderHook(
    () => useSignUpForm(),
    { wrapper },
  );

  // describe('passwordConfirm Validation Test', () => {
  //   it('password === passwordConfirm', () => {
  //     given('password', () => '12345678');
  //
  //     const { result } = renderSignUpFormHook();
  //
  //     const { passwordConfirm } = result.current.formData;
  //
  //     const validate = _.get('register.validate')(passwordConfirm);
  //
  //     expect(validate('12345678')).toBe(true);
  //   });
  //   it('password !== passwordConfirm', () => {
  //     given('password', () => '12345678');
  //
  //     const { result } = renderSignUpFormHook();
  //
  //     const { passwordConfirm } = result.current.formData;
  //
  //     const validate = _.get('register.validate')(passwordConfirm);
  //
  //     expect(validate('123456789')).toBe('비밀번호가 일치하지 않습니다.');
  //   });
  // });
  describe('STEP 별 Submit TEST', () => {
    describe('step0', () => {
      context('이메일이 유효하지 않은 경우', () => {
        given('signUpSendEmail', () => Promise.reject());
        it('실패 팝업을 띄운다.', async () => {
          const { result } = renderSignUpFormHook();

          await act(async () => {
            await result.current.onSubmit();
          });

          expect(result.current.popInfo.show).toEqual(true);

          act(() => {
            result.current.popInfo.onClose();
          });

          expect(result.current.popInfo.show).toEqual(false);
        });
      });
      context('이메일이 유효한 경우', () => {
        given('signUpSendEmail', () => ({
          code: 0,
          message: 'ok',
        }));
        it('인증번호를 전송하고 다음 Step으로 이동한다.', async () => {
          const { result } = renderSignUpFormHook();

          await act(async () => {
            await result.current.onSubmit();
          });

          expect(result.current.step).toEqual(1);
        });
      });
    });

    describe('step1', () => {
      given('signUpSendEmail', () => ({
        code: 0,
        message: 'ok',
      }));
      context('인증번호가 틀릴 경우', () => {
        given('signUpAuthEmail', () => Promise.reject());
        it('실패 팝업을 띄운다.', async () => {
          const { result } = renderSignUpFormHook();

          await act(async () => {
            await result.current.onSubmit();
          });

          await act(async () => {
            await result.current.onSubmit();
          });

          expect(result.current.popInfo.show).toEqual(true);

          act(() => {
            result.current.popInfo.onClose();
          });

          expect(result.current.popInfo.show).toEqual(false);
        });
      });

      context('인증번호가 일치할 경우', () => {
        given('signUpAuthEmail', () => ({
          code: 0,
          message: 'ok',
        }));
        it('인증번호를 전송하고 다음 Step으로 이동한다.', async () => {
          const { result } = renderSignUpFormHook();

          await act(async () => {
            await result.current.onSubmit();
          });

          await act(async () => {
            await result.current.onSubmit();
          });

          expect(result.current.step).toEqual(2);
        });
      });
    });
  });

  describe('reset event Test', () => {
    it('email', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.email.onClickReset();

      expect(resetField).toHaveBeenCalledWith('email');
      expect(setFocus).toHaveBeenCalledWith('email');
    });
    it('certificationNumber', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.certificationNumber.onClickReset();

      expect(resetField).toHaveBeenCalledWith('certificationNumber');
      expect(setFocus).toHaveBeenCalledWith('certificationNumber');
    });
    it('password', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
    it('passwordConfirm', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.passwordConfirm.onClickReset();

      expect(resetField).toHaveBeenCalledWith('passwordConfirm');
      expect(setFocus).toHaveBeenCalledWith('passwordConfirm');
    });
    it('name', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.name.onClickReset();

      expect(resetField).toHaveBeenCalledWith('name');
      expect(setFocus).toHaveBeenCalledWith('name');
    });
    it('year', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.year.onClickReset();

      expect(resetField).toHaveBeenCalledWith('year');
      expect(setFocus).toHaveBeenCalledWith('year');
    });
    it('grade', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.grade.onClickReset();

      expect(resetField).toHaveBeenCalledWith('grade');
      expect(setFocus).toHaveBeenCalledWith('grade');
    });
  });

  it('gender change event', () => {
    const { result } = renderSignUpFormHook();

    act(() => {
      result.current.formData.gender.onChangeGender('male');
    });

    expect(result.current.formData.gender.value).toBe('male');
  });

  it('school.ts change event', () => {
    const { result } = renderSignUpFormHook();

    act(() => {
      result.current.formData.school.onChangeSchool({ id: 1, name: '포포고등학교', address: '서울' });
    });

    expect(result.current.formData.school.value).toStrictEqual({ id: 1, name: '포포고등학교', address: '서울' });
  });

  it('onResend Test', async () => {
    const { result } = renderSignUpFormHook();

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
