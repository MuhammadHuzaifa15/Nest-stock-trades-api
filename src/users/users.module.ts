import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
