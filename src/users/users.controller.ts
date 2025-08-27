import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('users') // base route name
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test') // endpoint name -> /users/test
  async testEndpoint(@Req() req: Request) {
    try {
      const { success } = req.body;

      if (!success) throw new Error(`Success is false: ${success}`);

      return { message: 'OK', status: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(
        { message: 'Bad Request', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
    {
    }
  }
}
