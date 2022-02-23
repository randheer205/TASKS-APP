/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as crypt from "crypto-js"
import { TaskEntity } from "src/task/task.entity";

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string

    @OneToMany((type)=>TaskEntity,(task)=>task.user,{eager:true})
    tasks:TaskEntity[]

    async validatePassword(password:string)
    {
        const encp=crypt.MD5(password).toString()
        return encp==this.password
    }
}