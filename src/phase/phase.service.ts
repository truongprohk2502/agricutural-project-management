import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePhaseDto } from 'src/dto/create-phase.dto';
import { Phase } from 'src/interfaces/phase.interface';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { UpdatePhaseDto } from 'src/dto/update-phase.dto';

@Injectable()
export class PhaseService {
    constructor(
        @InjectModel('Phase') private readonly phaseModel: Model<Phase>,
        private readonly projectService: ProjectService
    ) { }

    async create(createPhaseDto: CreatePhaseDto) {
        const { projectId, ...props } = createPhaseDto
        const findProject = await this.projectService.findById(projectId)
        if (findProject) {
            const createPhase = new this.phaseModel({
                project: findProject,
                ...props
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

    async update(updatePhaseDto: UpdatePhaseDto) {
        const { _id, ...data } = updatePhaseDto
        return this.phaseModel.updateOne({ _id }, { ...data, updatedAt: Date.now() })
    }
}
