import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async SignUp(@Res() response: Response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.json({ newUser });
  }

  @Post('/signin')
  async SignIn(@Res() response: Response, @Body() user: User) {
    const token = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}
