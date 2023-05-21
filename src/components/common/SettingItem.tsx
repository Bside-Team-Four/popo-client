import Image from 'next/image';

import styled from 'styled-components';

import Switch from '@/components/common/Switch';

type SettingItemProps = {
  title: string;
  showArrow?: boolean;
  message?: string;
  onClick?: () => void;
  switchValue?: {
    isOn: boolean;
    onClick: () => void;
  }
};

export default function SettingItem({
  title, switchValue, showArrow = false, message, onClick,
}:SettingItemProps) {
  return (
    <Container onClick={onClick}>
      <Title>
        {title}
      </Title>
      {showArrow && <ArrowIcon />}
      {message && <Message>{message}</Message>}
      {switchValue && (
      <Switch
        title={title}
        isOn={switchValue.isOn}
        onClick={switchValue.onClick}
      />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 58px;
  padding: 0 24px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const Message = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #C7C5CB;
`;

const ArrowIcon = styled(Image).attrs({
  src: '/images/arrow-icon.svg',
  width: 12,
  height: 12,
  alt: 'arrow icon',
  priority: true,
})`
`;
