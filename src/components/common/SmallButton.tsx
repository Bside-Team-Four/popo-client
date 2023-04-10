import styled from 'styled-components';

const SmallButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20;
  border-radius: 10px;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.componentBackground.bg01};
  color: ${({ theme }) => theme.color.primary};
`;

export default SmallButton;
