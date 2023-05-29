import { useState } from 'react';

import Image from 'next/image';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
import useGetUsers from '@/hooks/api/useGetUsers';
import { selectedOptionSelector } from '@/recoil/selector';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  // const [searchedUserData, setSearchedUserData] = useState()
  const selectedOption = useRecoilValue(selectedOptionSelector);

  // const observer = useRef<IntersectionObserver | null>(null);
  // const lastItemRef = useRef<HTMLDivElement | null>(null);

  const debouncedKeyword: string = useDebounce(keyword, 500);

  const { userData } = useGetUsers({
    keyword: debouncedKeyword,
    type: selectedOption,
    size: 100,
  });

  // const handleObserver = (entries: IntersectionObserverEntry[]) => {
  //   const target = entries[0];
  //   console.log("target", target.isIntersecting)
  //   if (target.isIntersecting) {
  //     const lastUserId = searchedUserData[searchedUserData.length - 1]?.userId || null;
  //     const userData = fetchData(lastUserId);
  //     if (userData) {
  //       const updatedData = searchedUserData.concat(userData.value);
  //       setSearchedUserData(updatedData)
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData().then((userData: any) => {
  //     if (userData) {
  //       setSearchedUserData(userData.value)
  //     }
  //   })
  // }, [debouncedKeyword, selectedOption])

  // useEffect(() => {
  //   console.log("lastItemRef.current", lastItemRef.current)
  //   if (lastItemRef.current) {
  //     observer.current = new IntersectionObserver(handleObserver, {
  //       rootMargin: '20px',
  //       threshold: 0.01,
  //     });
  //     observer.current.observe(lastItemRef.current);
  //   }

  //   return () => {
  //     if (observer.current) {
  //       observer.current.disconnect();
  //     }
  //   };
  // }, [handleObserver]);

  return (
    <Container>
      <SearchField
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder="검색어를 입력해주세요"
        /* eslint-disable max-len */
        searchOption={[
          { key: 'SCHOOL', name: '학교' },
          { key: 'NAME', name: '이름' },
        ]}
      />
      <Wrapper>
        {userData ? userData?.value?.map((eachFriend: FriendBoxProps) => <FriendBox key={eachFriend.userId} {...eachFriend} />) : (
          <NoResultWrapper>
            <NoResultImg src="/images/search.svg" width="96" height="96" alt="" />
            <NoResultText>검색 결과가 없어요.</NoResultText>
          </NoResultWrapper>
        )}
      </Wrapper>
    </Container>
  );
}
const Flexbox = styled.div`
  display: flex;
`;

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

const FriendBoxWrapper = styled.div`
  width: 100%
`;

const NoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const NoResultImg = styled(Image)`
  margin-bottom: 40px;
`;

const NoResultText = styled.span`
  color: ${({ theme }) => theme.color.text.title01};
`;
