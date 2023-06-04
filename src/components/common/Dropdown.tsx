import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { selectedOptionState } from '@/store/popo';

export type DropdownProps = {
  options: Array<{ key: string, name: string }>;
};

export default function Dropdown({ options }: DropdownProps) {
  const [selectedOptionName, setSelectedOptionName] = useRecoilState(selectedOptionState);

  const changeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedOptionName(value);
  };

  return (
    <SelectBox onChange={changeOption}>
      {options.map((optionItem: { key: string, name: string }) => (
        <OptionBox key={optionItem.key} value={optionItem.key}>{optionItem.name}</OptionBox>
      ))}
    </SelectBox>
  );
}

const SelectBox = styled.select`
  margin-right: 10px;
`;

const OptionBox = styled.option`
`;
