import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/interfaces/task.interface';
import { Model } from 'mongoose';
import { PhaseService } from 'src/phase/phase.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        private readonly phaseService: PhaseService
    ) { }

    async create(createTaskDto: CreateTaskDto) {
        const { phaseId, name, description, estimatedTime, estimatedTimeUnit } = createTaskDto
        const findPhase = await this.phaseService.findById(phaseId)
        if (findPhase) {
            const createTask = new this.taskModel({
                phase: findPhase,
                name,
                description,
                estimatedTime,
                estimatedTimeUnit,
            })
            const documentTask = await createTask.save()
            const { phase, ...result } = documentTask.toObject()
            this.phaseService.addTask(documentTask, phase._id)
            return result
        } else {
            throw new NotFoundException()
        }
    }
}
