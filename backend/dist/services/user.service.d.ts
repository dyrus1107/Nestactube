import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    signup(user: User): Promise<User>;
    signin(user: User, jwt: JwtService): Promise<any>;
    getOne(email: string): Promise<User>;
}
