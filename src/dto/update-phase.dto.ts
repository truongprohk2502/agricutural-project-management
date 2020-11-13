import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhaseDto {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    estimatedTime: number;

    @IsOptional()
    @IsString()
    estimatedTimeUnit: string;
}