import { Body, Controller, Post } from '@nestjs/common';
import { ISignIn } from './Dto/Request';
import { Response } from 'src/common/models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() credential: ISignIn): Promise<Response> {
    try {
      return await this.authService.signIn(credential);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return new Response(500).setMsg('Server error');
    }
  }
}
