import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { InfoText, ListContainer, Header } from '../../components/Liststyle';
import styled from 'styled-components';
import Checkbox from '../../components/buttons/CheckBox';
import SearchBar from '../../components/SearchBar';
import Pagination from '../home/Pagenation';
import { UserInfoType } from '../../apis/user/UserTypes';
import { UserAPI } from '../../apis/user/User';

const Container = styled(ListContainer)`
  max-width: 700px;
  margin: 0rem auto;
  padding: 1rem;
`;
const FlexContainer = styled.div`
  display: flex;
`;

// TODO: 페이지네이션 타입 따로 빼기
type pagesType = {
  perPage: number;
  totalPage: number;
};

const AdminUserList: React.FC = () => {
  const token = localStorage.getItem('token') || '';
  const [datas, setDatas] = useState<UserInfoType[]>([]);
  const [search, setSearch] = useState<string>();
  const [normal, setNormal] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<pagesType>({ perPage: 10, totalPage: 0 });

  useEffect(() => {
    UserAPI.getAllUserInfo(token, page, pages.perPage).then((res) => {
      setDatas(res.data.users);
      setPages({
        perPage: res.data.perPage,
        totalPage: res.data.totlaUsers,
      });
      setPage(res.data.page);
    });
  }, [page]);

  const onhandleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'normal' ? setNormal(!normal) : setExpired(!expired);
  };

  let list = datas.filter((data) =>
    normal && !expired
      ? data.userStatus === 'normal'
      : !normal && expired
      ? data.userStatus === 'expired'
      : !normal && !expired
      ? data.userStatus === ''
      : data.userName.includes(''),
  );

  if (search) {
    list = list.filter((data: any) => data.email.includes(search));
  }
  console.log(pages);

  return (
    <Container>
      <FlexContainer>
        <Checkbox
          onChange={onhandleCheck}
          text="normal"
          title="일반회원"
          checked={normal}
        />
        <Checkbox
          onChange={onhandleCheck}
          text="expired"
          title="탈퇴회원"
          checked={expired}
        />
        <SearchBar setSearch={(search: string) => setSearch(search)} />
      </FlexContainer>

      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>
      {list.map((data: any, i: number) => (
        <UserCard key={i} data={data} />
      ))}
      <Pagination
        total={pages?.totalPage}
        limit={pages.perPage}
        page={page}
        setPage={(page: number) => setPage(page)}
      />
    </Container>
  );
};

export default AdminUserList;
