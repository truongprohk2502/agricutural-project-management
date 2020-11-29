import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/interfaces/task.interface';
import { Model } from 'mongoose';
import { PhaseService } from 'src/phase/phase.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { MeasurementService } from 'src/measurement/measurement.service';
import { MaterialService } from 'src/material/material.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly phaseService: PhaseService,
    @Inject(forwardRef(() => MeasurementService))
    private readonly measurementService: MeasurementService,
    @Inject(forwardRef(() => MaterialService))
    private readonly materialService: MaterialService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { phaseId, ...props } = createTaskDto;
    const findPhase = await this.phaseService.findById(phaseId);
    if (findPhase) {
      const createTask = new this.taskModel({
        phase: findPhase,
        ...props,
      });
      const documentTask = await createTask.save();
      const { phase, ...result } = documentTask.toObject();
      this.phaseService.addTask(documentTask, phase._id);
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async cloneSampleTasks(phaseId: string, samplePhaseId: string, rate: number) {
    const tasks = await this.findAllByPhaseId(samplePhaseId);
    for (let i = 0; i < tasks.length; i++) {
      const {
        name,
        description,
        estimatedTime,
        estimatedTimeUnit,
        workerNum,
        workerUnitFee,
      } = tasks[i];
      const taskCreated = await this.create({
        phaseId,
        name,
        description,
        estimatedTime,
        estimatedTimeUnit,
        workerNum: workerNum * rate,
        workerUnitFee,
      });
      this.measurementService.cloneSampleMeasurements(
        taskCreated._id,
        tasks[i]._id,
        rate,
      );
      this.materialService.cloneSampleMaterials(
        taskCreated._id,
        tasks[i]._id,
        rate,
      );
    }
  }

  async findById(id: string) {
    return this.taskModel.findById(id);
  }

  async findAllByPhaseId(id: string) {
    return this.taskModel.find({ phase: id });
  }

  async addMaterial(material: any, taskId: string) {
    const task = await this.findById(taskId);
    task.materials.push(material);
    task.save();
  }

  async addMeasurement(measurement: any, taskId: string) {
    const task = await this.findById(taskId);
    task.measurements.push(measurement);
    task.save();
  }

  async update(updateTaskDto: UpdateTaskDto) {
    const { _id, ...data } = updateTaskDto;
    return this.taskModel.updateOne(
      { _id },
      { ...data, updatedAt: Date.now() },
    );
  }
}
