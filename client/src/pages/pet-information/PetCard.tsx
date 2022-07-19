import React, { useState } from "react";
import axios from "axios";
import { PetInfoType } from "./PetInfoInterface";
import {
  PetCardContainer,
  DeleteBtn,
  ImgContainer,
  InfoContainer,
  InfoInput,
  InfoTextarea,
  NameInput,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
} from "./PetInfoStyle";
const token = localStorage.getItem("token");
function PetCard({ pet }: any) {
  const [select, setSelect] = useState("F");
  const onhandleDelete = (event: React.MouseEvent<HTMLElement>) => {
    const petId = { petId: pet._id };
    console.log(petId);

    axios
      .delete("http://localhost:5100/pet/delete", {
        data: { petId: pet._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // rerender해야힘
      });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelect(value);
  };
  return (
    <PetCardContainer>
      <DeleteBtn onClick={onhandleDelete}>
        <i className="fa-solid fa-circle-minus fa-xl"></i>
      </DeleteBtn>
      <Contents>
        <ImgContainer>
          <PetImg src="https://media.istockphoto.com/photos/crazy-looking-black-and-white-border-collie-dog-say-looking-intently-picture-id1213516345?k=20&m=1213516345&s=612x612&w=0&h=_XUSwcrXe5HjI2QEby0ex6Tl1fB_YJUzUU8o2cUt0YA=" />
        </ImgContainer>
        <InfoContainer>
          <NameInput value={pet.name} />
          <Contents>
            <InfoInput value={pet.species} />
            <InfoInput value={pet.breed} />
          </Contents>
          <InfoInput value={pet.age} />
          <InfoInput value={pet.weight} />
          <Contents>
            <Item>
              <RadioText>성별</RadioText>
            </Item>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="F"
                  checked={select === "F"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>F</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="M"
                  checked={select === "M"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>M</RadioText>
              </Item>
            </RadioContainer>
          </Contents>
          <Contents>
            <Item>
              <RadioText>중성화</RadioText>
            </Item>
            <RadioContainer>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="완료"
                  checked={select === "완료"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="미완료"
                  checked={select === "미완료"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>미완료</RadioText>
              </Item>
              <Item>
                <RadioButton
                  type="radio"
                  name="gender"
                  value="모름"
                  checked={select === "모름"}
                  onChange={(event) => handleSelectChange(event)}
                />
                <RadioButtonLabel />
                <RadioText>모름</RadioText>
              </Item>
            </RadioContainer>
          </Contents>
          <InfoTextarea value={pet.medicalHistorys} />
          <InfoTextarea value={pet.vaccination} />
          {/* <Btn>
        <i className="fa-solid fa-paw"></i>
      </Btn> */}
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
}

export default PetCard;