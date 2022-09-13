import styled from 'styled-components';
import { Button } from '../pet-information/PetInfoStyle';

const MainContainer = styled.div`
  max-width: 62.5rem;
  margin: 1rem auto;
  @media screen and (max-width: 50rem) {
    width: 100%;
    margin: 0rem;
  }
`;
const Header = styled.div`
  margin: 24px 0;
  @media screen and (max-width: 50rem) {
    display: none;
    margin-top: 0;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  cursor: pointer;
  @media screen and (max-width: 50rem) {
    width: 100%;
  }
`;
const MainImg = styled.img`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  @media screen and (max-width: 50rem) {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
const RightTopImg = styled.img`
  border-top-right-radius: 10px;
  width: 320px;
  height: 50%;
  @media screen and (max-width: 50rem) {
    display: none;
  }
`;
const RightBottomImg = styled.img`
  border-bottom-right-radius: 10px;
  width: 320px;
  @media screen and (max-width: 50rem) {
    display: none;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  @media screen and (max-width: 50rem) {
    flex-direction: column;
  }
`;
const InfoContainer = styled.div`
  flex: 0 0 60%;
  @media screen and (max-width: 50rem) {
    padding: 0rem 1rem;
  }
`;
const ReservationContainer = styled.div`
  padding: 1rem;
  flex: 0 0 40%;
  @media screen and (max-width: 50rem) {
    display: none;
  }
`;
const InfoDiv = styled.div`
  padding-top: 48px;
  padding-bottom: 24px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const MainInfo = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const ReviewContainer = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
`;
const Reservation = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
`;
const InfoTitle = styled.h2``;
export const Add = styled.div`
  padding: 1rem 0;
  color: ${(props) => props.theme.palette.gray};
  margin-bottom: 1rem;
`;
export const ServiceDiv = styled.div`
  padding: 2rem 0.2rem;
`;
export const ServiceCol = styled.div`
  display: flex;
`;
export const Ser = styled.div`
  width: 10rem;
  padding: 0.2rem;
  font-size: 1.05rem;
  color: #565656;
`;
export const ResButton = styled(Button)`
  display: none;
  @media screen and (max-width: 50rem) {
    display: block;
  }
`;

export {
  InfoTitle,
  Reservation,
  ReviewContainer,
  MainInfo,
  InfoDiv,
  ReservationContainer,
  InfoContainer,
  ContentContainer,
  RightBottomImg,
  RightTopImg,
  MainImg,
  ImgContainer,
  Header,
  MainContainer,
};
