import { LoginDto } from '../DTO/login.dto';

export interface IAuthService {
  login(loginDto: LoginDto): { access_token: string } | { error: string };
}
