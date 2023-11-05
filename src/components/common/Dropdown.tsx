import { ChangeEvent, useCallback } from 'react';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

export type DropdownProps = {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value:string) => void;
};

export default function Dropdown({
  options, value, onChange,
}: DropdownProps) {
  const { isDarkMode: $isDarkMode } = useDarkMode();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <Container onClickCapture={(e) => {
      e.preventDefault();
    }}
    >

      <SelectBox $isDarkMode={$isDarkMode} value={value} onChange={handleChange} data-testid="dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value} data-testid="option">
            {option.label}
          </option>
        ))}
      </SelectBox>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SelectBox = styled.select<{ $isDarkMode:boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline:none;
  border: none;

  color: ${({ theme }) => theme.color.text.title02};
  background: ${({ theme, $isDarkMode }) => `${theme.color.componentBackground.bg02} url("/images/${$isDarkMode ? 'black' : 'light'}-triangle-down-icon.svg") no-repeat;`} 
  background-position: right 0px top 50%;
  padding-right: 20px;

  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.375px;

`;
