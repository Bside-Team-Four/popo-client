import Image from 'next/image';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import Category from '@/types/Category';
import { getCategoryColor, getCategoryIcon } from '@/utils/categoryHelper';
import { getCalAppWidth, getRatioSizePX } from '@/utils/sizeHelper';

type QuestionProps = {
  category: Category;
  content: string;
};

export default function Question({ category, content }:QuestionProps) {
  const { isDarkMode } = useDarkMode();

  const { src, alt } = getCategoryIcon(category);

  return (
    <Container>
      <IconContainer>
        <QuestionIcon
          src={src}
          width={72}
          height={72}
          alt={alt}
          priority
        />
      </IconContainer>
      <TextContainer>
        <QuestionText $isDarkMode={isDarkMode} $category={category}>
          {content}
        </QuestionText>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: end;
  height: ${getRatioSizePX(166)};
`;

const QuestionIcon = styled(Image)`
  transform: scale(${getCalAppWidth((w) => w / 420)});
  transform-origin: bottom;
`;

const TextContainer = styled.div`
  height: ${getRatioSizePX(182)};
  padding: 16px 0;
`;

const QuestionText = styled.span<{ $isDarkMode:boolean, $category: Category }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  transform: scale(${getCalAppWidth((w) => w / 420)});
  transform-origin: top center;
  color: ${getCategoryColor('fontColor')};
`;
