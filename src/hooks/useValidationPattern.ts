const useValidationPattern = () => {
  const emailPattern = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    message: '이메일 형식이 아닙니다.',
  };
  const passwordPattern = {
    value: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
    message: '8~20자리 (영문, 숫자, 특수문자 중 2가지 이상 조합)',
  };

  return { emailPattern, passwordPattern };
};

export default useValidationPattern;
