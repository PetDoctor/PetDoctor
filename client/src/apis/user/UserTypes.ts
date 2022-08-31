export type LoginStateType = {
  email: string;
  password: string;
};

export type UserInfoType = {
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
};

export type UserAddress = {
  postalCode: string;
  address1: string;
  address2: string;
};

export type DaumAddData = {
  address: string;
  zonecode: string;
  roadAddress: string;
};

export type PetInfoType = {
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
};

export type SubmitPetInfo = {
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
};

export type UserStatusType = {
  userId: string;
  userStatus: string;
};

// 관리자 모든 회원 정보의 data type
export type AdminUserInfoListType = {
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
};
