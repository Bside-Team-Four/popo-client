import Image from 'next/image';

import styled from 'styled-components';

import RabbitState from '@/types/RabbitState';
import { useGetRatioSize } from '@/utils/sizeHelper';

type RabbitProps = {
  rabbitState: RabbitState
};

type RabbitInfo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const getRabbitInfo = (state:RabbitState, getRatioSize: (px: number) => number):RabbitInfo => {
  if (state === 'sleep') {
    return {
      src: '/images/rabbit-sleep.svg',
      width: getRatioSize(263),
      height: getRatioSize(229),
      alt: 'sleep-rabbit-image',
    };
  }

  if (state === 'done') {
    return {
      src: '/images/rabbit-done.svg',
      width: getRatioSize(221),
      height: getRatioSize(221),
      alt: 'done-rabbit-image',
    };
  }

  return {
    src: '/images/rabbit-start.svg',
    width: getRatioSize(286),
    height: getRatioSize(221),
    alt: 'start-rabbit-image',
  };
};

export default function Rabbit({ rabbitState }: RabbitProps) {
  const getRatioSize = useGetRatioSize();

  const {
    src, width, height, alt,
  } = getRabbitInfo(rabbitState, getRatioSize);

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
