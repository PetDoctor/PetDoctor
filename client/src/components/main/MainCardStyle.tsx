import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 324px);
  justify-content: center;
  justify-items: center;
  padding-top: 20px;
  grid-row-gap: 20px;
  @media screen and (max-width: 550px) {
    display: flex;
    flex-wrap: wrap;
    padding: 0px;
    margin: 0;
    justify-content: center;
  }
`;

const MainCardContainer = styled(Link)`
  width: 290px;
  height: 385px;
  margin: 24px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
    color: black;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const MainCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 10px 0 10px;
`;

const MainCardName = styled.div`
  font-weight: 700;
`;

const MainCardAdress = styled.div`
  margin-top: 8px;
  color: rgb(113, 113, 113);
`;

const MainCardImg = styled.img`
  border-radius: 10px;
  width: 300px;
  height: 285px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export {
  MainCardContainer,
  MainCardWrapper,
  MainCardContent,
  MainCardName,
  MainCardAdress,
  MainCardImg,
};
