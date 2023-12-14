import styled from 'styled-components';

import SettingItem from '@/components/common/SettingItem';
import useNotificationSetting from '@/hooks/useNotificationSetting';

export default function Notification() {
  const {
    settings = { chosenOption: false, hourOption: false },
    toggleNotificationSettingChosenType,
    toggleNotificationSettingHourType,
  } = useNotificationSetting();

  const handleClickHourPush = () => {
    toggleNotificationSettingHourType();
  };

  const handleClickChosenPush = () => {
    toggleNotificationSettingChosenType();
  };

  return (
    <Container>
      <SettingItem title="POPO 회차 시작 푸시" switchValue={{ isOn: settings.hourOption, onClick: handleClickHourPush }} />
      <GrayBar />
      <SettingItem title="선택된 POPO 알림 푸시" switchValue={{ isOn: settings.chosenOption, onClick: handleClickChosenPush }} />
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
