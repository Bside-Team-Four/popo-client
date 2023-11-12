import { useState } from 'react';

import { styled } from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import UserCard from '@/components/search/UserCard';
import useGetInfiniteUsers from '@/hooks/api/useGetInfiniteUsers';

const options = [{ label: '이름', value: 'NAME' }, { label: '학교', value: 'SCHOOL' }];

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword: string = useDebounce(keyword, 500);

  const [type, setType] = useState<'NAME' | 'SCHOOL'>('NAME');
  const placeholder = type === 'NAME' ? '친구 이름 검색' : '학교명 검색';

  const {
    userData, isLoading, isFetchingNextPage, refState,
  } = useGetInfiniteUsers({ keyword: debouncedKeyword, type });

  function handleChange(value:string) {
    setKeyword('');
    setType(value as 'NAME' | 'SCHOOL');
  }

  return (
    <Container>
      <SearchField>
        <SearchField.Dropdown
          options={options}
          value={type}
          onChange={(value) => { handleChange(value); }}
        />
        <SearchField.Input keyword={keyword} placeholder={placeholder} setKeyword={setKeyword} />
      </SearchField>
      <CardList>
        {userData && userData.map((item) => (
          <UserCard key={item.userId} {...item} />
        ))}
        {!isLoading && !isFetchingNextPage && <div ref={refState.lastItemRef} />}
      </CardList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  box-sizing: border-box;
`;

const CardList = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  box-sizing: border-box;
`;
