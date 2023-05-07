import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';

export default function InviteFriends() {
  const onInvite = () => {
    // TODO: 링크 관련 기획 이후 추가(Toast 포함)
    // eslint-disable-next-line no-console
    console.log('친구초대');
  };

  return (
    <Container>
      <BoxContainer>
        <Message>{'팔로잉 한 친구들이 선택지에 노출돼요\n내 마음을 보여주고 싶은 친구를\nPOPO로 초대하세요'}</Message>
        <InviteButton onClick={onInvite}>친구 초대하기</InviteButton>
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 263px;
  height: 142px;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
`;

const Message = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  white-space: pre-wrap;
  text-align: center;
  color: ${({ theme }) => theme.color.text.title01};
  margin-bottom: 8px;
`;

const InviteButton = styled(SmallButton)`
  background-color: ${({ theme }) => theme.color.primary};
  span{
    color: ${({ theme }) => theme.color.text.title01}
  }
`;
