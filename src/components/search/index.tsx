import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
import useGetUsers from '@/hooks/api/useGetUsers';
import { fetchGetUsers } from '@/lib/api/ApiService';
import { selectedOptionSelector } from '@/recoil/selector';

type UserInfo = Array<{
  userId: number;
  profileImg: string;
  name: string;
  schoolName: string;
  grade: number;
  isFollow: boolean;
}>;

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const selectedOption = useRecoilValue(selectedOptionSelector);
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef(null);

  const debouncedKeyword: string = useDebounce(keyword, 500);

  const { data: userData } = useGetUsers({
    keyword: debouncedKeyword,
    type: selectedOption,
    size: 10,
  });

  useEffect(() => {
    setUserInfo(userData);
  }, [debouncedKeyword]);

  useEffect(() => {
    setKeyword('');
  }, [selectedOption]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      let lastUserId = userData?.value?.[userData.value.length - 1]?.userId;
      if (debouncedKeyword?.length >= 2) {
        fetchGetUsers({
          keyword: debouncedKeyword,
          type: selectedOption,
          lastId: lastUserId,
          size: 10,
        }).then((res) => {
          setUserInfo(lastUserId ? {
            ...userData,
            value: [...userData.value, ...res.value],
          } : res);
          lastUserId = null;
        });
      }
    }
  };

  // IntersectionObserver로직
  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 0.5,
    };

    observer.current = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [userData, debouncedKeyword]);

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
      <Wrapper ref={targetRef}>
        {userInfo ? userInfo?.value?.map((eachFriend: FriendBoxProps) => <FriendBox key={eachFriend.userId} {...eachFriend} />)
          : (
            <NoResultWrapper>
              <NoResultImg src="/images/search.svg" width="96" height="96" alt="" />
              <NoResultText>검색 결과가 없어요.</NoResultText>
            </NoResultWrapper>
          )}
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
