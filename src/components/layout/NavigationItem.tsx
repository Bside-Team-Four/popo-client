import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled, { css } from 'styled-components';

import FriendSVG from '@/lib/assets/freind-icon.svg';
import MySVG from '@/lib/assets/my-icon.svg';
import PoPoSVG from '@/lib/assets/popo-icon.svg';
import WhoSVG from '@/lib/assets/who-icon.svg';
import { getRatioSizePX } from '@/utils/sizeHelper';

type NavigationItemProps = {

  title: string;
  url: string;
};

const renderIcon = (title: string, isActive: boolean) => {
  if (title === 'POPO') {
    return <PoPoIcon data-testid="popo-icon" $isActive={isActive} />;
  }
  if (title === 'WHO') {
    return <WhoIcon data-testid="who-icon" $isActive={isActive} />;
  }
  if (title === 'FRIEND') {
    return <FriendIcon data-testid="friend-icon" $isActive={isActive} />;
  }

  return <MyIcon data-testid="my-icon" $isActive={isActive} />;
};

export default function NavigationItem({ title, url }:NavigationItemProps) {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <Link href={url}>
      <Container>
        {renderIcon(title, isActive)}
        <ItemText $isActive={isActive}>{title}</ItemText>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  display: flex;
  height: 56px;
  width: ${getRatioSizePX(93.75)};
  flex-direction: column;
  align-items: center;
`;

const ItemText = styled.div<{ $isActive: boolean }>`
  font-family: var(--font-poppins);
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const IconStyle = css<{ $isActive?: boolean }>`
  margin-top: 8px;
  margin-bottom: 6.24px;
  fill: ${({ $isActive, theme }) => ($isActive ? theme.color.text.title01 : 'none')};
  path{
    stroke: ${({ theme }) => theme.color.text.title01}
  };
`;

const PoPoIcon = styled(PoPoSVG)`
  ${IconStyle};
`;

const WhoIcon = styled(WhoSVG)`
  ${IconStyle};
`;

const FriendIcon = styled(FriendSVG)`
  ${IconStyle};
`;

const MyIcon = styled(MySVG)`
  ${IconStyle};
`;
