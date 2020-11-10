import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from 'src/interfaces/measurement.interface';
import { Model } from 'mongoose';
import { TaskService } from 'src/task/task.service';
import { CreateMeasurementDto } from 'src/dto/create-measurement.dto';

@Injectable()
export class MeasurementService {
    constructor(
        @InjectModel('Measurement') private readonly measurementModel: Model<Measurement>,
        private readonly taskService: TaskService
    ) { }

    async create(createMeasurementDto: CreateMeasurementDto) {
        const { taskId, ...props } = createMeasurementDto
        const findTask = await this.taskService.findById(taskId)
        if (findTask) {
            const createMeasurement = new this.measurementModel({
                task: findTask,
                ...props
            })
            const documentMeasurement = await createMeasurement.save()
            const { task, ...result } = documentMeasurement.toObject()
            this.taskService.addMeasurement(documentMeasurement, task._id)
            return result
        } else {
            throw new NotFoundException()
        }
    }
}
