import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ITagsProps } from './TagList';
import { IData } from '../../components/main/MainCard';

const TagImg = styled.img`
  width: 40px;
  transition: 0.2s all ease-in-out;
  @media screen and (max-width: 550px) {
    width: 24px;
  }
`;
interface ITagValue {
  tag: number;
  idx: number;
}

const TagWrapper = styled.div<ITagValue>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.idx === props.tag ? 'black' : props.theme.palette.gray};
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  border-bottom: 3px solid
    ${(props) => (props.idx === props.tag ? 'black' : 'white')};
  ${TagImg} {
    filter: contrast(${(props) => (props.idx === props.tag ? 1 : 0.1)});
  }

  &:hover {
    color: black;
    border-bottom: 3px solid
      ${(props) => props.idx !== props.tag && props.theme.palette.gray};
    ${TagImg} {
      filter: contrast(1);
    }
  }
`;

const TagName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 550px) {
    font-size: 0.6rem;
  }
`;

interface ITagData {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Tags = ({ setFiltered, setTotal, limit, page, setPage }: ITagsProps) => {
  // 바뀐 로컬 주소 URL
  const API_URL = 'http://localhost:5100';
  const [tagData, setTagData] = useState<ITagData[]>([]); // 태그 데이터 모음
  const [tag, setTag] = useState<number>(0); // 클릭 된 태그의 인덱스
  const [searchParams, setSearchParams] = useSearchParams();
  const [paramsTag, setParamsTag] = useState<string>('24시간');
  const [filterData, setFilterData] = useState<IData[]>([]);

  const getData = async () => {
    const res = await axios.get(`${API_URL}/hospitalTag/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTagData([...res.data]);
    initialList();
  };

  const initialList = async () => {
    const res = await axios.get(
      `${API_URL}/hospital/list/main?page=1&perPage=${limit}&tagName=${paramsTag}`,
    );
    const data = await res.data.data.hospitals;

    setFilterData(data);
  };

  useEffect(() => {
    getData();

    setPage(1);
    setFiltered(filterData);
    setParamsTag(tagData[tag]?.name || '24시간');
    setSearchParams({ page: '1', perPage: '4', tagName: paramsTag });
  }, []);

  useEffect(() => {
    const getNewData = async () => {
      const res = await axios.get(
        `${API_URL}/hospital/list/main?page=${page}&perPage=${limit}&tagName=${paramsTag}`,
      ); // TODO: tagName=tagState로 변경. page 변경
      const { data } = await res.data;
      setFilterData(data.hospitals);
      setSearchParams({
        page: page.toString(),
        perPage: limit.toString(),
        tagName: paramsTag,
      });
      setTotal(data.totalHospitals);
    };
    getNewData();
  }, [paramsTag, page]);

  useEffect(() => {
    setFiltered(filterData);
  }, [filterData]);

  const handleTagClick = (category: ITagData, idx: number) => {
    setParamsTag(category.name);
    setSearchParams({
      page: '1',
      perPage: limit.toString(),
      tagName: category.name,
    });
    setTag(idx);
    setPage(1);
  };

  return (
    <>
      {tagData.map((category: ITagData, idx: number) => {
        return (
          <TagWrapper
            key={category._id}
            idx={idx}
            onClick={() => handleTagClick(category, idx)}
            tag={tag}
          >
            <TagImg src={category.image} />
            <TagName>{category.name}</TagName>
          </TagWrapper>
        );
      })}
    </>
  );
};

export default Tags;
