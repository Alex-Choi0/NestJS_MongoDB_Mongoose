// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true, // document 작성시 시간 기록
})
export class Users {

  @Prop({ unique: true }) // 유저 id
  id: string;

  @Prop() // 유저 이름
  name: string;

  @Prop() // 유저 전화번호
  mobile: string;

  @Prop() // 유저 나이
  age: number;

  @Prop({ type: 'Array' }) // 유저 취미
  hobby: string[];

  @Prop({ type: 'Object' }) // 유저 기타사항
  etc: object;
}

export const UserSchema = SchemaFactory.createForClass(Users);
