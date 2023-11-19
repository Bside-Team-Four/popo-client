import { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import Button from '@/components/common/Button';
import NormalPopup from '@/components/popup/NormalPopup';
import useRemoveAccount from '@/hooks/useRemoveAccount';

export default function RemoveAccount() {
  const [isChecked, setIsChecked] = useState(false);
  const { removeAccount, popInfo: onRemoveSuccessPopInfo } = useRemoveAccount();

  const onToggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const onClickRemove = () => {
    removeAccount();
  };

  const checkText = isChecked ? 'check' : 'uncheck';

  return (
    <Container>
      <WarningIcon />
      <Title>POPO 탈퇴 유의사항</Title>
      <ul>
        <Message>탈퇴 시 팔로잉, 팔로우, 리워드, 힌트 정보가 삭제되고 복구 불가능합니다.</Message>
        <Message>탈퇴 후 15일 이후부터 재가입 가능합니다.</Message>
      </ul>
      <RemoveContainer>
        <CheckContainer onClick={onToggleCheck}>
          <Image
            src={`/images/${checkText}-icon.svg`}
            alt={`${checkText} icon`}
            width={24}
            height={24}
            priority
          />
          <CheckText>모든 유의사항을 확인하였으며 POPO 탈퇴에 동의합니다.</CheckText>
        </CheckContainer>
        <RemoveButton disabled={!isChecked} onClick={onClickRemove}>POPO 탈퇴</RemoveButton>
      </RemoveContainer>
      <NormalPopup {...onRemoveSuccessPopInfo} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 0 24px;
  ul{
    list-style-type: disc;
    padding-left: 12px;
  }
`;

const WarningIcon = styled(Image).attrs({
  src: '/images/warning-icon.svg',
  width: 74,
  height: 68,
  alt: 'warning icon',
  priority: true,
})`
  margin: 40px auto;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 26px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const Message = styled.li`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.color.gray02};
`;

const RemoveContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 24px;
  bottom: 39px;
`;

const CheckContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
`;

const CheckText = styled.div`
  margin-left: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const RemoveButton = styled(Button).attrs({ type: 'button' })``;
