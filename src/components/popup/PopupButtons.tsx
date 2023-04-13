import styled from 'styled-components';

type PopupButtonsProps = {
  okText: string;
  cancelText?:string;
  onOk?: () => void;
  onClose: () => void;
};

export default function PopupButtons({
  okText, cancelText, onOk, onClose,
}:PopupButtonsProps) {
  return (
    <Container>
      {cancelText && <PopButton onClick={onClose} $isCancel>{cancelText}</PopButton>}
      <PopButton onClick={onOk || onClose}>{okText}</PopButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 51px;
  background-color: ${({ theme }) => theme.color.white};
  :nth-child(2){
    border-left: 1px solid ${({ theme }) => theme.color.gray00};
  }
`;

const PopButton = styled.button.attrs({ type: 'button' })<{ $isCancel?: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  border: none;
  color: ${({ $isCancel, theme }) => ($isCancel ? theme.color.cancel : theme.color.primary)};
`;
