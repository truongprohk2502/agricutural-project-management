import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { Model } from 'mongoose';
import { Project } from 'src/interfaces/project.interface';
import { UsersService } from 'src/users/users.service';
import { uuid } from 'uuidv4';
import * as fs from 'fs';
import { config } from 'dotenv';
import { UpdateProjectDto } from 'src/dto/update-project.dto';

config();

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        private readonly usersService: UsersService
    ) { }

    async createSample(createProjectDto: CreateProjectDto, payload: any) {
        const { email, type } = payload
        let account = type === 'local' ? await this.usersService.findByLocalEmail(email) : this.usersService.findOneByGmail(email)
        const project = new this.projectModel({
            author: account,
            ...createProjectDto
        })
        project.save()
        return project
    }

    async getList(page: number, size: number, isActive: boolean) {
        return this.projectModel.find({ isActive }, { author: 0 }, { skip: page * size, limit: size })
    }

    async uploadFiles(files: [any], projectId: string) {
        let filesArr = []
        files.forEach(file => {
            const imgName = uuid()
            const imgExtension = file.originalname.split('.')[1]
            const imgLink = `${process.env.BASE_URL}/images/${imgName}.${imgExtension}`
            filesArr.push(imgLink)
            fs.writeFileSync(`./public/images/${imgName}.${imgExtension}`, file.buffer)
        })
        const user = await this.projectModel.findById(projectId)
        user.images = filesArr
        user.save()
        return { images: filesArr }
    }

    async findById(id: string) {
        return this.projectModel.findById(id)
    }

    async getDetail(projectId: string) {
        return this.projectModel.findById(projectId).populate({
            path: 'phases',
            populate: {
                path: 'tasks',
                populate: [
                    { path: 'materials' },
                    { path: 'measurements' }
                ]
            }
        })
    }

    async addPhase(phase: any, projectId: string) {
        const project = await this.findById(projectId)
        project.phases.push(phase)
        project.save()
    }

    async update(updateProjectDto: UpdateProjectDto) {
        const { _id, ...data } = updateProjectDto
        return this.projectModel.updateOne({ _id }, { ...data, updatedAt: Date.now() })
    }
}
