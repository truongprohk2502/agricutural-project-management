import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SignInGoogleDto } from 'src/dto/signin-google.dto';
import { SignInUserDto } from 'src/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async signIn(@Body(ValidationPipe) signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto)
    }

    @Post('register')
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @Post('google')
    async signInWithGoogle(@Body(ValidationPipe) signInGoogleDto: SignInGoogleDto) {
        return this.authService.signInWithGmail(signInGoogleDto)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@JwtPayload() payload: any) {
        return this.authService.getProfile(payload)
    }
}
