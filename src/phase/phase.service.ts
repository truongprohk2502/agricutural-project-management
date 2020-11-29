import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePhaseDto } from 'src/dto/create-phase.dto';
import { Phase } from 'src/interfaces/phase.interface';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { UpdatePhaseDto } from 'src/dto/update-phase.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class PhaseService {
  constructor(
    @InjectModel('Phase') private readonly phaseModel: Model<Phase>,
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async create(createPhaseDto: CreatePhaseDto) {
    const { projectId, ...props } = createPhaseDto;
    const findProject = await this.projectService.findById(projectId);
    if (findProject) {
      const createPhase = new this.phaseModel({
        project: findProject,
        ...props,
      });
      const documentPhase = await createPhase.save();
      const { project, ...result } = documentPhase.toObject();
      this.projectService.addPhase(createPhase, project._id);
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async cloneSamplePhases(
    projectId: string,
    sampleProjectId: string,
    rate: number,
  ) {
    const phases = await this.findAllByProjectId(sampleProjectId);
    for (let i = 0; i < phases.length; i++) {
      const { name, estimatedTime, estimatedTimeUnit } = phases[i];
      const phaseCreated = await this.create({
        projectId,
        name,
        estimatedTime,
        estimatedTimeUnit,
      });
      this.taskService.cloneSampleTasks(phaseCreated._id, phases[i]._id, rate);
    }
  }

  async findById(id: string) {
    return this.phaseModel.findById(id);
  }

  async findAllByProjectId(id: string) {
    return this.phaseModel.find({ project: id });
  }

  async addTask(task: any, phaseId: string) {
    const phase = await this.findById(phaseId);
    phase.tasks.push(task);
    phase.save();
  }

  async update(updatePhaseDto: UpdatePhaseDto) {
    const { _id, ...data } = updatePhaseDto;
    return this.phaseModel.updateOne(
      { _id },
      { ...data, updatedAt: Date.now() },
    );
  }
}
