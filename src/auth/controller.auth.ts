import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public';
import { CreateUserDto } from 'src/users/dto/create-user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @UseGuards(AuthGuard('refresh-token'))
  @Get('refresh-token')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(
      req.user._id,
      req.user.refreshToken,
    );
  }
  @Get('me')
  async me(@Request() re) {
    return await this.authService.me(re.user._id);
  }
}
