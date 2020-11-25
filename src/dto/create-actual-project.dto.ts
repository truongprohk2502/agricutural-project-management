import { IsNumber, IsString } from 'class-validator';

export class CreateActualProjectDto {
    @IsNumber()
    actualScale: number;

    @IsNumber()
    planStartDate: number;

    @IsString()
    address: string;
}