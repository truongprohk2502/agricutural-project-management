import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SignInUserDto } from 'src/dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInGoogleDto } from 'src/dto/signin-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async generateToken(payload: Object) {
    return await this.jwtService.sign(payload);
  }

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userService.create(createUserDto);
    const { fullName, phone, address, role } = user;
    return {
      token: await this.generateToken({ email, type: 'local' }),
      fullName,
      email,
      phone,
      address,
      role,
    };
  }

  async signIn(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.userService.findByLocalEmail(email);
    if (user && (await bcrypt.compare(password, user.local.password))) {
      const { fullName, phone, address, role } = user;
      return {
        token: await this.generateToken({ email, type: 'local' }),
        fullName,
        email,
        phone,
        address,
        role,
      };
    }
    throw new NotFoundException();
  }

  async signInWithGmail(signInGoogleDto: SignInGoogleDto) {
    const { googleId, email } = signInGoogleDto;
    const user = await this.userService.findOneByGmail(googleId);
    if (user) {
      const { fullName, phone, address, role } = user;
      return {
        token: await this.generateToken({ email, type: 'google' }),
        fullName,
        email,
        phone,
        address,
        role,
      };
    } else {
      const createdUser = await this.userService.createGoogleAccount(
        signInGoogleDto,
      );
      const { fullName, phone, address, role } = createdUser;
      return {
        token: await this.generateToken({ email, type: 'google' }),
        fullName,
        email,
        phone,
        address,
        role,
      };
    }
  }

  async getProfile(payload: any) {
    const { email, type } = payload;
    let user = null;
    return type === 'local'
      ? this.userService.findByLocalEmail(email)
      : this.userService.findByGoogleEmail(email);
  }
}
