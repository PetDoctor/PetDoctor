import clientApi from '../Axios';
import { ReserveInfoType } from './ReserveTypes';

export const UserReserveAPI = {
  reservation: (bookInfo: any) => {
    return clientApi.post('/reservation/register', bookInfo);
  },

  getReserveInfo: (token: string, page: number, perPage: number) => {
    return clientApi.get(
      `/reservation/user/list?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  UpdateReserveState: (
    token: string,
    reserveId: string,
    reserveInfo: ReserveInfoType,
  ) => {
    return clientApi.patch(`/reservation/user/${reserveId}`, reserveInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getRezStatus: (token: string) => {
    return clientApi.get(`/reservationStatus/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
