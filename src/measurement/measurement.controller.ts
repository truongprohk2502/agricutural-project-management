import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateMeasurementDto } from 'src/dto/create-measurement.dto';
import { UpdateMeasurementDto } from 'src/dto/update-measurement.dto';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) { }

    @Get('list/:taskId')
    async getListMeasurement(@Param('taskId') taskId: string) {
      return this.measurementService.getList(taskId);
    }

    @Post('create')
    async createMeasurement(@Body(ValidationPipe) createMeasurementDto: CreateMeasurementDto) {
        return this.measurementService.create(createMeasurementDto)
    }

    @Put('update')
    async updateMeasurement(@Body(ValidationPipe) updateMeasurementDto: UpdateMeasurementDto) {
        return this.measurementService.update(updateMeasurementDto)
    }

    @Delete('delete/:id')
    async deleteMeasurement(@Param('id') id: string) {
        return this.measurementService.delete(id)
    }
}
