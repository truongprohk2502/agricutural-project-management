import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMeasurementDto {
    @IsString()
    taskId: string;

    @IsString()
    name: string;

    @IsString()
    guide: string;

    @IsNumber()
    standardNum: number;

    @IsNumber()
    @IsOptional()
    realityNum: number;

    @IsString()
    unit: string
}