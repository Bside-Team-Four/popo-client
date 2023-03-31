import Image from 'next/image';

import styled from 'styled-components';

type OptionButtonProps = {
  text: string
  imgSrc: string;
  disabled?: boolean;
  size:{
    width: number;
    height: number;
  }
  onClick: () => void;
};

export default function OptionButton({
  text, imgSrc, disabled = false, size, onClick,
}:OptionButtonProps) {
  return (
    <Wrapper disabled={disabled} onClick={onClick}>
      <ButtonIcon
        src={imgSrc}
        width={size.width}
        height={size.height}
        alt={`${text} icon`}
        priority
      />
      <ButtonText>{text}</ButtonText>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.black};
  &:disabled{
    opacity: 0.3;
  };
`;

const ButtonIcon = styled(Image)`
  margin-right: 8px;
`;

const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
