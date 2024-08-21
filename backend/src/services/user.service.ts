import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * Signs up a new user
   * @param {User} user - The user data to sign up
   * @returns {Promise<User>} - The newly created user document
   */

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      ...user,
      password: hash,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  /**
   * Signs in an existing user
   * @param {User} user - The user data to sign in
   * @param {JwtService} jwt - The JWT service instance
   * @returns {Promise<any>} - The signed in user token
   */
  async signin(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (foundUser) {
      const { password } = foundUser;
      if (await bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return {
          token: jwt.sign(payload),
        };
      }
      return new UnauthorizedException('Incorrect username or password');
    }
    return new UnauthorizedException('Incorrect username or password');
  }

  /**
   * Retrieves a user document by email
   * @param {string} email - The email address of the user to retrieve
   * @returns {Promise<User>} - The user document if found, or null if not found
   */

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
