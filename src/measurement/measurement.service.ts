import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from 'src/interfaces/measurement.interface';
import { Model } from 'mongoose';
import { TaskService } from 'src/task/task.service';
import { CreateMeasurementDto } from 'src/dto/create-measurement.dto';
import { UpdateMeasurementDto } from 'src/dto/update-measurement.dto';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectModel('Measurement')
    private readonly measurementModel: Model<Measurement>,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async create(createMeasurementDto: CreateMeasurementDto) {
    const { taskId, ...props } = createMeasurementDto;
    const findTask = await this.taskService.findById(taskId);
    if (findTask) {
      const createMeasurement = new this.measurementModel({
        task: findTask,
        ...props,
      });
      const documentMeasurement = await createMeasurement.save();
      const { task, ...result } = documentMeasurement.toObject();
      this.taskService.addMeasurement(documentMeasurement, task._id);
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async cloneSampleMeasurements(
    taskId: string,
    sampleTaskId: string,
    rate: number,
  ) {
    const measurements = await this.findAllByTaskId(sampleTaskId);
    for (let i = 0; i < measurements.length; i++) {
      const { standardNum, realityNum, name, unit } = measurements[i];
      this.create({ taskId, name, unit, standardNum, realityNum });
    }
  }

  async findAllByTaskId(id: string) {
    return this.measurementModel.find({ task: id });
  }

  async update(updateMeasurementDto: UpdateMeasurementDto) {
    const { _id, ...data } = updateMeasurementDto;
    return this.measurementModel.updateOne(
      { _id },
      { ...data, updatedAt: Date.now() },
    );
  }
}
