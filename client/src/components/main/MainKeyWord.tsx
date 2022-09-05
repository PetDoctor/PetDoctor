import React from 'react';
import { MainKeyWordContainer, MainKeyWordContent } from './MainKeyWordStyle';

export interface TKeyWord {
  mainKeyWord: string[];
}

// keyword를 뿌려줄 컴포넌트
const MainKeyWord = ({ mainKeyWord }: TKeyWord) => {
  const keyWordProps = mainKeyWord.map((keyWord, index) => (
    <MainKeyWordContent key={index}>{keyWord}</MainKeyWordContent>
  ));

  return <MainKeyWordContainer>{keyWordProps}</MainKeyWordContainer>;
};

export default MainKeyWord;
