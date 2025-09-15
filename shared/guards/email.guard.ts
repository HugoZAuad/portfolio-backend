import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class EmailGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;

    if (email !== 'hugozeymer@gmail.com') {
      const response = context.switchToHttp().getResponse();
      response.redirect('/');
      return false;
    }

    return true;
  }
}
