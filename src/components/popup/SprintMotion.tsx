import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { getAppWidth, useAppHeight } from '@/utils/sizeHelper';

export default function SprintMotion({ children }: PropsWithChildren) {
  const appHeight = useAppHeight();

  return (
    <Wrapper
      key="modal"
      initial={{ y: appHeight }}
      animate={{ y: 0 }}
      exit={{ y: appHeight }}
      transition={{
        type: 'spring',
        duration: 0.5,
      }}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${getAppWidth}px;
  height: 100%;
  top: 0;
`;
