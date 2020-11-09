import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePhaseDto } from 'src/dto/create-phase.dto';
import { Phase } from 'src/interfaces/phase.interface';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class PhaseService {
    constructor(
        @InjectModel('Phase') private readonly phaseModel: Model<Phase>,
        private readonly projectService: ProjectService
    ) { }

    async create(createPhaseDto: CreatePhaseDto) {
        const { projectId, name, estimatedTime, estimatedTimeUnit } = createPhaseDto
        const findProject = await this.projectService.findById(projectId)
        if (findProject) {
            const createPhase = new this.phaseModel({
                project: findProject,
                name,
                estimatedTime,
                estimatedTimeUnit,
            })
            const documentPhase = await createPhase.save()
            const { project, ...result } = documentPhase.toObject()
            this.projectService.addPhase(createPhase, project._id)
            return result
        } else {
            throw new NotFoundException()
        }
    }

    async findById(id: string) {
        return this.phaseModel.findById(id)
    }

    async addTask(task: any, phaseId: string) {
        const phase = await this.findById(phaseId)
        phase.tasks.push(task)
        phase.save()
    }
}
