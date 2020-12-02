import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateActualProjectDto {
    @IsString()
    projectId: string;

    @IsNumber()
    actualScale: number;

    @IsNumber()
    planStartDate: number;

    @IsString()
    address: string;

    @IsArray()
    images: [object];
}