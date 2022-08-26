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

  getAllTradesSymbol = async ({
    sort,
  }: {
    sort: JSONLike;
  }): Promise<trades[]> => {
    const criteria: Prisma.tradesWhereInput = { isDeleted: false };
    return this.prismaService.trades.findMany({
      where: criteria,
      distinct: ['symbol'],
      orderBy: sort,
    });
  };

  // getMinMaxPriceBySymbol = async (filters: {
  //   symbol?: string;
  //   startDate?: Date;
  //   endDate?: Date;
  //   limit: number;
  //   offset: number;
  // }): Promise<IMinMaxInstance[]> => {

  //   const { symbol, startDate, endDate, offset, limit, sort } = filters;
  //   const criteria: Prisma.tradesWhereInput = { isDeleted: false };
  //   if (symbol) {
  //     criteria.symbol = symbol;
  //   }

  //   if (startDate && endDate) {
  //     criteria.timestamp = {
  //       gte: startDate,
  //       lte: endDate,
  //     };
  //   } else if (startDate) {
  //     criteria.timestamp = {
  //       gte: startDate,
  //     };
  //   } else if (endDate) {
  //     criteria.timestamp = {
  //       lte: endDate,
  //     };
  //   }
  //   return this.dbConnection<ITradeInstance[]>(
  //     async (connection: DBConfiguration) => {
  //       const { Models, Operations: Op } = connection;
  //       if (Models && Op) {
  //         const { trade: Trade } = Models;
  //         const { symbol, startDate, endDate } = filters;
  //         const options: any = [];

  //         if (startDate && endDate) {
  //           options.push({
  //             timestamp: {
  //               [Op.between]: [startDate, endDate],
  //             },
  //           });
  //         } else if (startDate) {
  //           options.push({ timestamp: { [Op.gte]: startDate } });
  //         } else if (endDate) {
  //           options.push({ timestamp: { [Op.lte]: endDate } });
  //         }

  //         const criteria: any = { symbol, isDeleted: false };
  //         if (options.length) {
  //           criteria[Op.and] = options;
  //         }
  //         return await Trade.findAll<IMinMaxInstance[]>({
  //           attributes: [
  //             [sequelize.fn('min', sequelize.col('price')), 'lowest'],
  //             [sequelize.fn('max', sequelize.col('price')), 'highest'],
  //           ],
  //           where: criteria,
  //         });
  //       }
  //     },
  //   );
  // };
}
