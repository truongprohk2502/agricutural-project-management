import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    phaseId: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    estimatedTime: number;

    @IsString()
    estimatedTimeUnit: string;

    @IsNumber()
    workerNum: number;

    @IsNumber()
    workerUnitFee: number;

    @IsBoolean()
    isDailyTask: boolean;

    // @IsArray()
    // images: object;
}