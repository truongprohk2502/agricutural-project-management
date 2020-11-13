import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateMeasurementDto } from 'src/dto/create-measurement.dto';
import { UpdateMeasurementDto } from 'src/dto/update-measurement.dto';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) { }

    @Post('create')
    async createMeasurement(@Body(ValidationPipe) createMeasurementDto: CreateMeasurementDto) {
        return this.measurementService.create(createMeasurementDto)
    }

    @Put('update')
    async updateMeasurement(@Body(ValidationPipe) updateMeasurementDto: UpdateMeasurementDto) {
        return this.measurementService.update(updateMeasurementDto)
    }
}
