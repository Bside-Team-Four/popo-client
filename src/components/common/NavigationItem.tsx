import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import NavItem from '@/types/NavItem';

type NavigationItemProps = {
  item: NavItem
};

export default function NavigationItem({ item }:NavigationItemProps) {
  const pathname = usePathname();

  const isActive = pathname === item.url;

  return (
    <Link href={item.url}>
      <Container>
        <ItemIcon
          src={`/images/${isActive ? item.activeIcon : item.inactiveIcon}.svg`}
          width={24}
          height={24}
          alt={`${item.title} icon`}
          priority
        />
        <ItemText $isActive={isActive}>{item.title}</ItemText>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemText = styled.div<{ $isActive: boolean }>`
  font-size: 11px;
  line-height: 11px;
  font-weight: 600;
  color: ${({ $isActive }) => ($isActive ? '#1E1928' : '#A19EAB')};
`;

const ItemIcon = styled(Image)`
  margin-bottom: 4px;
`;
