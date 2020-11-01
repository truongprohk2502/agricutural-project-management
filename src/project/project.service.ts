import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { Model } from 'mongoose';
import { Project } from 'src/interfaces/project.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        private readonly usersService: UsersService
    ) { }

    async createSample(createProjectDto: CreateProjectDto, payload: any) {
        const { email, type } = payload
        let account = type === 'local' ? await this.usersService.findByLocalEmail(email) : this.usersService.findOneByGmail(email)
        const { name, description, minimalScale, standardUnit, estimatedTime, estimatedTimeUnit, estimatedQuantity, unitPrice } = createProjectDto
        const project = new this.projectModel({
            author: account,
            name,
            description,
            minimalScale,
            standardUnit,
            estimatedTime,
            estimatedTimeUnit,
            estimatedQuantity,
            unitPrice,
        })
        project.save()
        return project
    }

    async getList(page: number, size: number) {
        return this.projectModel.find({ isActive: true }, { author: 0 }, { skip: page * size, limit: size })
    }
}
