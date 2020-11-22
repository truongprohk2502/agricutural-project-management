import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    minimalScale: number;

    @IsString()
    standardUnit: string;

    @IsNumber()
    estimatedCost: number;

    @IsNumber()
    estimatedTime: number;

    @IsString()
    estimatedTimeUnit: string;

    @IsNumber()
    estimatedQuantity: number;

    @IsNumber()
    unitPrice: number;
}