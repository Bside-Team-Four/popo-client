import Image from 'next/image';

import styled, { css } from 'styled-components';

import Gender from '@/types/Gender';

type GenderSelectorProps = {
  value: Gender | null;
  onChangeGender: (g: Gender) => void;
};

export default function GenderSelector({ value, onChangeGender }: GenderSelectorProps) {
  const isSelect = value !== null;

  return (
    <Container>
      <SelectorWrapper>
        <SelectBox
          data-testid="man-box"
          $isSelect={isSelect}
          $isOn={value === 'MALE'}
          onClick={() => onChangeGender('MALE')}
        >
          <GenderTitle>남성</GenderTitle>
          <ManIcon />
        </SelectBox>
        <SelectBox
          data-testid="woman-box"
          $isSelect={isSelect}
          $isOn={value === 'FEMALE'}
          onClick={() => onChangeGender('FEMALE')}
        >
          <GenderTitle>여성</GenderTitle>
          <WomanIcon />
        </SelectBox>
      </SelectorWrapper>
      <HelpMessage>원활한 서비스 이용을 위해 꼭 정확한 정보를 입력해주세요.</HelpMessage>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SelectBox = styled.div<{ $isSelect: boolean; $isOn: boolean }>`
  position: relative;
  width: 160px;
  height: 180px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg01};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  ${({ $isSelect, $isOn }) => $isSelect && !$isOn && css`
    filter: blur(1px) grayscale(1);
  `}
  ${({ $isSelect, $isOn }) => $isSelect && $isOn && css`
    border: 1px solid ${({ theme }) => theme.color.text.title01};
  `}
`;

const GenderTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const ManIcon = styled(Image).attrs({
  src: '/images/male-icon.svg',
  width: 64,
  height: 73,
  priority: true,
  alt: 'man icon',
})`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const WomanIcon = styled(Image).attrs({
  src: '/images/female-icon.svg',
  width: 77,
  height: 65,
  priority: true,
  alt: 'woman icon',
})`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const HelpMessage = styled.div`
  margin-top: 18px;
  padding-left: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.subTitle02};
`;
