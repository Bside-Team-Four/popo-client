import styled from 'styled-components';

const SignTitle = styled.div`
  display: flex;
  align-items: center;
  height: 132px;
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  color: ${({ theme }) => theme.color.text.title01};;
  white-space: pre-wrap;
`;

export default SignTitle;
