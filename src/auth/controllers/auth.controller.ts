import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../DTO/login.dto';
import { Public } from '../../../shared/decorators/public.decorator';
import { Response } from 'express';
import { User } from '../interface/user.interface';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token } = this.authService.login(loginDto);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user as User;
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(200).send({ message: 'Logout realizado com sucesso' });
  }
}
