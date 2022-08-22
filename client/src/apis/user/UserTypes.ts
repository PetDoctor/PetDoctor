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

export type ReserveInfoType = {
  rezStatusId: string;
  customerId: string;
};
