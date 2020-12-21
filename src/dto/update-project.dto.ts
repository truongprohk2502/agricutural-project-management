import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    minimalScale: number;

    @IsOptional()
    @IsString()
    standardUnit: string;

    @IsArray()
    @IsOptional()
    standardGap: [string];

    @IsOptional()
    @IsNumber()
    estimatedCost: number;

    @IsOptional()
    @IsNumber()
    estimatedTime: number;

    @IsOptional()
    @IsString()
    estimatedTimeUnit: string;

    @IsOptional()
    @IsNumber()
    estimatedQuantity: number;

    @IsOptional()
    @IsNumber()
    unitPrice: number;
    
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsBoolean()
    isFinished: boolean;

    @IsOptional()
    @IsNumber()
    planStartDate: number;

    @IsOptional()
    @IsString()
    address: string;
}