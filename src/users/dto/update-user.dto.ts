// src/users/dto/update-user.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmpty()
  @ApiProperty({
    readOnly: true,
  })
  id: string;
}
