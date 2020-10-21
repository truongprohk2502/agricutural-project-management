import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';
import { IsPhone } from 'src/validators/phone.validator';

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhone({ message: '$value is invalid phone number' })
    phone: string;

    @IsString()
    @MinLength(10)
    @MaxLength(30)
    password: string;

    @IsString()
    address: string;
}