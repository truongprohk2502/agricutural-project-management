import { Body, Controller, Post, Put, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('create')
    async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto)
    }
    
    @Put('update')
    async updateTask(@Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(updateTaskDto)
    }

    @Post('uploadImages')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files, @Body('taskId') taskId: string) {
        return this.taskService.uploadFiles(files, taskId)
    }
}
