import { styled } from 'styled-components';

import ProfileIcon from '../common/ProfileIcon';

type UserCardProps = {
  userId: number;
  name: string;
  profileImg: string;
  schoolName: string;
  grade: number;
  gender:'MALE' | 'FEMALE'
  relationId: number | null;
  toggleRelation: (userId:number, relationId:number | null) => void;
};

export default function UserCard({
  userId,
  name,
  profileImg,
  schoolName,
  grade,
  gender,
  relationId,
  toggleRelation,
}:UserCardProps) {
  const $hasRelation = typeof relationId === 'number';

  function handleRelationBtnClick() {
    toggleRelation(userId, relationId);
  }

  return (
    <Container key={userId} data-testid="user-card">
      <ProfileIcon
        variant="square"
        img={profileImg}
        gender={gender}
      />
      <InpoWrapper>
        <UserName>{name}</UserName>
        <UserInpo>{`${schoolName} ${grade}학년`}</UserInpo>
      </InpoWrapper>
      <RelationButton $hasRelation={$hasRelation} onClick={() => handleRelationBtnClick()}>{relationId ? '팔로잉' : '팔로우'}</RelationButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height:m ax-content;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 13px;
  background: ${({ theme }) => theme.color.componentBackground.bg01};
`;

const InpoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.375px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const UserInpo = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.375px;
  color: ${({ theme }) => theme.color.text.title02};
`;

const RelationButton = styled.div<{ $hasRelation:boolean }>`
  color: ${({ theme, $hasRelation }) => ($hasRelation ? theme.color.primary : theme.color.text.reverseText)};
  background: ${({ theme, $hasRelation }) => ($hasRelation ? theme.color.componentBackground.bg02 : theme.color.primary)};
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.375px;
  
  display: flex;
  flex-shrink: 0;
  width: 54px;
  height: 32px;
  justify-content: center;
  align-items: center;
  text-wrap:nowrap;
  border-radius: 8px;
`;
