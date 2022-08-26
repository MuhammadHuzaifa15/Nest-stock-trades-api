import { Injectable } from '@nestjs/common';
import { Prisma, trades } from '@prisma/client';
import { JSONLike } from 'src/common/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TradesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: Prisma.tradesUncheckedCreateInput): Promise<trades> {
    return this.prismaService.trades.create({
      data: payload,
    });
  }

  async getById(id: number | undefined): Promise<trades | null> {
    const criteria: Prisma.tradesWhereInput = { isDeleted: false, id };
    return this.prismaService.trades.findFirst({
      where: criteria,
    });
  }

  async getAll(filters: {
    symbol?: string;
    startDate?: Date;
    endDate?: Date;
    sort: JSONLike;
  }): Promise<trades[]> {
    const { symbol, startDate, endDate, sort } = filters;
    const criteria: Prisma.tradesWhereInput = { isDeleted: false };

    if (symbol) {
      criteria.symbol = symbol;
    }

    if (startDate && endDate) {
      criteria.timestamp = {
        gte: startDate,
        lte: endDate,
      };
    } else if (startDate) {
      criteria.timestamp = {
        gte: startDate,
      };
    } else if (endDate) {
      criteria.timestamp = {
        lte: endDate,
      };
    }

    return this.prismaService.trades.findMany({
      where: criteria,
      orderBy: sort,
    });
  }

  async getByUserId(userId: number): Promise<trades[]> {
    const criteria: Prisma.tradesWhereInput = { isDeleted: false, userId };
    return this.prismaService.trades.findMany({
      where: criteria,
    });
  }

  async getBySymbol(symbol: string): Promise<trades | null> {
    const criteria: Prisma.tradesWhereInput = { isDeleted: false, symbol };
    return this.prismaService.trades.findFirst({
      where: criteria,
    });
  }

  async getAllTradesSymbol({ sort }: { sort: JSONLike }): Promise<trades[]> {
    const criteria: Prisma.tradesWhereInput = { isDeleted: false };
    return this.prismaService.trades.findMany({
      where: criteria,
      distinct: ['symbol'],
      orderBy: sort,
    });
  }

  getAllTradesBySymbol = (filters: {
    symbol?: string;
    startDate?: Date;
    endDate?: Date;
    sort: JSONLike;
  }): Promise<trades[]> => {
    const { symbol, startDate, endDate, sort } = filters;
    const criteria: Prisma.tradesWhereInput = { isDeleted: false };
    if (symbol) {
      criteria.symbol = symbol;
    }

    if (startDate && endDate) {
      criteria.timestamp = {
        gte: startDate,
        lte: endDate,
      };
    } else if (startDate) {
      criteria.timestamp = {
        gte: startDate,
      };
    } else if (endDate) {
      criteria.timestamp = {
        lte: endDate,
      };
    }

    return this.prismaService.trades.findMany({
      where: criteria,
      orderBy: sort,
    });
  };
}
