import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserInput } from 'src/dtos/user.input';
import { UserDocument, UserModel } from 'src/models/users.model';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: UserInput): Promise<UserModel> {
    try {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async getAllUsers(): Promise<UserModel[]> {
    try {
      const users = await this.userModel.find().lean();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async deleteUserById(id: string): Promise<UserModel> {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async updateUser(email: string, json: any): Promise<UserModel> {
    const user = await this.userModel
      .findOneAndUpdate({ email }, json, { new: true })
      .exec();

    if (!user) {
      throw new InternalServerErrorException('User update failed');
    }
    return user;
  }
}
