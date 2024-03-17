import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { styled } from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import UserCard from '@/components/search/UserCard';
import useGetInfiniteFollow, { GET_INFINITE_FOLLOW_KEY } from '@/hooks/api/useGetInfiniteRelations';
import useToggleRelation from '@/hooks/api/useToggleRelation';

export default function Relation() {
  const { isDarkMode } = useDarkMode();
  const searchParams = useSearchParams();
  const search = searchParams?.get('defaultType');
  const [type, setType] = useState<'follower' | 'followee'>((search ?? 'follower') as ('follower' | 'followee'));

  const handleTabClick = (value:'follower' | 'followee') => {
    setType(value);
  };

  const {
    userData, isLoading, isFetchingNextPage, refState,
  } = useGetInfiniteFollow({ type });

  const { toggleRelation } = useToggleRelation(GET_INFINITE_FOLLOW_KEY);

  const relations = type === 'follower' ? userData : userData.filter((item) => item.relationId);
  return (
    <Container>
      <TabContainer>
        <TabItem active={type === 'follower'} onClick={() => { handleTabClick('follower'); }}>
          팔로워
        </TabItem>
        <TabItem active={type === 'followee'} onClick={() => { handleTabClick('followee'); }}>
          팔로잉
        </TabItem>
      </TabContainer>
      <CardList>
        {relations && relations.map((item) => (
          <UserCard
            key={item.userId}
            {...item}
            // eslint-disable-next-line react/jsx-no-bind
            toggleRelation={toggleRelation}
          />
        ))}
        {!isLoading && !isFetchingNextPage && <div ref={refState.lastItemRef} />}
      </CardList>
    </Container>
  );
}

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;  
`;

const TabItem = styled.div<{ active?: boolean }>`
  font-size: 36px;
  font-weight: 200;
  color: ${({ theme, active }) => (active ? theme.color.text.title01 : theme.color.text.subTitle02)};
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  box-sizing: border-box;
  overflow: auto;
  gap: 16px;
`;

const CardList = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  box-sizing: border-box;
`;
