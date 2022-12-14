// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schemas';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
