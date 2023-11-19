/* eslint-disable react/destructuring-assignment */
import React, { ChangeEvent, Children } from 'react';

import styled from 'styled-components';

import SearchIcon from '@/lib/assets/search-icon.svg';
import { getChildByType } from '@/utils/utils';

import Dropdown, { DropdownProps } from './Dropdown';

type SearchFieldProps = {
  children?:Array<React.ReactElement<DropdownProps | SearchInputProps>>;
} | SearchInputProps;

type SearchInputProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  placeholder: string;
};

const DropdownType = React.createElement(Dropdown).type;
const SearchInputType = React.createElement(SearchInput).type;

function SearchInput({
  keyword, setKeyword, placeholder,
}:SearchInputProps) {
  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  return (
    <SearchInputWrapper>
      <InputField
        type="text"
        value={keyword}
        onChange={onChangeKeyword}
        placeholder={placeholder}
      />
      <SearchImage />
    </SearchInputWrapper>
  );
}

function SearchFieldPropsTypeGuard(props:SearchFieldProps):props is SearchInputProps {
  return (props as SearchInputProps).keyword !== undefined;
}

export function SearchFieldMain(props:SearchFieldProps) {
  const isUnified = SearchFieldPropsTypeGuard(props);
  const hasTwoChild = !isUnified && Children.toArray(props.children).length === 2;

  return (
    <Container>
      <SearchWrapper>
        {isUnified ? <SearchInput {...props} />
          : (
            <>
              {getChildByType(DropdownType, props.children)}
              {hasTwoChild && <Spacer />}
              {getChildByType(SearchInputType, props.children)}
            </>
          )}
      </SearchWrapper>
    </Container>
  );
}

const SearchField = Object.assign(SearchFieldMain, {
  Input: SearchInput,
  Dropdown,
});

export default SearchField;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;  
  gap:18px;
  position: relative;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  border-radius: 36px;
  padding: 8px 16px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;  
  position: relative;
  width: 100%;
  height: 40px;
  background-color: transparent;
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

const Spacer = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.text.title02};
`;
