import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { CreateProjectDto } from 'src/dto/create-project.dto';
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

    @Get('list')
    async getProjectsList(
        @Query('page', ParseIntPipe) page: number,
        @Query('size', ParseIntPipe) size: number,
        @Query('is_active', ParseIntPipe) isActive: boolean
    ) {
        return this.projectService.getList(page, size, isActive)
    }

    @Get('detail/:id')
    async getDetailProject(@Param('id') id: string) {
        return this.projectService.getDetail(id)
    }

    @Post('uploadImages')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files, @Body('projectId') projectId: string) {
        return this.projectService.uploadFiles(files, projectId)
    }
}
