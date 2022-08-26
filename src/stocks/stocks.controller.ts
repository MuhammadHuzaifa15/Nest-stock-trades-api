import { Controller, Get, Param, Query } from '@nestjs/common';
import { Response } from 'src/common/models';
import { IGetByStockSymbol } from './Dto/Request';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get(':symbol/price')
  async getAllTradeSymbols(
    @Param('symbol')
    symbol: string,
    @Query() query: IGetByStockSymbol,
  ) {
    try {
      return await this.stocksService.getPriceBySymbol({
        symbol,
        ...query,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }

  @Get('stats')
  async getStats(@Query() query: IGetByStockSymbol) {
    try {
      return await this.stocksService.getStats({
        ...query,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
