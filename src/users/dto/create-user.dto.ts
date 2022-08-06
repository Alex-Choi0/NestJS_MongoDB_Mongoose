// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 고유ID',
    type: String,
    example: 'abc123',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 이름',
    type: String,
    example: 'alex',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 전화번호',
    type: String,
    example: '01035451268',
  })
  mobile: string;

  @IsInt()
  @Min(20)
  @Max(99)
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 나이(가입 가능나이 20 ~ 99세)',
    type: Number,
    example: 30,
  })
  age: number;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: '취미 입력(배열)',
    type: Array,
    example: ['자전거', '수영', '암벽등반'],
  })
  hobby: string[];

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: '유저의 기타사항 입력',
    type: Object,
    example: {
      character: '성격 좋음',
      girlfriend: {
        Jain: {
          age: 20,
          height: 175,
          address: 'seoul',
        },
        Jasmine: {
          age: 19,
          height: 170,
          address: 'busan',
        },
      },
      cars: {
        Lamborghini: {
          Miura: {
            amount: 2,
            color: ['black', 'white'],
          },
        },
      },
    },
  })
  etc: object;
}
