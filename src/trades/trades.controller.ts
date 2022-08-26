import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Create } from './Dto/Request';
import { Response } from 'src/common/models';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  async create(@Body() trade: Create): Promise<Response> {
    try {
      return await this.tradesService.create(trade);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.tradesService.getAll();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Get('symbols')
  async getAllTradeSymbols() {
    try {
      return await this.tradesService.getAllTradeSymbols();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Get('users/:userId')
  async getUserById(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ): Promise<Response> {
    try {
      return await this.tradesService.getByUserId(userId);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
