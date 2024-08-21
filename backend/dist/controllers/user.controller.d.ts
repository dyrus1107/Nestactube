import { User } from '../model/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    SignUp(response: Response, user: User): Promise<Response<any, Record<string, any>>>;
    SignIn(response: Response, user: User): Promise<Response<any, Record<string, any>>>;
}
