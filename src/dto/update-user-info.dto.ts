import { IsString } from 'class-validator';
import { IsPhone } from 'src/validators/phone.validator';

export class UpdateUserInfoDto {
    @IsString()
    fullName: string;

    @IsPhone({ message: '$value is invalid phone number' })
    phone: string;

    @IsString()
    address: string;
}