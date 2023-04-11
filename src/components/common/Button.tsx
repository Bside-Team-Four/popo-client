import styled from 'styled-components';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
};

const Button = styled.button.attrs<ButtonProps>((props) => ({ type: props.type ?? 'button' }))`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 218px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.text.title01};
  color: ${({ theme }) => theme.color.text.reverseText};
  &:disabled{
    background-color: ${({ theme }) => theme.color.componentBackground.bg04};
    color: ${({ theme }) => theme.color.gray02};
  };
`;

export default Button;
