import { useState } from 'react';

import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import SchoolItem from '@/components/popup/SchoolPopup/SchoolItem';
import useGetInfiniteSchool from '@/hooks/api/useGetInfiniteSchool';
import School from '@/types/School';

type SchoolPopDetailProps = {
  onClose:()=>void;
  onChangeSchool: (s:School) => void;
};

export default function SchoolPopDetail({ onClose, onChangeSchool }:SchoolPopDetailProps) {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword:string = useDebounce(keyword, 500);

  const {
    schoolData, isLoading, isFetchingNextPage, refState,
  } = useGetInfiniteSchool({ keyword: debouncedKeyword });

  const onSelectItem = (item: School) => {
    onChangeSchool(item);
    onClose();
  };

  return (
    <Container>
      <SearchFieldWrapper>
        <SearchField
          keyword={keyword}
          setKeyword={setKeyword}
          placeholder="학교 검색 (지역+학교명으로 검색)"
        />

        <CloseText onClick={onClose}>취소</CloseText>
      </SearchFieldWrapper>
      <Wrapper>
        {schoolData && schoolData.map((item) => (
          <SchoolItem key={item.id} school={item} onClick={() => onSelectItem(item)} />
        ))}
        {!isLoading && !isFetchingNextPage && <div ref={refState.lastItemRef} />}
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

const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  height: auto;
`;

const CloseText = styled.div`
  width: 50px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: ${({ theme }) => theme.color.text.title01};
  margin-left: 16px;
`;
