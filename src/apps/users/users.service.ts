import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { FindUserInput, CreateUserInput } from 'src/dtos/user.input';
import { UserDocument, UserModel } from 'src/models/users.model';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: CreateUserInput): Promise<UserModel> {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    const newUser = new this.userModel(user);

    if (!newUser) {
      throw new InternalServerErrorException('User creation failed');
    }

    return newUser.save();
  }

  async getAllUsers(): Promise<UserModel[]> {
    return await this.userModel.find().exec();
  }

  async getUser(input: FindUserInput): Promise<UserModel> {
    let user: UserDocument;

    if (input?._id) {
      user = await this.userModel.findById(input?._id).exec();
    }

    if (input?.email) {
      user = await this.userModel.findOne({ email: input?.email }).exec();
    }

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async deleteUserById(_id: string): Promise<UserModel> {
    const user = await this.userModel.findByIdAndDelete(_id).exec();

    if (!user) {
      throw new NotFoundException(`User ${_id} not found`);
    }
    return user;
  }
}
