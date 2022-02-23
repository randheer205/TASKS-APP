/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { taskDTO } from "./dto/create.task.dto";
import { searchTaskDTO } from "./dto/search.task.dto";
import { TaskEntity } from "./task.entity";
import { TaskStatus } from "./task.model";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>
{
    async getTask(searchtaskdto:searchTaskDTO,user:UserEntity)
    {
        const {search,status}=searchtaskdto
        const query=this.createQueryBuilder('task')
        if(status)
        {
            //console.log("Status:",status)
            query.andWhere('task.status= :tstatus',{tstatus:status})
        }
        if(search)
        {
            //console.log("Search:",search)
            //IT NEEDS FULL TITLE OR DESCRIPTION TO GET
            //query.andWhere('(task.title LIKE :tsearch) OR (task.description LIKE :tsearch)',{tsearch:search})
            query.andWhere('(task.title LIKE :tsearch)',{tsearch:search}).orWhere('(task.description LIKE :tsearch)',{tsearch:search})
        }
        //const tasks=await this.find()
        //return tasks

        query.andWhere('task.userId = :userId',{userId:user.id})

        return await query.getMany()
    }

    async createTask(createtaskdto:taskDTO,user:UserEntity)
    {
        const task=new TaskEntity()
        task.title=createtaskdto.title
        task.description=createtaskdto.description
        task.status=TaskStatus.OPEN
        //THIS ONE HERE BELOW IS THE ONE RESPONSIBLE FOR USER'S TASKS
        task.user=user
        await task.save()
        return task
    }
}
