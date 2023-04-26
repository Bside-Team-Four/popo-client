import Image from 'next/image';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import School from '@/types/School';

type SchoolItemProps = {
  school: School;
  onClick: () => void;
};

export default function SchoolItem({ school, onClick }: SchoolItemProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <Container onClick={onClick}>
      <Image
        src={`/images/${isDarkMode ? 'black' : 'light'}-school-icon.svg`}
        width={44}
        height={44}
        alt="school icon"
        priority
      />
      <SchoolInfo>
        <SchoolName>{school.name}</SchoolName>
        <SchoolAddress>{school.address}</SchoolAddress>
        <ArrowIcon />
      </SchoolInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 60px;
  padding: 0 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.componentBackground.bg01};
  margin-bottom: 8px;
  border-radius: 14px;
`;

const SchoolInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 60px;
  padding-left: 8px;
`;

const SchoolName = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.title01};
  margin-bottom: 4px;
`;

const SchoolAddress = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.subTitle01};
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArrowIcon = styled(Image).attrs({
  src: '/images/arrow-icon.svg',
  width: 12,
  height: 12,
  alt: 'arrow icon',
  priority: true,
})`
  position: absolute;
  right: 0;
  top: 24px;
`;
