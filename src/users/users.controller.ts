import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { IGetAll, ICreate, IUpdate } from './Dto/Request';
import { UsersService } from './users.service';
import { Response } from 'src/common/models';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: ICreate) {
    try {
      return await this.userService.createAsync(user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Put()
  async update(@Body() user: IUpdate) {
    try {
      return await this.userService.updateAsync(user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Get()
  async getUsers(@Query() query: IGetAll): Promise<Response> {
    try {
      return await this.userService.getUsers(query);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
