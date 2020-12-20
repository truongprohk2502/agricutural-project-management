import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { CreateActualProjectDto } from 'src/dto/create-actual-project.dto';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createSampleProject')
  async createSampleProject(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @JwtPayload() payload: any,
  ) {
    return this.projectService.createSample(createProjectDto, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createActualProject')
  @UseInterceptors(FileInterceptor('file'))
  async createActualProject(
    @Body(ValidationPipe) createProjectDto: CreateActualProjectDto,
    @JwtPayload() payload: any,
    @UploadedFile() file,
  ) {
    return this.projectService.createActual(createProjectDto, file, payload);
  }

  @Get('list')
  async getProjectsList(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('all', ParseBoolPipe) all: boolean,
  ) {
    return this.projectService.getList(page, size, all);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listByUser')
  async getListByUser(
    @Query('type') type: string,
    @Query('is_finished', ParseBoolPipe) isFinished: boolean,
    @JwtPayload() payload: any,
  ) {
    return this.projectService.getListByUser(type, isFinished, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listByUserId/:id')
  async getListByUserId(@Param('id') id: string) {
    return this.projectService.getListByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  async getDetailProject(@Param('id') id: string) {
    return this.projectService.getDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploadImages')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files,
    @Body('projectId') projectId: string,
  ) {
    return this.projectService.uploadFiles(files, projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProject(
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('removeImage/:projectId')
  async updateImageProject(
    @Body() images: [string],
    @Param('projectId') id: string,
  ) {
    return this.projectService.removeImages(images, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
