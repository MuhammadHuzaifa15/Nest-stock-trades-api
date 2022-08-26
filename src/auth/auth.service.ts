import { Injectable } from '@nestjs/common';
import { Response } from 'src/common/models';
import { ISignIn } from './Dto/Request';
import { UsersRepository } from '../users/user.respository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(credential: ISignIn) {
    const { name } = credential;

    const user = await this.usersRepository.getByName(name);

    if (!user) {
      return new Response(404).setMsg('Account not found.');
    }

    return new Response(200, { id: user.id });
  }
}
