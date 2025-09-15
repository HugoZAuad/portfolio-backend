import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../src/auth/interface/jwt-payload.interface';
import { User } from '../../src/auth/interface/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          if (!request || !('cookies' in request)) return undefined;
          const req = request as unknown as { cookies: Record<string, string> };
          return req.cookies['jwt'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  validate(payload: JwtPayload): User {
    return { userId: payload.sub, email: payload.email };
  }
}
