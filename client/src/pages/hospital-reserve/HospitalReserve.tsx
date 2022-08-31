import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title } from '../../components/InfoForm';
import { Header } from '../../components/Liststyle';
import ReserveCard from './ReserveCard';
import { Container, Column } from '../user-reserv/ReserveStyle';
import Pagination from '../home/Pagenation';

export interface IInfoArrRes {
  email: string;
  rezDate: string;
  rezHour: number;
  name: string;
  petName: string;
  species: string;
  breed: string;
  age: number;
  sex: string;
  weight: number;
  medicalHistory: string;
  vaccination: string;
  service: string;
  price: number;
  resName: string;
}

interface IPages {
  perPage: number;
  totalPage: number;
}

function UserReserve() {
  const [resInfo, setResInfo] = useState<any>({
    Reservations: [],
    customerInfoes: [],
    petInfoes: [],
    rezStatusInfoes: [],
  });
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<IPages>({ perPage: 10, totalPage: 0 });

  useEffect(() => {
    axios
      .get(
        `http://localhost:5100/reservation/hospital/list?page=${page}&perPage=${pages.perPage}`,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const data = res.data.data;
        console.log(data);

        const check = data.ReservationsInfo;
        setPages({
          perPage: data.perPage,
          totalPage: data.totalHospitals,
        });
        setPage(data.page);
        setResInfo(check);
      });
  }, [page]);

  const InfoArr = [];
  // useCallback 사용해보기
  if (resInfo.Reservations.length > 0) {
    console.log(resInfo);
    const customer = resInfo.customerInfoes;
    const pet = resInfo.petInfoes;
    const rez = resInfo.Reservations;
    const rezStatus = resInfo.rezStatusInfoes;
    for (let i = 0; i < resInfo.Reservations.length; i++) {
      InfoArr.push({
        email: customer[i].email,
        rezDate: rez[i].rezDate,
        rezHour: rez[i].rezHour,
        name: customer[i].userName,
        petName: pet[i].name,
        species: pet[i].species,
        breed: pet[i].breed,
        age: pet[i].age,
        sex: pet[i].sex,
        weight: pet[i].weight,
        medicalHistory: pet[i].medicalHistory,
        vaccination: pet[i].vaccination,
        service: rez[i].service,
        price: rez[i].price,
        resName: rezStatus[i].name,
      });
    }
  }

  return (
    <Container>
      <Title>고객 예약 확인하기</Title>
      <Header>
        <Column>이메일</Column>
        <Column>날짜/시간</Column>
        <Column>고객 이름</Column>
        <Column>예약현황</Column>
        <Column></Column>
      </Header>

      {InfoArr.map((res: IInfoArrRes, i: number) => (
        <ReserveCard key={i} res={res} />
      ))}
      <Pagination
        total={pages?.totalPage}
        limit={pages.perPage}
        page={page}
        setPage={(page: number) => setPage(page)}
      />
    </Container>
  );
}

export default UserReserve;
