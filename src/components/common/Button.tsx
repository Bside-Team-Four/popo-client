import styled from 'styled-components';

import { h1Font } from '@/styles/fontStyles';

export default function Button() {
  return (
    <Container>PoPo</Container>
  );
}

const Container = styled.div`
  ${h1Font};
  color: ${({ theme }) => theme.color.main};
`;
