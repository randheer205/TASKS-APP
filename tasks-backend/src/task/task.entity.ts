/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity";
import { UserModule } from "src/user/user.module";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity('Task')
export class TaskEntity extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    description:string
    @Column()
    status:TaskStatus

    @ManyToOne(type=>UserEntity,user=>user.tasks,{eager:false})
    user:UserEntity

    @Column()
    userId:number
}