import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsPhone } from 'src/validators/phone.validator';

export class UpdateUserInfoDto {
    @IsOptional()
    @IsString()
    fullName: string;

    @IsOptional()
    @IsPhone({ message: '$value is invalid phone number' })
    phone: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsNumber()
    dob : number

    @IsOptional()
    @IsBoolean()
    gender : boolean
}