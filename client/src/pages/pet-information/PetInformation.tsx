import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import { MainContainer, AddBtn } from './PetInfoStyle';
import AddPet from './AddPet';
import { PetAPI } from '../../apis/user/User';
import { PetInfoType, SubmitPetInfo } from '../../apis/user/UserTypes';

function PetInformation() {
  const token = localStorage.getItem('token') || '';
  const [pets, setPets] = useState<PetInfoType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 처음 한 번 서버 통신
  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    await PetAPI.getPetInfo(token) //
      .then((res) => setPets(res.data));
  };

  const onhandleDelete = async (id: string) => {
    await PetAPI.DeletePetInfo(token, id);
    // todo 삭제 후 확인 메시지
    await reload();
  };

  const onhandleAdd = async (petInfo: SubmitPetInfo) => {
    try {
      await PetAPI.AddPetInfo(token, petInfo);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer>
      <h1>내 펫 정보 확인</h1>
      <AddBtn onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </AddBtn>
      {isOpen && (
        <AddPet
          onhandleAdd={(petInfo: SubmitPetInfo) => {
            onhandleAdd(petInfo);
          }}
        />
      )}
      {pets.map((pet, i) => (
        <PetCard pet={pet} idx={i} key={i} onhandleDelete={onhandleDelete} />
      ))}
    </MainContainer>
  );
}

export default PetInformation;
