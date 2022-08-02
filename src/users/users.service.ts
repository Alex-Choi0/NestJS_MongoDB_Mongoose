// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(
    // // User모델을 UsersService Class에 넣어준다.
    @InjectModel(Users.name)
    private userModel: mongoose.Model<Users>,
  ) {}

  // 유저 생성
  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userModel.create(createUserDto);
    return await createUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
