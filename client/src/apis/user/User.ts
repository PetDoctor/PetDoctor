import clientApi from '../Axios';
import {
  IPetInfo,
  IUserInfoType,
  ILoginState,
  IUserStatus,
  ISubmitPetInfo,
} from './UserTypes';

export const UserLogAPI = {
  login: (loginInfo: ILoginState) => {
    return clientApi.post('/api/login', loginInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  logout: () => {
    return clientApi.get('/api/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  register: (registerInfo: IUserInfoType) => {
    return clientApi.post('/api/register', JSON.stringify(registerInfo), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export const UserAPI = {
  getUserInfo: (token: string) => {
    return clientApi.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllUserInfo: (token: string, page: number, perPage: number) => {
    return clientApi.get(`/api/userlist?page=${page}&perPage=${perPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  UpdateUserStatus: (token: string, statusInfo: IUserStatus) => {
    return clientApi.patch(`/api/admin/status`, statusInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  UpdateUserInfo: (token: string, email: string, userInfo: IUserInfoType) => {
    return clientApi.patch(`/api/users/${email}`, userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  ExpirationUserInfo: (token: string) => {
    return clientApi.patch(
      `/api/expiration`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // .then((res) => {
    //   // 로그아웃 함수 빼기
    // });
  },
};

// Discussion -> 파일 분리?
export const PetAPI = {
  getPetInfo: (token: string) => {
    return clientApi.get('/pet/mypets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  AddPetInfo: (token: string, petInfo: ISubmitPetInfo) => {
    return clientApi.post('/pet/register', petInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  DeletePetInfo: (token: string, id: string) => {
    return clientApi.delete('/pet/delete', {
      data: { petId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  UpdatePetInfo: (token: string, petInfo: IPetInfo) => {
    return clientApi.patch('/pet/update', petInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
