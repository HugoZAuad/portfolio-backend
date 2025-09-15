import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../DTO/login.dto';
import { IAuthService } from '../interface/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  login(loginDto: LoginDto): { access_token: string } | { error: string } {
    const { email, password } = loginDto;

    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException('E-mail/senha não autorizado');
    }

    const hardcodedPassword = process.env.PASS;
    if (password !== hardcodedPassword) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email, sub: 1 };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
