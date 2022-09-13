import React from 'react';
import styled from 'styled-components';
import { CalendarTitle } from '../../pages/detail/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { reservationState } from '../../state/ReservationState';

const TimeWrapper = styled.div`
  margin-top: 20px;
`;

const TimeContainer = styled.button`
  width: 55px;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  margin: 0 5px 5px;
  border: none;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.palette.orange};
  background-color: ${(props) => props.theme.palette.orange};
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:focus {
    border: 1px solid #fa9829;
    background-color: #fa9829;
  }
`;

const TimeTitle = styled(CalendarTitle)``;

const TimeButtonWrapper = styled.div`
  border: 1px solid #a0a096;
  padding: 10px;
`;
interface TTimeProps {
  time: number[];
}

const TimeButton = ({ time }: TTimeProps) => {
  const [bookTime, setBookTime] = useRecoilState(reservationState);

  const handleChangeTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setBookTime({
      ...bookTime,
      rezHour: e.currentTarget.value,
    });
  };

  const timeButtonItems = time.map((item, index) => (
    <TimeContainer key={index} value={item} onClick={handleChangeTime}>
      {item}:00
    </TimeContainer>
  ));

  return (
    <TimeWrapper>
      <div style={{ marginBottom: '20px' }}>
        <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faClockFour} />
        <TimeTitle>시간</TimeTitle>
      </div>
      <TimeButtonWrapper>{timeButtonItems}</TimeButtonWrapper>
    </TimeWrapper>
  );
};

export default TimeButton;
