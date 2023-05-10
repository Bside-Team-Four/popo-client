import { UseFormRegister } from 'react-hook-form';

type DefaultUserField = 'email' | 'password' | 'currentPassword' | 'passwordConfirm' | 'certificationNumber';

const useGetDefaultRegister = (register: UseFormRegister<any>) => ({
  name,
  passwordValue,
}: { name: DefaultUserField
  passwordValue?: string | undefined }) => {
  if (name === 'email') {
    return register('email', {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
        message: '이메일 형식이 올바르지 않아요. 다시 입력해 주세요.',
      },
    });
  }

  if (name === 'password' || name === 'currentPassword') {
    return register(name, {
      pattern: {
        value: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
        message: '8~20자리 (영문, 숫자, 특수문자 중 2가지 이상 조합)',
      },
    });
  }

  if (name === 'passwordConfirm') {
    return register('passwordConfirm', {
      validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
    });
  }

  return register('certificationNumber', {
    maxLength: {
      value: 6,
      message: '인증번호는 6자리를 입력해주세요.',
    },
    minLength: {
      value: 6,
      message: '인증번호는 6자리를 입력해주세요.',
    },
  });
};

export default useGetDefaultRegister;
