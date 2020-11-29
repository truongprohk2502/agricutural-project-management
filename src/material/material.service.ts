import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from 'src/dto/create-material.dto';
import { UpdateMaterialDto } from 'src/dto/update-material.dto';
import { Material } from 'src/interfaces/material.interface';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel('Material') private readonly materialModel: Model<Material>,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const { taskId, ...props } = createMaterialDto;
    const findTask = await this.taskService.findById(taskId);
    if (findTask) {
      const createMaterial = new this.materialModel({
        task: findTask,
        ...props,
      });
      const documentMaterial = await createMaterial.save();
      const { task, ...result } = documentMaterial.toObject();
      this.taskService.addMaterial(documentMaterial, task._id);
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async cloneSampleMaterials(
    taskId: string,
    sampleTaskId: string,
    rate: number,
  ) {
    const materials = await this.findAllByTaskId(sampleTaskId);
    for (let i = 0; i < materials.length; i++) {
      const { name, quantity, unitPrice } = materials[i];
      this.create({
        taskId,
        name,
        quantity: Math.ceil(quantity * rate),
        unitPrice,
      });
    }
  }

  async findAllByTaskId(id: string) {
    return this.materialModel.find({ task: id });
  }

  async update(updateMaterialDto: UpdateMaterialDto) {
    const { _id, ...data } = updateMaterialDto;
    return this.materialModel.updateOne(
      { _id },
      { ...data, updatedAt: Date.now() },
    );
  }
}
