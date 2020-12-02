import { IsNumber, IsString } from 'class-validator';

export class CreatePhaseDto {
    @IsString()
    projectId: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    estimatedTime: number;

    @IsString()
    estimatedTimeUnit: string;
}