import { IsNumber, IsString } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    taskId: string;

    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsString()
    unit: string;

    @IsNumber()
    unitPrice: number;
}