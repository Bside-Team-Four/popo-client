import styled from 'styled-components';

import Reward, { RewardType } from '@/types/Reward';

type RewardItemProps = Omit<Reward, 'historyId'>;

const getTypeText = (type: RewardType) => (type === 'ADD' ? '적립' : '사용');

const getPointText = (type: RewardType, point: number) => `${type === 'ADD' ? '+' : '-'}${point} PPP`;

export default function RewardItem({
  type, regDt, amount, remainAmount,
}:RewardItemProps) {
  const typeText = getTypeText(type);
  const pointText = getPointText(type, amount);

  return (
    <Container>
      <TypeInfo>
        <RewardTypeText>{typeText}</RewardTypeText>
        <SmallText>{regDt}</SmallText>
      </TypeInfo>
      <AmountInfo>
        <AmountText type={type}>{pointText}</AmountText>
        <RemainAmountText>{`${remainAmount} PPP`}</RemainAmountText>
      </AmountInfo>
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

const TypeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RewardTypeText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const SmallText = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 2px;
  color: ${({ theme }) => theme.color.text.subTitle02};
`;

const AmountText = styled.div<{ type: RewardType }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: ${({ theme, type }) => (type === 'ADD' ? theme.color.primary : theme.color.text.title01)};
`;

const RemainAmountText = styled.div`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  margin-top: 2px;
  color: ${({ theme }) => theme.color.text.subTitle02};
`;
