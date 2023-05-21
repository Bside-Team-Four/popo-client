import { motion, Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

type SpinnerType = 'normal' | 'pop';

type SpinnerProps = {
  type: SpinnerType
};

export default function Spinner({ type }:SpinnerProps) {
  return (
    <Container data-testid="spinner-container" type={type}>
      <AnimationContainer
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <SpinnerWrapper variants={spinnerVariants} animate="animate" exit="exit">
          <SpinnerItem />
        </SpinnerWrapper>
      </AnimationContainer>
      {type === 'pop' && <LoadingText>Loading...</LoadingText>}
    </Container>
  );
}

const Container = styled.div<{ type:SpinnerType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ type, theme }) => type === 'pop' && css`
    width: 150px;
    height: 150px;
    background-color: ${theme.color.componentBackground.boxShadow};
  `};
`;

const AnimationContainer = styled(motion.div)`
  width: 100px;
  height: 100px;
  padding: 14px;
`;

const SpinnerWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const SpinnerItem = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.text.title01};
`;

const LoadingText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.title02}; ;
`;

const defaultEasing = [0.6, -0.05, 0.01, 0.99];

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 1, ease: 'easeInOut', repeat: Infinity },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};
