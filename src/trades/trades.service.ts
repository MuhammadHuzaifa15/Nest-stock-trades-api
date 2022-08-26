import { Injectable } from '@nestjs/common';
import {
  covertDateToString,
  covertStringToDate,
} from 'src/common/helpers/generalHelper';
import { Response } from 'src/common/models';
import { UsersRepository } from 'src/users/user.repository';
import { Create } from './Dto/Request';
import { TradesRepository } from './trades.repository';

@Injectable()
export class TradesService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tradesRepository: TradesRepository,
  ) {}

  async create(params: Create) {
    const {
      id,
      type,
      user: { id: userId, name },
      symbol,
      shares,
      price,
      timestamp,
    } = params;

    const existingTrade = await this.tradesRepository.getById(id);
    if (existingTrade) {
      return new Response(400).setMsg('Trade with id already exist.');
    }

    let user = await this.usersRepository.getById(userId);
    if (!user) {
      //Create User if not exists
      user = await this.usersRepository.create({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const convertedTimestamp = covertStringToDate(timestamp);

    const trade = await this.tradesRepository.create({
      id,
      type,
      userId: user.id,
      symbol,
      shares,
      price,
      timestamp: convertedTimestamp.toDate(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(201, trade);
  }

  async getAll() {
    const sort = { id: 'asc' };

    const trades = await this.tradesRepository.getAll({
      sort: sort,
    });

    // Response
    return new Response(
      200,
      trades.map((t) => ({ ...t, timestamp: covertDateToString(t.timestamp) })),
    );
  }

  async getAllTradeSymbols() {
    const sort = { symbol: 'asc' };
    const symbols = await this.tradesRepository.getAllTradesSymbol({
      sort: sort,
    });

    return new Response(
      200,
      symbols.map((t) => t.symbol),
    );
  }

  // Get By User Id Trades
  async getByUserId(userId: number) {
    const user = await this.usersRepository.getById(userId);
    if (!user) {
      return new Response(404).setMsg('User not found.');
    }

    const trades = await this.tradesRepository.getByUserId(userId);

    // Response
    return new Response(
      200,
      trades.map((t) => ({
        ...t,
        timestamp: covertDateToString(t.timestamp),
      })),
    );
  }
}
