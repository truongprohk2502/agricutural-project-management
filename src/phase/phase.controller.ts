import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreatePhaseDto } from 'src/dto/create-phase.dto';
import { PhaseService } from './phase.service';

@Controller('phase')
export class PhaseController {
    constructor(private readonly phaseService: PhaseService) { }

    @Post('create')
    async createPhase(@Body(ValidationPipe) createPhaseDto: CreatePhaseDto) {
        return this.phaseService.create(createPhaseDto)
    }
}
