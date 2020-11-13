import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateMaterialDto } from 'src/dto/create-material.dto';
import { UpdateMaterialDto } from 'src/dto/update-material.dto';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) { }

    @Post('create')
    async createMaterial(@Body(ValidationPipe) createMaterialDto: CreateMaterialDto) {
        return this.materialService.create(createMaterialDto)
    }

    @Put('update')
    async updateMaterial(@Body(ValidationPipe) updateMaterialDto: UpdateMaterialDto) {
        return this.materialService.update(updateMaterialDto)
    }
}
