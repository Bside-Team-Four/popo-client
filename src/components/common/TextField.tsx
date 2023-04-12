import { useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

import styled, { css } from 'styled-components';

type TextFieldProps = {
  className?:string;
  register: UseFormRegisterReturn;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  message?: string;
  error?: FieldError;
  onClickReset: () => void;
};

export default function TextField({
  className, register, label,
  type, placeholder, message,
  value, error, onClickReset,
}: TextFieldProps) {
  const [focus, setFocus] = useState(false);

  const $error = !!error?.message;
  const $done = !focus && !!value;

  const { name } = register;

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setFocus(false);
    }, 150);
  };

  useEffect(() => {
    if (value) {
      setFocus(true);
    }
  }, [value]);

  return (
    <Container className={className}>
      <InputWrapper
        data-testid="input-wrapper"
        $focus={focus}
        $done={$done}
        $error={$error}
      >
        <LabelText
          data-testid="input-label"
          htmlFor={name}
          $error={$error}
        >
          {label}
        </LabelText>
        <Input
          data-testid={`${name}-test-input`}
          id={name}
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
          {...register}
          onBlur={onBlur}
        />
        <IconWrapper>
          {(focus && value) && (
            <Image
              onClick={onClickReset}
              src="/images/reset-icon.svg"
              width={14}
              height={14}
              alt={`${name} reset icon`}
              priority
            />
          )}
          {($error) && (
          <Image
            src="/images/error-icon.svg"
            width={14}
            height={14}
            alt="error icon"
            priority
          />
          )}
        </IconWrapper>
      </InputWrapper>
      {($error) ? <ErrorMessage>{error.message}</ErrorMessage>
        : (message) && <HelpMessage>{message}</HelpMessage>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
`;

const InputWrapper = styled.div<{ $focus: boolean, $done: boolean, $error: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, $focus }) => ($focus ? theme.color.text.title01 : theme.color.componentBackground.bg04)};
  border-radius: 16px;
  padding: 0 12px;
  background-color: ${({ theme, $done }) => ($done ? theme.color.componentBackground.bg04 : 'transparent')};
  ${({ $error }) => $error && css`
    border-color: ${({ theme }) => theme.color.error};
  `};
`;

const LabelText = styled.label<{ $error: boolean }>`
  font-size: 10px;
  line-height: 16px;
  color: ${({ $error, theme }) => ($error ? theme.color.error : theme.color.text.subTitle01)};
`;

const Input = styled.input`
  border: none;
  border-radius: 0;
  width: 100%;
  outline: none;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text.title01};
  background-color: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray03};
  };
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  :nth-child(2){
    margin-left: 12px;
  };
`;

const MessageStyle = css`
  margin-top:2px;
  padding-left: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

const HelpMessage = styled.div`
  ${MessageStyle};
  color: ${({ theme }) => theme.color.text.subTitle02};
`;

const ErrorMessage = styled.div`
  ${MessageStyle};
  color: ${({ theme }) => theme.color.error};
`;
