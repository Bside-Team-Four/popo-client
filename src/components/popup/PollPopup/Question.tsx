import Image from 'next/image';

import styled from 'styled-components';

import { getRatioSizePX } from '@/utils/sizeHelper';

type QuestionProps = {
  category: string;
  content: string;
};

type CategoryIcon = {
  src: string;
  alt: string
};

//  TODO: category 확정 시 category 에 맞는 아이콘 변동
const getIcon = (category: string):CategoryIcon => ({
  src: '/images/category-romance.svg',
  alt: `${category} icon`,
});

export default function Question({ category, content }:QuestionProps) {
  const { src, alt } = getIcon(category);

  return (
    <Container>
      <QuestionIcon
        src={src}
        width={72}
        height={72}
        alt={alt}
        priority
      />
      <QuestionText>{content}</QuestionText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${getRatioSizePX(348)};
`;

const QuestionIcon = styled(Image)`
  margin-bottom: 16px;
`;

const QuestionText = styled.span`
  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  color: #F9ECF9;
`;
