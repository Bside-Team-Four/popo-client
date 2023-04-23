import { useState } from 'react';

import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';

import SearchField from '@/components/common/SearchField';
import SchoolItem from '@/components/popup/SchoolPopup/SchoolItem';
import useGetSchools from '@/hooks/api/useGetSchools';
import School from '@/types/School';

type SchoolPopDetailProps = {
  onClose:()=>void;
  onChangeSchool: (s:School) => void;
};

export default function SchoolPopDetail({ onClose, onChangeSchool }:SchoolPopDetailProps) {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword:string = useDebounce(keyword, 500);

  const { schoolData } = useGetSchools({ keyword: debouncedKeyword });

  const onSelectItem = (item: School) => {
    onChangeSchool(item);
    onClose();
  };

  return (
    <Container>
      <SearchField
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder="학교 검색 (지역+학교명으로 검색)"
        onClose={onClose}
      />
      <Wrapper>
        {schoolData && schoolData.map((item) => (
          <SchoolItem key={item.id} school={item} onClick={() => onSelectItem(item)} />
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
`;
