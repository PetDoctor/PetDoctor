export interface LoginStateType {
  email: string;
  password: string;
}

export interface UserInfoType {
  userName: string;
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  email: string;
  password: string;
  phoneNumber: string;
  userStatus: string;
}

export interface UserAddress {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface DaumAddData {
  address: string;
  zonecode: string;
  roadAddress: string;
}

export interface PetInfoType {
  _id: string;
  owner: string;
  age: number;
  breed: string;
  image: string;
  medicalHistory: string;
  name: string;
  neutralized: string;
  sex: string;
  species: string;
  vaccination: string;
  weight: number;
}

export interface SubmitPetInfo {
  age: string;
  breed: string;
  image: File | null;
  medicalHistory: string;
  name: string;
  neutralized: string;
  sex: string;
  species: string;
  vaccination: string;
  weight: string;
}

export interface UserStatusType {
  userId: string;
  userStatus: string;
}

// 관리자 모든 회원 정보의 data type
export interface AdminUserInfoListType {
  InCaseOAuth: string;
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  createdAt: string;
  email: string;
  password: string;
  pet: string[];
  phoneNumber: string;
  role: string;
  updatedAt: string;
  userName: string;
  userStatus: string;
  __v: number;
  _id: string;
}
