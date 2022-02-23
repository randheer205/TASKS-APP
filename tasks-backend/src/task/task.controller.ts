/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { taskDTO } from './dto/create.task.dto';
import { searchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private taskService:TaskService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@GetUser() user:UserEntity,@Body() taskdto:taskDTO)
    {
        //console.log(taskdto)
        return this.taskService.createTask(taskdto,user)
    }

    @Get()
    getTask(@GetUser() user:UserEntity,@Query() searchTaskdto:searchTaskDTO)
    {
        return this.taskService.getTask(searchTaskdto,user)
    }

    @Patch('/:id/:status')
    updateTaskStatus(@GetUser() user:UserEntity,@Param('id') id:string, @Param('status') status:TaskStatus)
    {
        console.log("status "+status+" id "+id)
        return this.taskService.updateTaskStatus(id,status)
    }

    @Delete('/:id')
    deleteTask(@GetUser() user:UserEntity,@Param('id') id:string)
    {
        return this.taskService.deleteTask(id)
    }
}
