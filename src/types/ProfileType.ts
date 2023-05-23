import Gender from '@/types/Gender';

type ProfileType = {
  userName: string
  schoolName: string,
  grade: number,
  votedCount: number,
  voteCount: number,
  followerCount: number,
  followeeCount: number,
  reward: number,
  gender: Gender,
  profileImageUrl: string,
};

export default ProfileType;
