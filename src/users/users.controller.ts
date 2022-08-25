import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IGetAll, ICreate, IUpdate } from './Dto/Request';
import { UsersService } from './users.service';
import { Response } from 'src/common/models';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: ICreate): Promise<Response> {
    try {
      return await this.userService.create(user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Put()
  async update(@Body() user: IUpdate): Promise<Response> {
    try {
      return await this.userService.update(user);
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
      return await this.userService.getAll(query);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
  @Get(':id')
  async getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<Response> {
    try {
      return await this.userService.getById(Number(id));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
