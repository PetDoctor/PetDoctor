export interface IReserveInfo {
  rezStatusId: string;
  customerId: string;
}

// TODO: type 수정
export interface IReservation {
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  age: number;
  breed: string;
  businessHours: number[];
  businessNumber: string;
  createdAt: string;
  customer: string;
  director: string;
  email: string;
  holiday: string[];
  hospRegStatus: string;
  hospStatus: string;
  hospital: string;
  hospitalCapacity: number;
  hpName: string;
  image: string;
  keyword: string[];
  licenseNumber: string;
  medicalHistory: string;
  message: string;
  name: string;
  neutralized: string;
  owner: string;
  password: string;
  pet: string;
  petName: string;
  phoneNumber: string;
  price: number;
  refreshToken: string;
  resName: string;
  reservationId: string;
  rezDate: string;
  rezHour: number;
  rezStatus: string;
  service: string;
  sex: string;
  species: string;
  starRating: number;
  tag: string[];
  updatedAt: string;
  vaccination: string;
  weight: number;
  __v: number;
  _id: string;
}
