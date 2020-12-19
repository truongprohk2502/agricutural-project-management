import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    taskId: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNumber()
    unitPrice: number;

    @IsOptional()
    @IsNumber()
    actualQuantity: number;

    @IsOptional()
    @IsNumber()
    actualUnitPrice: number;
}