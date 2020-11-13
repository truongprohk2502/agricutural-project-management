import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMaterialDto {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNumber()
    unitPrice: number;
}