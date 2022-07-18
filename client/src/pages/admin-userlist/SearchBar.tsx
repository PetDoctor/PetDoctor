import React, { useRef, useState } from "react";
import styled from "styled-components";
import UserCard from "./UserCard";
const Container = styled.div`
  width: 88%;
  padding: 0.7em 1em;
  font-size: 1.1em;
  outline: none;
  border: none;
`;
const Searchbar = styled.form`
  width: 35em;
  border-radius: 25px;
  border: #d6d6d6 1px solid;
  padding: 0 1em;
  :hover {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }
`;
const SearchInput = styled.input`
  width: 88%;
  padding: 0.7em 1em;
  font-size: 1.1em;
  outline: none;
  border: none;
`;
const SumbitBtn = styled.button`
  background: none;
  border: none;
`;
function SearchBar({ datas }: any) {
  const [name, setName] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const SearchLists = datas.filter((data: any) =>
    data.userName.includes(`${name}`)
  );

  // datas.map((data: any) => console.log(data.userName));
  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log(searchRef.current?.value);
    setName(searchRef.current?.value);
    formRef.current?.reset();
  };
  return (
    <Container>
      <Searchbar ref={formRef}>
        <span>🔍</span>
        <SearchInput ref={searchRef} type="text" />
        <SumbitBtn onClick={onSubmit}></SumbitBtn>
      </Searchbar>
      {SearchLists.map((data: any, i: number) => (
        <UserCard key={i} data={data} />
      ))}
    </Container>
  );
}

export default SearchBar;
