import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { Model } from 'mongoose';
import { Project } from 'src/interfaces/project.interface';
import { UsersService } from 'src/users/users.service';
import { uuid } from 'uuidv4';
import * as fs from 'fs';
import { config } from 'dotenv';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { CreateActualProjectDto } from 'src/dto/create-actual-project.dto';
import { PhaseService } from 'src/phase/phase.service';

config();

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => PhaseService)) private readonly phaseService: PhaseService
    ) { }

    async createSample(createProjectDto: any, payload: any) {
        const { email, type } = payload
        let account = type === 'local' ? await this.usersService.findByLocalEmail(email) : this.usersService.findOneByGmail(email)
        const project = new this.projectModel({
            author: account,
            ...createProjectDto
        })
        project.save()
        return project
    }

    async createActual(createProjectDto: CreateActualProjectDto, payload: any) {
        const { projectId, actualScale, planStartDate, address } = createProjectDto
        const { email, type } = payload
        let account = type === 'local' ? await this.usersService.findByLocalEmail(email) : await this.usersService.findByGoogleEmail(email)
        const sampleProject = await this.getDetail(projectId)
        const scale = Number(actualScale)
        if (sampleProject) {
            const { minimalScale, estimatedCost, estimatedQuantity, _id, ...restProps } = sampleProject.toObject()
            // const projectDto = {
            //     minimalScale: scale,
            //     planStartDate: Number(planStartDate),
            //     address,
            //     estimatedCost: estimatedCost * scale / minimalScale,
            //     estimatedQuantity: estimatedQuantity * scale / minimalScale,
            //     projectType: 'ACTUAL'
            // }
            // const projectCreated = await this.createSample(projectDto, payload)
            // const phaseArr = []
            // phases.forEach(phase => {
            //     const taskArr = []
            //     const {tasks, ...restPhase}=phase
            //     tasks.forEach(task => {
            //         const {measurements, materials, workerNum, ...restTask}=task
            //         const taskCreated = 
            //         const measurementArr = []
            //         measurements.forEach(measurement => {

            //         })
            //     })
            // })
            const project = new this.projectModel({
                ...restProps,
                author: account,
                minimalScale: scale,
                planStartDate: Number(planStartDate),
                address,
                estimatedCost: estimatedCost * scale / minimalScale,
                estimatedQuantity: estimatedQuantity * scale / minimalScale,
                projectType: 'ACTUAL',
                // phases
            })
            project.save()
        } else {
            return new BadRequestException()
        }
    }

    async getList(page: number, size: number, isActive: boolean) {
        return this.projectModel.find({ isActive }, { author: 0 }, { skip: page * size, limit: size })
    }

    async getListByUser(payload: any) {
        const { email, type } = payload
        const user = type === 'local' ? await this.usersService.findByLocalEmail(email) : await this.usersService.findOneByGmail(email)
        return this.projectModel.find({ author: user._id })
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
