import { Injectable } from '@nestjs/common';
import { Prisma, users } from '@prisma/client';
import { JSONLike } from 'src/common/models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: Prisma.usersCreateInput): Promise<users> {
    return this.prismaService.users.create({
      data: payload,
    });
  }

  async update({ id, name }: { id: number; name: string }): Promise<users> {
    const criteria: Prisma.usersWhereUniqueInput = { id };

    return this.prismaService.users.update({
      data: {
        name,
      },
      where: criteria,
    });
  }

  async getById(id: number | undefined): Promise<users> {
    const criteria: Prisma.usersWhereInput = { isDeleted: false, id };
    return this.prismaService.users.findFirst({
      where: criteria,
    });
  }

  async getAll(filters: {
    name?: string;
    limit: number;
    offset: number;
    sort: JSONLike;
  }): Promise<users[]> {
    const { name, offset, limit, sort } = filters;
    const criteria: Prisma.usersWhereInput = { isDeleted: false };

    if (name) {
      criteria.name = {
        contains: name,
      };
    }

    return this.prismaService.users.findMany({
      skip: offset,
      take: limit,
      where: criteria,
      orderBy: sort,
    });
  }

  async count(filters: { name?: string; sort: JSONLike }): Promise<number> {
    const { name, sort } = filters;
    const criteria: Prisma.usersWhereInput = { isDeleted: false };

    if (name) {
      criteria.name = {
        contains: name,
      };
    }

    return this.prismaService.users.count({
      where: criteria,
      orderBy: sort,
    });
  }

  async getByName(name: string): Promise<users> {
    const criteria: Prisma.usersWhereInput = { isDeleted: false };

    if (name) {
      criteria.name = name;
    }
    return this.prismaService.users.findFirst({
      where: criteria,
    });
  }

  async deleteAllUsers(): Promise<Prisma.BatchPayload> {
    return this.prismaService.users.deleteMany();
  }
}
