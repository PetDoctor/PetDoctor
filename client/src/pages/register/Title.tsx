import React from 'react';
import styled from 'styled-components';

const TitleName = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

interface ITitle {
  title: string;
}

const Title = ({ title }: ITitle) => {
  return (
    <>
      <TitleName>{title}</TitleName>
    </>
  );
};

export default Title;
