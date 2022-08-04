import { Injectable } from '@nestjs/common';
import { JSONLike, Response } from 'src/common/models';
import { IGetAll } from './Dto/Request';
import { UsersRepository } from './user.respository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(params: IGetAll): Promise<Response> {
    const { name, sort } = params;
    let { size, page } = params;

    if (!size) {
      size = '10';
    }
    if (!page) {
      page = '1';
    }

    let sortFilter: JSONLike = { updatedAt: 'desc' };
    if (sort) {
      sortFilter = {
        [sort.split(',')[0]]: sort.split(',')[1],
      };
    }

    const limit = Number(size);
    const offset = (Number(page) - 1) * limit;

    const users = await this.usersRepository.getAll({
      name,
      limit,
      offset,
      sort: sortFilter,
    });

    const count = await this.usersRepository.count({
      name,
      sort: sortFilter,
    });

    const pageable = { totalElements: count, page, size };

    return new Response(200, { users: users, pageable });
  }
}
