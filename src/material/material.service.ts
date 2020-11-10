import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from 'src/dto/create-material.dto';
import { Material } from 'src/interfaces/material.interface';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class MaterialService {
    constructor(
        @InjectModel('Material') private readonly materialModel: Model<Material>,
        private readonly taskService: TaskService
    ) { }

    async create(createMaterialDto: CreateMaterialDto) {
        const { taskId, ...props } = createMaterialDto
        const findTask = await this.taskService.findById(taskId)
        if (findTask) {
            const createMaterial = new this.materialModel({
                task: findTask,
                ...props
            })
            const documentMaterial = await createMaterial.save()
            const { task, ...result } = documentMaterial.toObject()
            this.taskService.addMaterial(documentMaterial, task._id)
            return result
        } else {
            throw new NotFoundException()
        }
    }
}
