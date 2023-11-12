import { styled } from 'styled-components';

import ProfileIcon from '../common/ProfileIcon';

type UserCardProps = {
  userId: number;
  name: string;
  profileImg: string;
  schoolName: string;
  grade: number;
  gender:'MALE' | 'FEMALE'
};

export default function UserCard({
  userId, name, profileImg, schoolName, grade, gender,
}:UserCardProps) {
  return (
    <Container key={userId}>
      <ProfileIcon
        variant="square"
        img={profileImg}
        gender={gender}
      />
      <InpoWrapper>
        <UserName>{name}</UserName>
        <UserInpo>{`${schoolName} ${grade}학년`}</UserInpo>
      </InpoWrapper>
      <RelationButton>팔로우</RelationButton>
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

const RelationButton = styled.div`
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.375px;
  
  display: flex;
  text-overflow: nowrap;
  width: max-content;
  padding: 7px 4px 8px 0px;
  align-items: center;
  text-wrap:nowrap;
`;
