import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreatePhaseDto } from 'src/dto/create-phase.dto';
import { UpdatePhaseDto } from 'src/dto/update-phase.dto';
import { PhaseService } from './phase.service';

@Controller('phase')
export class PhaseController {
    constructor(private readonly phaseService: PhaseService) { }

    @Post('create')
    async createPhase(@Body(ValidationPipe) createPhaseDto: CreatePhaseDto) {
        return this.phaseService.create(createPhaseDto)
    }

    @Put('update')
    async updatePhase(@Body(ValidationPipe) updatePhaseDto: UpdatePhaseDto) {
        return this.phaseService.update(updatePhaseDto)
    }
}
