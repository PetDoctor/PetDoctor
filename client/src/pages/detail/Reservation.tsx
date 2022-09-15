import React from 'react';
import styled from 'styled-components';
import CalendarUi from './Calendar';
import TimeButton from '../../components/detail/TimeButton';
import HospitalService from './HospitalService';
import PetSelect from './PetSelect';
const Reserve = ({ hospitalInfo, handleLoginBtn }: any) => {
  return (
    <ReservationDiv>
      <CalendarUi />
      {hospitalInfo.businessHours && (
        <TimeButton time={hospitalInfo.businessHours} />
      )}
      <HospitalService />
      <PetSelect />
      <div>
        <BookingButton onClick={handleLoginBtn}>예약 하기</BookingButton>
      </div>
    </ReservationDiv>
  );
};

const ReservationDiv = styled.div``;

const BookingButton = styled.button`
  margin: 20px;
  width: 328px;
  height: 52px;
  background-color: ${(props) => props.theme.palette.orange};
  color: #fff;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #fea138;
  }
`;

export default Reserve;
