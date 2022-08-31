import mongoose, { model, Types } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';
import {
  IUserAddress,
  UserInfo,
  UserData,
  StatusInfoRequired,
  UserStatus,
} from '../../types/UserTypes';

const User = model('users', UserSchema);
interface ToUpdate {
  email: string;
  update: {
    [key: string]: string | IUserAddress | object[];
  };
}

export class UserModel {
  async findByEmail(email: string): Promise<UserData | null> {
    const user = await User.findOne({ email });

    return user;
  }

  async create(userInfo: UserInfo): Promise<UserInfo> {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findById(userId: string): Promise<UserData> {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('정보를 찾을 수 없습니다');
    }
    return user;
  }

  async update({ email, update }: ToUpdate): Promise<UserData> {
    const filter = { email: email };
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    if (!updatedUser) {
      throw new Error('유저 상태를 찾을 수 없습니다');
    }
    return updatedUser;
  }

  async findAll(): Promise<UserData[]> {
    const users = await User.find({});
    return users;
  }

  //유저 정보의 pagination 추가함
  async findAllByPage(page: number, perPage: number): Promise<any> {
    const total = await User.countDocuments({});
    const users = await User.find({})
      .sort({ createdA: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    const totalPage = Math.ceil(total / perPage);
    const usersPerPage = { users, page, perPage, totalPage };
    // return usersPerPage;
    return users;
  }

  async statusExpired({ userId }: StatusInfoRequired): Promise<string> {
    const filter = { _id: userId };
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { userStatus: 'expired' },
      option
    );
    console.log(updatedUser);

    if (!updatedUser) {
      throw new Error('유저 상태를 찾을 수 없습니다');
    }
    const updatedStatus = updatedUser.userStatus;
    return updatedStatus;
  }

  //관리자의 유저 상태 변경
  async updateUserStatus(
    statusInfoRequired: StatusInfoRequired
  ): Promise<UserData> {
    const { userId, userStatus } = statusInfoRequired;
    const filter = { _id: userId };
    const toUpdate =
      userStatus === UserStatus.EXPIRED
        ? UserStatus.NORMAL
        : UserStatus.EXPIRED;
    console.log(toUpdate);
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { userStatus: toUpdate },
      option
    );
    console.log(updatedUser);
    if (!updatedUser) {
      throw new Error('사용자 상태를 변경할 수 없습니다.');
    }
    return updatedUser;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const filter = { _id: userId };
    const updatedUser = await User.findOneAndUpdate(filter, {
      $set: {
        refreshToken,
      },
    });
    return updatedUser;
  }

  async deleteRefreshToken(userId: string) {
    const filter = { _id: userId };
    const updatedUser = await User.findOneAndUpdate(filter, {
      $unset: {
        refreshToken: '',
      },
    });
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
