import { IsNumber, IsString } from 'class-validator';

export class CreatePhaseDto {
    @IsString()
    projectId: string;

    @IsString()
    name: string;

    @IsNumber()
    estimatedTime: number;

    @IsString()
    estimatedTimeUnit: string;
}