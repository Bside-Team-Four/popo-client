import { useState } from 'react';

import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
// import friend from '@/fixtures/friend';
import useGetUsers from '@/hooks/api/useGetUsers';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword: string = useDebounce(keyword, 500);
  const { userData } = useGetUsers({
    keyword: debouncedKeyword,
    type: 'SCHOOL',
    size: 10,
  });

  return (
    <Container>
      {/* <Dropdown options={['학교', '이름']} /> */}
      <SearchField
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder="검색어를 입력해주세요"
      />
      <Wrapper>
        {userData?.value.map((eachFriend: FriendBoxProps) => (
          <FriendBox key={eachFriend.name} {...eachFriend} />
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 72px;
  flex-direction: column;
  overflow: scroll;
  height: auto;
  align-items: center;
`;
