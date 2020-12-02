import { IsString } from 'class-validator';

export class CreateActualProjectDto {
    @IsString()
    projectId: string;

    @IsString()
    actualScale: string;

    @IsString()
    planStartDate: string;

    @IsString()
    address: string;
}