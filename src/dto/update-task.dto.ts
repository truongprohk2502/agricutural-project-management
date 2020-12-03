import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsNumber()
    estimatedTime: number;

    @IsOptional()
    @IsString()
    estimatedTimeUnit: string;

    @IsOptional()
    @IsNumber()
    workerNum: number;

    @IsOptional()
    @IsNumber()
    workerUnitFee: number;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}