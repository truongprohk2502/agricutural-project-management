import { IsString, IsEmail } from 'class-validator';

export class SignInGoogleDto {
    @IsEmail()
    email: string;

    @IsString()
    googleId: string;

    @IsString()
    givenName: string;

    @IsString()
    familyName: string;
}