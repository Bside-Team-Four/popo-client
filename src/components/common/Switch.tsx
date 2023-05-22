import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type SwitchProps = {
  title: string;
  isOn: boolean;
  onClick: () =>void;
};

export default function Switch({ title, isOn, onClick }:SwitchProps) {
  return (
    <Container data-testid={`${title} switch`} $isOn={isOn} onClick={onClick} layout>
      <Circle layout />
    </Container>
  );
}

const Container = styled(motion.div)<{ $isOn:boolean }>`
  display: flex;
  width: 51px;
  height: 31px;
  padding: 1px;
  border-radius: 100px;
  cursor: pointer;
  background-color: #E6E6E7;
  justify-content: flex-start;
  ${({ $isOn, theme }) => $isOn && css`
    justify-content: flex-end;
    background-color: ${theme.color.primary};
  `}
`;

const Circle = styled(motion.div)`
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 200px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
`;
