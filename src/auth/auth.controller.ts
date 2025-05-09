import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('refresh')
  async refresh(@Body() body: any) {
    const { refreshToken } = body;

    try {
      return this.authService.refreshTokens(refreshToken);
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }

  @Post('logout')
  async logout(@Body() body: any) {
    const { userId } = body;
    return this.authService.logout(userId);
  }
}
