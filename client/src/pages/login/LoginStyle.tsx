import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

// 로그인 타이틀
const LoginTitle = styled.h3`
  margin: 0 auto;
  width: 340px;
  height: 20px;
  padding-bottom: 36px;
`;

// Login을 둘러싸고 있는 Wrapper
const LoginWrapper = styled.div`
  width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  text-align: center;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 12px;

  @media screen and (max-width: ${(props) => props.theme.device.mobile}) {
    width: 90%;
    padding: 20px;
  }
`;

// input
const LoginInput = styled(TextField)`
  display: block;
  width: 340px;
  height: 54px;

  @media screen and (max-width: ${(props) => props.theme.device.mobile}) {
    width: 100%;
  }
`;

const PasswordInput = styled(LoginInput)``;

// button
const LoginButton = styled(Button)`
  display: block;
  width: 340px;
  height: 54px;

  @media screen and (max-width: ${(props) => props.theme.device.mobile}) {
    width: 100%;
  }
`;

// register Button
const RegisterButton = styled(LoginButton)``;
const KakaoButton = styled(LoginButton)``;

const UserCheckBox = styled.div`
  display: flex;
  width: 340px;
  margin: 0 auto;
  align-items: center;
  @media screen and (max-width: ${(props) => props.theme.device.mobile}) {
    margin-bottom: 0.75rem;
  }
`;

const UserInput = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export {
  LoginButton,
  LoginWrapper,
  LoginInput,
  LoginTitle,
  RegisterButton,
  KakaoButton,
  PasswordInput,
  UserCheckBox,
  UserInput,
};
