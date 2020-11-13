import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/interfaces/task.interface';
import { Model } from 'mongoose';
import { PhaseService } from 'src/phase/phase.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        private readonly phaseService: PhaseService
    ) { }

    async create(createTaskDto: CreateTaskDto) {
        const { phaseId, ...props } = createTaskDto
        const findPhase = await this.phaseService.findById(phaseId)
        if (findPhase) {
            const createTask = new this.taskModel({
                phase: findPhase,
                ...props
            })
            const documentTask = await createTask.save()
            const { phase, ...result } = documentTask.toObject()
            this.phaseService.addTask(documentTask, phase._id)
            return result
        } else {
            throw new NotFoundException()
        }
    }

    async findById(id: string) {
        return this.taskModel.findById(id)
    }

    async addMaterial(material: any, taskId: string) {
        const task = await this.findById(taskId)
        task.materials.push(material)
        task.save()
    }

    async addMeasurement(measurement: any, taskId: string) {
        const task = await this.findById(taskId)
        task.measurements.push(measurement)
        task.save()
    }

    async update(updateTaskDto: UpdateTaskDto) {
        const { _id, ...data } = updateTaskDto
        return this.taskModel.updateOne({ _id }, { ...data, updatedAt: Date.now() })
    }
}
