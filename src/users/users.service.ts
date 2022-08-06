// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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

  // skip, take을 이용하여 유저 나열하기 createdAt기존으로 DESC
  async findAll(skip: number, take: number) {
    const result = await this.userModel
      .find({})
      .sort({ createdAt: -1 }) // 최신날짜가 0번 인덱스로 올라오도록 설정
      .skip(skip)
      .limit(take);
    return result;
  }

  // id를 이용하여 하나의 유저 찾기
  async findOne(id: string) {
    const result = await this.userModel.find({ id });
    console.log('findOne : ', result);
    return result[0] ? result[0] : false;
  }

  // id를 이용하여 하나의 document를 업데이트 하기
  async update(id: string, updateUserDto: UpdateUserDto) {
    // 해당 document가 존재하는지 확인하기
    const findOneDocument = await this.findOne(id);
    // 존재하지 않을시 if문 실행
    if (!findOneDocument)
      throw new NotFoundException('해당 document는 존재하지 않습니다.');
    // 존재할시 업데이트 하고 return
    return await this.userModel.updateOne(updateUserDto);
  }

  // id를 이용하여 하나의 document를 삭제
  async remove(id: string) {
    // 해당 document가 존재하는지 확인하기
    const findOneDocument = await this.findOne(id);
    // 존재하지 않을시 if문 실행
    if (!findOneDocument)
      throw new NotFoundException('해당 document는 존재하지 않습니다.');
    // 존재할시 삭제 하고 return
    return await this.userModel.deleteOne({ id });
  }
}
