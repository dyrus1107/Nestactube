import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './services/user.service';

interface UserRequest extends Request {
  user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = this.jwt.verify(token);
        console.log(token);

        const user = await this.userService.getOne(decoded.email);
        
        if (user) {
          req.user = user;
          next();
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new NotFoundException('No token found');
      }
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
