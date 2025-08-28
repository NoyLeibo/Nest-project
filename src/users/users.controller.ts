import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('users') // base route name
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // endpoint name - /users/test
  createUser(@Req() req: Request) {
    try {
      const { name, email } = req.body;

      if (!name) throw new Error(`name is undefined`);
      if (!email) throw new Error(`email is undefined`);
      const user = this.usersService.create(name, email);

      return { message: 'OK', status: HttpStatus.OK, user };
    } catch (error: any) {
      throw new HttpException(
        { message: 'Bad Request', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Get()
  getUsers() {
    try {
      const users = this.usersService.findAll();
      return { message: 'OK', status: HttpStatus.OK, users };
    } catch (error: any) {
      throw new HttpException(
        { message: 'Bad request', error: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
