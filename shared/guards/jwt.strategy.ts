/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export interface JwtPayload {
  sub: number;
  email: string;
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request): string | undefined => {
          if (req.cookies && req.cookies.jwt) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return req.cookies.jwt;
          }
          return undefined;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'secretKey',
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    if (!payload || payload.email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
