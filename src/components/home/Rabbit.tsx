import Image from 'next/image';

import styled from 'styled-components';

import RabbitState from '@/types/RabbitState';

type RabbitProps = {
  rabbitState: RabbitState
};

type RabbitInfo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const getRabbitInfo = (state:RabbitState):RabbitInfo => {
  if (state === 'sleep') {
    return {
      src: '/images/rabbit-sleep.svg',
      width: 263,
      height: 229,
      alt: 'sleep-rabbit-image',
    };
  }

  if (state === 'done') {
    return {
      src: '/images/rabbit-done.svg',
      width: 221,
      height: 221,
      alt: 'done-rabbit-image',
    };
  }

  return {
    src: '/images/rabbit-start.svg',
    width: 286,
    height: 221,
    alt: 'start-rabbit-image',
  };
};

export default function Rabbit({ rabbitState }: RabbitProps) {
  const {
    src, width, height, alt,
  } = getRabbitInfo(rabbitState);

  return (
    <Container>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
`;
