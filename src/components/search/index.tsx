import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
import useGetUsers from '@/hooks/api/useGetUsers';
import { selectedOptionSelector } from '@/store/popo/selector';
import { GetUserResponse } from '@/types/ApiTypes';

type UserData = {
  userId: number;
  profileImg: string;
  name: string;
  schoolName: string;
  grade: number;
  isFollow: boolean;
};

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const selectedOption = useRecoilValue(selectedOptionSelector);
  const [lastId, setLastId] = useState<number | undefined>(undefined);

  const observer = useRef<IntersectionObserver | null | void>(null);
  const targetRef = useRef(null);

  const debouncedKeyword: string = useDebounce(keyword, 500);

  const { userData, isLoading, refetch } = useGetUsers({
    keyword: debouncedKeyword,
    type: selectedOption,
    lastId,
    size: 10,
  });
  let userListData: GetUserResponse[] | undefined | any = userData;

  useEffect(() => {
    if (userData && !isLoading) {
      const lastUserId = userData?.[userData.length - 1]?.userId;
      const loadMore = lastId !== undefined ? lastId > lastUserId : true;
      if (loadMore && userData.length === 10) {
        setLastId(lastUserId);
      }
    }
  }, [userData]);

  useEffect(() => {
    setKeyword('');
    setLastId(undefined);
  }, [selectedOption]);

  useEffect(() => {
    if (debouncedKeyword.length >= 2 && !isLoading) {
      refetch().then((res) => {
        const responseData = res.data as GetUserResponse;
        userListData = [...userData, ...(responseData?.value || [])];
      });
    }
  }, [lastId]);

  useEffect(() => {
    setLastId(undefined);
  }, [debouncedKeyword]);

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
        {userListData ? userListData?.map((eachFriend: FriendBoxProps) => <FriendBox key={eachFriend.userId} {...eachFriend} />)
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
