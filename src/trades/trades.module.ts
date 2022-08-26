import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TradesController } from './trades.controller';
import { TradesRepository } from './trades.repository';
import { UsersRepository } from '../users/user.repository';
import { TradesService } from './trades.service';

@Module({
  imports: [PrismaModule],
  controllers: [TradesController],
  providers: [TradesService, UsersRepository, TradesRepository],
})
export class TradesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('trades');
  }
}
