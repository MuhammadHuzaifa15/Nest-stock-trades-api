import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.users.findMany();
  }
}
