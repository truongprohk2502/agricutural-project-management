import { IsNumber, IsString } from 'class-validator';

export class CreateMeasurementDto {
    @IsString()
    taskId: string;

    @IsString()
    name: string;

    @IsNumber()
    standardNum: number;

    @IsNumber()
    realityNum: number;

    @IsString()
    unit: string
}