import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('list/:phaseId')
  async getListTask(@Param('phaseId') phaseId: string) {
    return this.taskService.getList(phaseId);
  }

  @Post('create')
  async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Put('update')
  async updateTask(@Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Post('uploadImages')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files, @Body('taskId') taskId: string) {
    return this.taskService.uploadFiles(files, taskId);
  }

  @Put('removeImage/:taskId')
  async updateImageTask(@Body() images: [string], @Param('taskId') id: string) {
    return this.taskService.removeImages(images, id);
  }

  @Delete('delete/:id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
