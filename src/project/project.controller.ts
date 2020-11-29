import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { CreateActualProjectDto } from 'src/dto/create-actual-project.dto';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(new JwtAuthGuard())
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post('createSampleProject')
    async createSampleProject(
        @Body(ValidationPipe) createProjectDto: CreateProjectDto,
        @JwtPayload() payload: any,
    ) {
        return this.projectService.createSample(createProjectDto, payload)
    }

    @Post('createActualProject')
    @UseInterceptors(FileInterceptor('file'))
    async createActualProject(
        @Body(ValidationPipe) createProjectDto: CreateActualProjectDto,
        @JwtPayload() payload: any,
        @UploadedFile() file
    ) {
        return this.projectService.createActual(createProjectDto, file, payload)
    }

    @Get('list')
    async getProjectsList(
        @Query('page', ParseIntPipe) page: number,
        @Query('size', ParseIntPipe) size: number,
        @Query('is_active', ParseBoolPipe) isActive: boolean
    ) {
        return this.projectService.getList(page, size, isActive)
    }

    @Get('listByUser')
    async getListByUser(@Query('type') type: string, @Query('is_finished', ParseBoolPipe) isFinished: boolean, @JwtPayload() payload: any) {
        return this.projectService.getListByUser(type, isFinished, payload)
    }

    @Get('detail/:id')
    async getDetailProject(@Param('id') id: string) {
        return this.projectService.getDetail(id)
    }

    @Post('uploadImages')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files, @Body('projectId') projectId: string) {
        return this.projectService.uploadFiles(files, projectId)
    }

    @Put('update')
    async updateProject(@Body(ValidationPipe) updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(updateProjectDto)
    }
}
