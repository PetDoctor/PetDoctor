import React, { useState } from 'react';
import {
  MainContainer,
  Title,
  Form,
  Container,
  InputLabel,
  InfoInput,
  InfoBtn,
  DeactivateContainer,
  DeactiveBtn,
  Divider,
} from '../../components/InfoForm';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { ModalStyle } from '../../components/ModalStyle';

const InfoContent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpenClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const completeHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MainContainer>
      <Title>병원 정보</Title>
      <Form>
        <Container>
          <InputLabel>병원명</InputLabel>
          <InfoInput name="hospitalName" placeholder="병원" />
        </Container>
        <Container>
          <InputLabel>이름</InputLabel>
          <InfoInput name="hospitalUserName" placeholder="이름" />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput name="email" placeholder="이메일" />
        </Container>
        <Container>
          <InputLabel>비밀번호 수정</InputLabel>
          <InfoInput
            type="password"
            autoComplete="off"
            placeholder="새 비밀번호"
          />
        </Container>
        <Container>
          <InputLabel>전화번호</InputLabel>
          <InfoInput name="phoneNumber" placeholder="전화번호" />
        </Container>
        <Container>
          <InputLabel>사업자 등록 번호</InputLabel>
          <InfoInput name="businessNumber" placeholder="사업자 등록 번호" />
        </Container>
        <Container>
          <InputLabel>면허 번호</InputLabel>
          <InfoInput name="licenseNumber" placeholder="면허 번호" />
        </Container>
        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput name="postalCode" disabled />
          <InfoBtn onClick={onOpenClick}>주소찾기</InfoBtn>
          <Modal isOpen={isOpen} ariaHideApp={false} style={ModalStyle}>
            <DaumPostcode onComplete={completeHandler} />
          </Modal>
          <Divider>
            <InfoInput name="address1" disabled />
            <InfoInput name="address2" placeholder="상세주소를 입력해주세요" />
          </Divider>
        </Container>
        <Container>
          <InputLabel>비밀번호 확인</InputLabel>
          <InfoInput
            type="password"
            autoComplete="off"
            placeholder="정보 수정 시 현재 비밀번호를 입력해주세요"
          />
        </Container>

        <div style={{ display: 'flex' }}>
          <InfoBtn style={{ marginLeft: 'auto' }}>수정</InfoBtn>
        </div>
      </Form>
      <DeactivateContainer>
        <p>Animal Hospital에서 탈퇴하고 싶으신가요?</p>
        <DeactiveBtn>탈퇴하기</DeactiveBtn>
      </DeactivateContainer>
    </MainContainer>
  );
};

export default InfoContent;
