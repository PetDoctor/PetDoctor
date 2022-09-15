import React, { useEffect, useState } from 'react';
import {
  InfoCard,
  TextContainer,
  Title,
  InfoText,
  StatusContainer,
  Select,
} from '../../components/Liststyle';
import { UserAPI } from '../../apis/user/User';
import { IAdminUserInfoList } from '../../apis/user/UserTypes';
// 바뀐 로컬 주소 URL
const UserCard = ({ data }: { data: IAdminUserInfoList }) => {
  const token = localStorage.getItem('token') || '';
  const [status, setStatus] = useState<string>(data?.userStatus);
  useEffect(() => {
    setStatus(data?.userStatus);
  }, [data]);

  const onhandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(event.target.value);
    const statusInfo = {
      userId: data._id,
      userStatus: value === 'normal' ? 'expired' : 'normal',
    };

    UserAPI.UpdateUserStatus(token, statusInfo);
  };

  return (
    <InfoCard>
      <TextContainer>
        <Title>{data?.role}</Title>
        <InfoText>{data?.userName}</InfoText>
        <InfoText>{data?.email}</InfoText>
        <StatusContainer>
          <Select value={status} onChange={onhandleChange}>
            <option value="normal">회원</option>
            <option value="expired">탈퇴회원</option>
          </Select>
        </StatusContainer>
      </TextContainer>
    </InfoCard>
  );
};

export default UserCard;
