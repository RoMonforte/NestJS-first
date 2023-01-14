import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const autHeader = request.header('Auth');
    const isAuth = autHeader === '1234';
    if(!isAuth) {
      throw new UnauthorizedException('not allowed')
    }
    return isAuth;
  }
}
