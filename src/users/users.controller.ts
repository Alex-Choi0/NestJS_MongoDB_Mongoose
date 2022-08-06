// src/users/users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users Api')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '유저를 생성한다',
    description: 'MongoDB에 저장할 유저를 생성한다',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '전체 조회',
    description:
      'skip, take을 이용하여 MongoDB의 컬렉션 내에 있는 Documents를 조회한다.',
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    example: 0,
  })
  async findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return await this.usersService.findAll(skip, take);
  }

  @Get(':id')
  @ApiOperation({
    summary: '한개의 Document 조회',
    description: 'id를 이용하여 한개의 Document를 조회한다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'abc123',
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
