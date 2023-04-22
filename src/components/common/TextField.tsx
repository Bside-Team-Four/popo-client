import { useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

import _ from 'lodash/fp';
import styled, { css } from 'styled-components';

type TextFieldProps = {
  className?:string;
  register?: UseFormRegisterReturn;
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  message?: string;
  name?: string;
  readOnly?: boolean;
  error?: FieldError;
  onClickReset?: () => void;
  onClick?:()=>void;
};

export default function TextField({
  className, register, label,
  type = 'text', placeholder, message, name, readOnly = false,
  value, error, onClickReset, onClick = _.noop,
}: TextFieldProps) {
  const [focus, setFocus] = useState(false);

  const $error = !!error?.message;
  const $done = !focus && !!value;

  const fieldName = register ? register.name : name;

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
    <Container className={className} onClick={onClick}>
      <InputWrapper
        data-testid="input-wrapper"
        $focus={focus}
        $done={$done}
        $error={$error}
        $readOnly={readOnly}
      >
        <LabelText
          data-testid="input-label"
          htmlFor={fieldName}
          $error={$error}
        >
          {label}
        </LabelText>
        <Input
          data-testid={`${fieldName}-test-input`}
          id={fieldName}
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
          readOnly={readOnly}
          defaultValue={value}
          {...register}
          onBlur={onBlur}
        />
        <IconWrapper>
          {(focus && value && !readOnly) && (
            <Image
              onClick={onClickReset}
              src="/images/reset-icon.svg"
              width={14}
              height={14}
              alt={`${fieldName} reset icon`}
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

const InputWrapper = styled.div<{ $focus: boolean, $done: boolean, $error: boolean, $readOnly:boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, $focus, $readOnly }) => ($focus && !$readOnly ? theme.color.text.title01 : theme.color.componentBackground.bg04)};
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
