import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    @Inject(forwardRef(() => PhaseService))
    private readonly phaseService: PhaseService,
  ) {}

  async createSample(createProjectDto: any, payload: any) {
    const { email, type } = payload;
    let account =
      type === 'local'
        ? await this.usersService.findByLocalEmail(email)
        : this.usersService.findOneByGmail(email);
    const project = new this.projectModel({
      author: account,
      ...createProjectDto,
    });
    project.save();
    return project;
  }

  async createActual(
    createProjectDto: CreateActualProjectDto,
    file: any,
    payload: any,
  ) {
    const { projectId, actualScale, planStartDate, address } = createProjectDto;
    const { email, type } = payload;
    let account =
      type === 'local'
        ? await this.usersService.findByLocalEmail(email)
        : await this.usersService.findByGoogleEmail(email);
    const sampleProject = await this.getDetail(projectId);
    const scale = Number(actualScale);
    if (sampleProject) {
      const {
        minimalScale,
        estimatedCost,
        estimatedQuantity,
        _id,
        phases,
        images,
        ...restProps
      } = sampleProject.toObject();

      const rate = scale / minimalScale;

      const imgName = uuid();
      const imgExtension = file.originalname.split('.')[1];
      const imgLink = `${process.env.BASE_URL}/images/${imgName}.${imgExtension}`;
      fs.writeFileSync(
        `./public/images/${imgName}.${imgExtension}`,
        file.buffer,
      );

      // Create project
      const project = new this.projectModel({
        ...restProps,
        author: account,
        minimalScale: scale,
        planStartDate: Number(planStartDate),
        address,
        estimatedCost: Math.round(estimatedCost * rate),
        estimatedQuantity: Math.round(estimatedQuantity * rate),
        projectType: 'ACTUAL',
        images: [...images, imgLink],
      });
      await project.save();
      this.phaseService.cloneSamplePhases(String(project._id), _id, rate);
      return project;
    } else {
      return new BadRequestException();
    }
  }

  async getList(page: number, size: number) {
    return this.projectModel.find(
      { projectType: 'SAMPLE' },
      { author: 0 },
      { skip: page * size, limit: size },
    );
  }

  async getListByUser(projectType: string, isFinished: boolean, payload: any) {
    const { email, type } = payload;
    const user =
      type === 'local'
        ? await this.usersService.findByLocalEmail(email)
        : await this.usersService.findOneByGmail(email);
    return this.projectModel.find({
      author: user._id,
      projectType,
      isFinished,
    });
  }

  async uploadFiles(files: [any], projectId: string) {
    const project = await this.projectModel.findById(projectId);
    let filesArr = [...project.images];
    files.forEach(file => {
      const imgName = uuid();
      const imgExtension = file.originalname.split('.')[1];
      const imgLink = `${process.env.BASE_URL}/images/${imgName}.${imgExtension}`;
      filesArr.push(imgLink);
      fs.writeFileSync(
        `./public/images/${imgName}.${imgExtension}`,
        file.buffer,
      );
    });
    project.images = filesArr;
    project.save();
    return { images: filesArr };
  }

  async findById(id: string) {
    return this.projectModel.findById(id);
  }

  async getDetail(projectId: string) {
    return this.projectModel.findById(projectId).populate({
      path: 'phases',
      populate: {
        path: 'tasks',
        populate: [{ path: 'materials' }, { path: 'measurements' }],
      },
    });
  }

  async addPhase(phase: any, projectId: string) {
    const project = await this.findById(projectId);
    project.phases.push(phase);
    project.save();
  }

  async update(updateProjectDto: UpdateProjectDto) {
    const { _id, ...data } = updateProjectDto;
    return this.projectModel.updateOne(
      { _id },
      { ...data, updatedAt: Date.now() },
    );
  }

  async delete(_id) {
    return this.projectModel.deleteOne({ _id });
  }
}
