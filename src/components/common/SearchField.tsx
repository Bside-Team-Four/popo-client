import { ChangeEvent } from 'react';

import styled from 'styled-components';

import SearchIcon from '@/lib/assets/search-icon.svg';

type SearchFieldProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  placeholder: string;
  onClose?: () => void;
};

export default function SearchField({
  keyword, setKeyword, placeholder, onClose,
}:SearchFieldProps) {
  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  return (
    <Container>
      <SearchWrapper>
        <InputField
          type="text"
          value={keyword}
          onChange={onChangeKeyword}
          placeholder={placeholder}
        />
        <SearchImage />
      </SearchWrapper>
      {onClose && <CloseText onClick={onClose}>취소</CloseText>}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 16px 24px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;  
  position: relative;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  border-radius: 36px;
  padding: 8px 16px;
`;

const InputField = styled.input`
  border: none;
  border-radius: 0;
  width: 100%;
  outline: none;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.title01};
  background-color: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray03};
  };
`;

const SearchImage = styled(SearchIcon)`
  width: 16px;
  height: 16px;
  margin-left: 16px;
  path{
    fill: ${({ theme }) => theme.color.text.title02};
  }
`;

const CloseText = styled.div`
  cursor: pointer;
  min-width: 50px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: ${({ theme }) => theme.color.text.title01};
  padding-left: 16px;
`;
