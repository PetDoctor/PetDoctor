import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

// api 호출 시 사용할 인스턴스
const clientApi = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export default clientApi;
