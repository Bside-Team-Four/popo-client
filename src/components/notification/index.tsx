import { useState } from 'react';

import styled from 'styled-components';

import SettingItem from '@/components/common/SettingItem';

export default function Notification() {
  const [isStartPush, setIsStartPush] = useState(false);
  const [isSelectPush, setIsSelectPush] = useState(false);

  const onClickStartPush = () => {
    setIsStartPush((prev) => !prev);
  };

  const onClickSelectPush = () => {
    setIsSelectPush((prev) => !prev);
  };

  return (
    <Container>
      <SettingItem title="POPO 회차 시작 푸시" switchValue={{ isOn: isStartPush, onClick: onClickStartPush }} />
      <GrayBar />
      <SettingItem title="선택된 POPO 알림 푸시" switchValue={{ isOn: isSelectPush, onClick: onClickSelectPush }} />
      <GrayBar />
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
`;

const GrayBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  margin: 8px 0;
`;
