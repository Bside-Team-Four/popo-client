import styled from 'styled-components';

import Reward, { RewardType } from '@/types/Reward';

type RewardItemProps = Omit<Reward, 'id'>;

const getTypeText = (type: RewardType) => (type === 'ADD' ? '적립' : '사용');

const getPointText = (type: RewardType, point: number) => `${type === 'ADD' ? '+' : '-'}${point} PPP`;

export default function RewardItem({ type, date, point }:RewardItemProps) {
  const typeText = getTypeText(type);
  const pointText = getPointText(type, point);

  return (
    <Container>
      <RewardInfo>
        <RewardTypeText>{typeText}</RewardTypeText>
        <DateText>{date}</DateText>
      </RewardInfo>
      <PointText type={type}>{pointText}</PointText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  margin: 24px 0;
`;

const RewardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RewardTypeText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const DateText = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 2px;
  color: ${({ theme }) => theme.color.text.subTitle02};
`;

const PointText = styled.div<{ type: RewardType }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: ${({ theme, type }) => (type === 'ADD' ? theme.color.primary : theme.color.text.title01)};
`;
