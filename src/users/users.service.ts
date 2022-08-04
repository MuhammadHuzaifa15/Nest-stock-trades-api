import { Injectable } from '@nestjs/common';
import { JSONLike, Response } from 'src/common/models';
import { ICreate, IGetAll, IUpdate } from './Dto/Request';
import { UsersRepository } from './user.respository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(params: ICreate) {
    const { name } = params;

    const existingUser = await this.usersRepository.getByName(name);

    if (existingUser) {
      return new Response(409).setMsg('User Already Exist');
    }

    const user = await this.usersRepository.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(201, user);
  }

  async update(params: IUpdate) {
    const { id, name } = params;

    // check if name already exists
    let existingUser = await this.usersRepository.getById(id);

    if (!existingUser) {
      return new Response(404).setMsg('User not found!');
    }
    if (name !== existingUser.name) {
      existingUser = await this.usersRepository.getByName(name);

      if (existingUser) {
        return new Response(409).setMsg('User Already Exist');
      }
    }

    await this.usersRepository.update({
      id,
      name,
    });

    const updatedUser = await this.usersRepository.getById(id);

    return new Response(200, updatedUser);
  }

  async getAll(params: IGetAll): Promise<Response> {
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

  async getById(id: number) {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      return new Response(404).setMsg('User not found!');
    }
    return new Response(200, user);
  }
}
