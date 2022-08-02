// src/app.module.ts
import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      // env파일 스키마 점검
      validationSchema: Joi.object({
        MONGODB_CONNECTION: Joi.required(), // env파일에 원격으로 MongoDB에 접속하기 위해서 필요함
        NEST_PORT: Joi.number().default(3001), // NestJS의 포트를 지정함 Default는 3001
      }),
    }),
  MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
  UsersModule, // MongoDB에 접속
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
