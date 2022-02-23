/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { taskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid'
import { searchTaskDTO } from './dto/search.task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TaskService {
    //private tasks:Task[]=[]

    constructor(
        @InjectRepository(TaskRepository)
        private taskrepo:TaskRepository
    )
    {}

    async createTask(taskdto:taskDTO,user:UserEntity)
    {

        /*const uid=uuid.v1()

        //THIS ONE CREATES NEW TASK WHEN WE TELL IT TO CREATE 
        //      |   |
        //      V   V                                              
        const task: Task = {
            id:uid,
            title:taskdto.title,
            description:taskdto.description,
            status:TaskStatus.OPEN,
        }
        //THEN WE PUSH ABOVE 'task' VARIABLE INTO 'tasks' ARRAY|
        this.tasks.push(task)   //<-----------------------------
        return this.tasks*/

        return this.taskrepo.createTask(taskdto,user)

    }

    async getTask(searchTaskdto:searchTaskDTO,user:UserEntity)
    {
        //const{search,status}=searchTaskdto
        //THIS tasks VARIABLE & ABOVE GLOBAL tasks ARRAY VARIABLE ARE TWO DIFFS. WE ARE USING LOCAL ONE TO SEACH & RETURN
        /*let tasks=this.tasks
        if(search)
        {
            tasks=tasks.filter((task)=>{
                return task.title.includes(search)||task.description.includes(search)
            })
        }
        if(status)
        {
            tasks=tasks.filter((task)=>{
                return task.status==status
            })
        }
        return tasks*/
        return this.taskrepo.getTask(searchTaskdto,user)
    }

    async getTaskByID(id:string)
    {
        const task=await this.taskrepo.findOne(id)
        if(!task)
        {
            throw new NotFoundException("TASK NOT FOUND")
        }
        return task
    }

    async updateTaskStatus(id:string,status:TaskStatus)
    {
        /*const task=this.tasks.find((task)=>{
            return task.id==id
        })

        if(!task)
        {
            throw new NotFoundException("TASK NOT FOUND")
        }
        task.status=status
        return task*/
        const task=await this.getTaskByID(id)
        task.status=status
        await task.save()
        return task
    }

    async deleteTask(id:string)
    {   
        const result=await this.taskrepo.delete(id)
        if(result.affected==0)
        {
            throw new NotFoundException("TASK NOT FOUND")
        }
        return result
    }
}
