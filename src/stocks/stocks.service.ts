import { Injectable } from '@nestjs/common';
import { Moment } from 'moment';
import { covertStringToDate } from 'src/common/helpers/generalHelper';
import { Response } from 'src/common/models';
import { TradesRepository } from 'src/trades/trades.repository';
import { IGetByStockSymbol, IGetStats } from './Dto/Request';
import { IStatsResponse } from './Dto/Response';

@Injectable()
export class StocksService {
  constructor(private tradesRepository: TradesRepository) {}

  // Get Min and Max Prices by symbol
  getPriceBySymbol = async (params: IGetByStockSymbol) => {
    const { symbol, start, end } = params;

    const trade = await this.tradesRepository.getBySymbol(symbol);

    if (!trade) {
      return new Response(404, 'Trade symbol does not exists.');
    }

    let momentStartDate, momentEndDate;
    if (start) {
      momentStartDate = covertStringToDate(`${start} 00:00:00`);
      if (!momentStartDate.isValid()) {
        return new Response(400).setMsg('Invalid start date.');
      }
    }
    if (end) {
      momentEndDate = covertStringToDate(`${end} 00:00:00`);
      if (!momentEndDate.isValid()) {
        return new Response(400).setMsg('Invalid end date.');
      }
    }
    const trades = await this.tradesRepository.getAllTradesBySymbol({
      symbol,
      startDate: momentStartDate?.toDate(),
      endDate: momentEndDate?.toDate(),
      sort: { price: 'asc' },
    });

    if (!trades.length) {
      return new Response(200, {
        message: 'There are no trades in the given date range',
      });
    }
    const prices = { lowest: trades[0], highest: trades[trades.length - 1] };

    // Response
    return new Response(200, prices);
  };

  // Get Min and Max Prices by symbol
  getStats = async (params: IGetStats) => {
    const { start, end } = params;
    const sort = { timestamp: `asc` };
    const symbols = await this.tradesRepository.getAllTradesSymbol({
      sort: { symbol: 'asc' },
    });

    let momentStartDate: Moment | undefined, momentEndDate: Moment | undefined;
    if (start) {
      momentStartDate = covertStringToDate(`${start} 00:00:00`);
      if (!momentStartDate.isValid()) {
        return new Response(400).setMsg('Invalid start date.');
      }
    }
    if (end) {
      momentEndDate = covertStringToDate(`${end} 00:00:00`).add(1, 'day');
      if (!momentEndDate.isValid()) {
        return new Response(400).setMsg('Invalid end date.');
      }
    }

    const res: IStatsResponse[] = [];

    for (let i = 0; i < symbols.length; i++) {
      let fluctuations = 0,
        max_rise = 0.0,
        max_fall = 0.0;
      const startDate = momentStartDate?.toDate(),
        endDate = momentEndDate?.toDate();
      const trades = await this.tradesRepository.getAll({
        sort: sort,
        symbol: symbols[i].symbol,
        startDate,
        endDate,
      });
      let isDecreasing = false,
        isIncreasing = false;
      trades.forEach((t, j) => {
        if (j !== 0) {
          if (t.price > trades[j - 1].price) {
            isIncreasing = true;
            const rise = t.price - trades[j - 1].price;
            if (rise > max_rise) {
              max_rise = Math.round((rise + Number.EPSILON) * 100) / 100;
            }
            if (isDecreasing) {
              fluctuations++;
              isDecreasing = false;
            }
          } else if (t.price < trades[j - 1].price) {
            const fall = trades[j - 1].price - t.price;
            if (fall > max_fall)
              max_fall = Math.round((fall + Number.EPSILON) * 100) / 100;
            if (isIncreasing) {
              fluctuations++;
              isIncreasing = false;
            }
            isDecreasing = true;
          }
        }
      });
      if (trades.length) {
        res.push({
          symbol: symbols[i].symbol,
          fluctuations,
          max_fall,
          max_rise,
        });
      } else {
        res.push({
          symbol: symbols[i].symbol,
          message: 'There are no trades in the given date range',
        });
      }
    }

    return new Response(200, res);
  };
}
