import React, { useEffect, useState } from 'react';
import {
  PetCardContainer,
  DeleteBtn,
  ImgContainer,
  InfoContainer,
  InfoInput,
  InfoTextarea,
  NameInput,
  RadioContainer,
  RadioText,
  Item,
  PetImg,
  Contents,
  Button,
} from './PetInfoStyle';
import RadioBtn from '../../components/buttons/RadioBtn';
import { IPetInfo } from '../../apis/user/UserTypes';
import { PetAPI } from '../../apis/user/User';

const defaultImg = '/defaultImg.png';
const PetCard = ({
  pet,
  idx,
  onhandleDelete,
}: {
  pet: IPetInfo;
  idx: number;
  onhandleDelete: (id: string) => void;
}) => {
  const token = localStorage.getItem('token') || '';
  const [petInfo, setPetInfo] = useState<IPetInfo>({
    _id: '',
    image: '',
    owner: '',
    species: '',
    breed: '',
    name: '',
    age: 0,
    sex: '',
    weight: 0,
    medicalHistory: '',
    vaccination: '',
    neutralized: '',
  });
  const [gender, setGender] = useState(pet.sex);
  const [neut, setNeut] = useState(pet.neutralized);

  useEffect(() => {
    setPetInfo(pet);
  }, [pet]);

  const onInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = {
      ...petInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    setPetInfo(data);
  };

  const onhandleUpdate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const info = {
      ...petInfo,
      petId: pet._id,
      sex: gender,
      neutralized: neut,
    };
    try {
      PetAPI.UpdatePetInfo(token, info);
    } catch (err) {
      console.log(err);

      // alert("입력값을 다시 한 번 확인해주세요 🥲");
    }
  };

  return (
    <PetCardContainer>
      <DeleteBtn
        onClick={() => {
          onhandleDelete(pet._id);
        }}
      >
        <i className="fa-solid fa-circle-minus fa-xl"></i>
      </DeleteBtn>
      <Contents>
        <ImgContainer>
          <PetImg src={petInfo.image || defaultImg} />
        </ImgContainer>
        <InfoContainer>
          <NameInput
            name="name"
            onChange={onInputChange}
            value={petInfo.name}
          />
          <Contents>
            <InfoInput
              name="species"
              onChange={onInputChange}
              value={petInfo.species}
            />
            <InfoInput
              name="breed"
              onChange={onInputChange}
              value={petInfo.breed}
            />
          </Contents>
          <InfoInput
            name="age"
            type="number"
            value={petInfo.age}
            onChange={onInputChange}
          />
          <InfoInput
            name="weight"
            type="number"
            onChange={onInputChange}
            value={petInfo.weight}
          />
          <Contents>
            <Item>
              <RadioText>성별</RadioText>
            </Item>
            <RadioContainer>
              <RadioBtn
                value="F"
                state={gender}
                name={`${idx}gender`}
                setFunc={(gender: string) => {
                  setGender(gender);
                }}
              />
              <RadioBtn
                value="M"
                state={gender}
                name={`${idx}gender`}
                setFunc={(gender: string) => {
                  setGender(gender);
                }}
              />
            </RadioContainer>
          </Contents>
          <Contents>
            <Item>
              <RadioText>중성화</RadioText>
            </Item>
            <RadioContainer>
              <RadioBtn
                value="완료"
                state={neut}
                name={`${idx}neutralized`}
                setFunc={(status: string) => {
                  setNeut(status);
                }}
              />
              <RadioBtn
                value="미완료"
                state={neut}
                name={`${idx}neutralized`}
                setFunc={(status: string) => {
                  setNeut(status);
                }}
              />
              <RadioBtn
                value="모름"
                state={neut}
                name={`${idx}neutralized`}
                setFunc={(status: string) => {
                  setNeut(status);
                }}
              />
            </RadioContainer>
          </Contents>
          <InfoTextarea
            name="medicalHistory"
            onChange={onInputChange}
            value={petInfo.medicalHistory}
          />
          <InfoTextarea
            name="vaccination"
            onChange={onInputChange}
            value={petInfo.vaccination}
          />
          <Button onClick={onhandleUpdate}>
            <i className="fa-solid fa-paw"></i>저장
          </Button>
        </InfoContainer>
      </Contents>
    </PetCardContainer>
  );
};

export default PetCard;
