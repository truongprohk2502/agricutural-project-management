import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
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
    async getProducts(
        @Query('page', ParseIntPipe) page: number,
        @Query('size', ParseIntPipe) size: number,
    ) {
        return this.projectService.getList(page, size)
    }
}
