import { IsString, IsEmail, MaxLength, MinLength, IsOptional } from 'class-validator';
import { IsPhone } from 'src/validators/phone.validator';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhone({ message: '$value is invalid phone number' })
    phone: string;

    @IsString()
    @MinLength(10)
    @MaxLength(30)
    password: string;

    @IsOptional()
    @IsString()
    address: string;
}