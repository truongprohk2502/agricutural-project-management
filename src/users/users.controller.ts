import {
  Body,
  Controller,
  Get,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { UpdateUserInfoDto } from 'src/dto/update-user-info.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  async getList() {
    return this.usersService.getList();
  }

  @Post('updateInfo')
  async updateUserInfo(
    @Body(ValidationPipe) updateUserInfoDto: UpdateUserInfoDto,
    @JwtPayload() payload: any,
  ) {
    return this.usersService.updateInfo(updateUserInfoDto, payload);
  }

  @Put('lock')
  async lockAccount(
    @Query('is_active', ParseBoolPipe) isActive: boolean,
    @Query('id') id: string,
  ) {
    return this.usersService.lock(isActive, id);
  }
}
