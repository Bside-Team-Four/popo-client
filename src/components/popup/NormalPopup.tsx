import { MouseEvent } from 'react';

import styled from 'styled-components';

import PopupButtons from './PopupButtons';
import Portal from './Portal';
import SprintMotion from './SprintMotion';

type NormalPopupProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  okText: string;
  cancelText?: string;
  onOk?: ()=>void;
};

export default function NormalPopup({
  show, onClose, title,
  okText, cancelText, onOk,
}:NormalPopupProps) {
  const onStopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <Portal show={show}>
      <SprintMotion>
        <PopContainer onClick={onClose}>
          <BoxContainer onClick={onStopPropagation}>
            <Title>{title}</Title>
            <PopupButtons
              okText={okText}
              cancelText={cancelText}
              onOk={onOk}
              onClose={onClose}
            />
          </BoxContainer>
        </PopContainer>
      </SprintMotion>
    </Portal>
  );
}

const PopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding:40px;
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 161px;
  padding-top: 32px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 78px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray00};
`;
