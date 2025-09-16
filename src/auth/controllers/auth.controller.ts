import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../DTO/login.dto';

import { EmailGuard } from '../../../shared/guards/email.guard';
import { Public } from '../../../shared/decorators/public.decorator';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { Response } from 'express';
import { User } from '../interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const result = this.authService.login(loginDto);
      if ('error' in result) {
        return { message: result.error };
      }
      res.cookie('jwt', result.access_token, { httpOnly: true, secure: false });
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user as User;
  }

  @UseGuards(JwtAuthGuard, EmailGuard)
  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.redirect('/');
  }
}
