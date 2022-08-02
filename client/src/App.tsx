import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserMypage from './pages/user-mypage/UserMypage';
import UserInfo from './pages/user-info/UserInfo';
import HospitalMypage from './pages/hospital-mypage/HospitalMypage';
import HospitalInfo from './pages/hospital-info/HospitalInfo';
import AdminMypage from './pages/admin-mypage/AdminMypage';
import Home from './pages/home/Home';
import AdminUserList from './pages/admin-userlist/AdminUserList';
import Detail from './pages/detail/Detail';
import AdminHospitalList from './pages/admin-hplist/AdminHospitalList';
import PetInformation from './pages/pet-information/PetInformation';
import HospitalReserve from './pages/hospital-reserve/HospitalReserve';

import UserReserve from './pages/user-reserv/UserReserve';
import Layout from './components/Layout';
import AdminReserve from './pages/admin-reserv/AdminReserve';
import PrivateRouter from './utils/PrivateRouter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더 푸터 x */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 헤더 푸터 o */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
          <Route path="/hospital/:hospitalName/detail" element={<Detail />} />
          <Route path="/hospital/:hospitalName/Services" element={<Detail />} />
          {/* 토큰 인증이 필요한 페이지 */}
          <Route element={<PrivateRouter authentication={true} />}>
            <Route path="/user-mypage" element={<UserMypage />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/pet-info" element={<PetInformation />} />
            <Route path="/user-reservation" element={<UserReserve />} />
            <Route path="/admin-mypage" element={<AdminMypage />} />
            <Route path="/admin-userlist" element={<AdminUserList />} />
            <Route path="/admin-hplist" element={<AdminHospitalList />} />
            <Route path="/admin-reserv" element={<AdminReserve />} />
          </Route>
          {/* 호진 TODO: 병원 정보의 경우에는 cookie로 관리하기 때문에 추후 role을 확인하여 작업하겠습니다. */}
          <Route path="/hospital-mypage" element={<HospitalMypage />} />
          <Route path="/hospital-info" element={<HospitalInfo />} />
          <Route path="/hospital-reservation" element={<HospitalReserve />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
