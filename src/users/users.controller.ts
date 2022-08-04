import { Controller, Get, Query } from '@nestjs/common';
import { IGetAll } from './Dto/Request';
import { UsersService } from './users.service';
import { Response } from 'src/common/models';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  async getUsers(@Query() query: IGetAll): Promise<Response> {
    try {
      const result = await this.userService.getUsers(query);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
