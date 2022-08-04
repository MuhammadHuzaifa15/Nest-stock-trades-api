import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { JSONLike } from 'src/common/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll = async (filters: {
    name?: string;
    limit: number;
    offset: number;
    sort: JSONLike;
  }): Promise<users[]> => {
    const { name, offset, limit, sort } = filters;
    const criteria: JSONLike = { isDeleted: false };

    if (name) {
      criteria.name = {
        contains: name,
      };
    }

    return await this.prismaService.users.findMany({
      skip: offset,
      take: limit,
      where: criteria,
      orderBy: sort,
    });
  };

  count = async (filters: {
    name?: string;
    sort: JSONLike;
  }): Promise<number> => {
    const { name, sort } = filters;
    const criteria: JSONLike = { isDeleted: false };

    if (name) {
      criteria.name = {
        contains: name,
      };
    }

    return await this.prismaService.users.count({
      where: criteria,
      orderBy: sort,
    });
  };
}
