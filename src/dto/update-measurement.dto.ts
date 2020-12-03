import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMeasurementDto {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    guide: string;

    @IsOptional()
    @IsNumber()
    standardNum: number;

    @IsOptional()
    @IsNumber()
    realityNum: number;

    @IsOptional()
    @IsString()
    unit: string
}