import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import CheckIconLight from '@/lib/assets/check-icon.svg';
import CheckIconDark from '@/lib/assets/check-icon-dark.svg';
import UncheckIcon from '@/lib/assets/check-icon-inactive.svg';

export type CheckboxProps = React.PropsWithChildren<{
  checked: boolean,
  text:string,
  onChange:(value:boolean)=>void
}>;

export default function CheckBox({
  checked, text, onChange, children,
}: CheckboxProps) {
  const { isDarkMode } = useDarkMode();
  const { CheckedIcon, checkedBorderColor, checkedTextColor } = isDarkMode ? {
    CheckedIcon: CheckIconDark,
    checkedBorderColor: '#FFFFFF',
    checkedTextColor: '#FFFFFF',
  } : {
    CheckedIcon: CheckIconLight,
    checkedBorderColor: '#000000',
    checkedTextColor: '#000000',
  };

  const CheckIcon = checked ? CheckedIcon : UncheckIcon;
  const borderColor = checked ? checkedBorderColor : '#A0A0A0';
  const textColor = checked ? checkedTextColor : '#A0A0A0';

  return (
    <Container
      $borderColor={borderColor}
    >
      <CheckboxContainer
        onClick={() => {
          onChange(!checked);
        }}
      >
        {checked ? <CheckIcon /> : <UncheckIcon />}
        <LabelText $textColor={textColor}>{text}</LabelText>
      </CheckboxContainer>
      {children && (
        <Divider
          $borderColor={borderColor}
        />
      )}
      {children}
    </Container>
  );
}

const Divider = styled.div<{ $borderColor:string }>`
  width: 100%;
  height: 1px;
  background-color: ${({ $borderColor }) => $borderColor}
`;

const Container = styled.div<{ $borderColor:string }>`
  display: flex;
  flex-direction: column;
  ${({ $borderColor }) => `border: 1px solid ${$borderColor};`}
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap:8px;
`;

const LabelText = styled.label<{ $textColor:string }>`
  font-size: 14px;
  line-height: 16px;
  color: ${({ $textColor }) => ($textColor)};
`;
