import clientApi from '../Axios';
import { ILoginState } from '../user/UserTypes';

export const HospitalLogAPI = {
  login: (loginInfo: ILoginState) => {
    return clientApi.post('/hospital/login', loginInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  logout: () => {
    return clientApi.get('/hospital/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  // any 타입 수정!
  register: (registerInfo: any) => {
    return clientApi.post('/hospital/register', JSON.stringify(registerInfo), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // 병원 탈퇴
  withdrawal: () => {
    return clientApi.patch('/hospital/withdrawal');
  },
};

export const HospitalAPI = {
  // 병원 상세 정보(병원 유저)
  getHospitalInfo: () => {
    return clientApi.get(`hospital/detail`);
  },

  // 상세페이지
  getHospitalDetail: (hospitalName: string | undefined) => {
    return clientApi.get(`/hospital/${hospitalName}/detail`);
  },

  // 상세페이지
  getHospitalService: (hospitalName: string | undefined) => {
    return clientApi.get(`/hospital/${hospitalName}/Services`);
  },

  // 병원 리스트 조회(메인페이지 태그)
  getHospitalList: (page: number, perPage: number, tagName: string) => {
    return clientApi.get(
      `/hospital/list/main?page=${page}&perPage=${perPage}&tagName=${tagName}`,
    );
  },
  // 관리자 병원 리스트 조회
  getAdminHospitalList: (page: number, perPage: number) => {
    return clientApi.get(
      `/hospital/admin/list/?option=HospRegStatus&content=62cc3c6432b6e445bc83920b&page=${page}&perPage=${perPage}`,
    );
  },
  // 관리자 병원 정보 수정(병원 상태/ 병원 등록 상태만)
  updateHospitalStatus: (hospitalName: string) => {
    return clientApi.get(`/hospital/admin/${hospitalName}`);
  },
};
