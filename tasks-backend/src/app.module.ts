/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';

@Module({
  imports: [UserModule, TaskModule,TypeOrmModule.forRoot(typeormconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
