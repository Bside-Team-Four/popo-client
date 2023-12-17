import styled from 'styled-components';

import useGetHints from '@/hooks/api/useGetHints';
import usePurchaseHintMutation from '@/hooks/api/usePurchaseHintMutation';

type HintBoxProps = {
  userId: number;
  voteId: number;
};

export default function HintBox({ userId, voteId }: HintBoxProps) {
  const { data: hints = [] } = useGetHints({ targetUserId: userId, voteId });

  const purchaseHint = usePurchaseHintMutation();
  const purchasedHints = hints.filter((hint) => hint.isPurchased);

  const hasUnpurchasedHint = hints.some((hint) => !hint.isPurchased);

  const hasPurchasedHint = purchasedHints.length > 0;

  const purchasableHint = hints.find((hint) => !hint.isPurchased);

  const handlePurchaseClick = () => {
    if (purchasableHint !== undefined) {
      purchaseHint({ voteId, hintId: purchasableHint.hintId });
    }
  };

  return (
    <Container>
      {!hasPurchasedHint
       && (
       <HintOpenButton
         onClick={handlePurchaseClick}
         disabled={!hasUnpurchasedHint}
       >
         힌트 보기
       </HintOpenButton>
       )}

      {purchasedHints.map(({
        content, hintId,
      }) => <HintText key={hintId}>{content}</HintText>)}

      {hasUnpurchasedHint && hasPurchasedHint && (
        <MoreButton onClick={handlePurchaseClick} disabled={!hasUnpurchasedHint}>더보기...</MoreButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.06));
  border-radius: 8px;
`;

const HintText = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.black};
`;

const HintOpenButton = styled.button`
  all: unset;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const MoreButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;
