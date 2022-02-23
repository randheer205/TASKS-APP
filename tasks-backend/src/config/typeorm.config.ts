/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormconfig:TypeOrmModuleOptions={
    username:"root",
    password:"1234",
    port:3306,
    host:"localhost",
    database:"tasksapp",
    type:"mysql",
    entities:[__dirname+"/../**/*.entity.{ts,js}"],
    synchronize:false
}