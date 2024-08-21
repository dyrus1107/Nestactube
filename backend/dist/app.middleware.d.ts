import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './services/user.service';
interface UserRequest extends Request {
    user: any;
}
export declare class isAuthenticated implements NestMiddleware {
    private readonly jwt;
    private readonly userService;
    constructor(jwt: JwtService, userService: UserService);
    use(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
export {};
