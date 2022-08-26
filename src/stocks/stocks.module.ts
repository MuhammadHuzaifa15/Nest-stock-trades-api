import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StocksService } from './stocks.service';
import { TradesRepository } from 'src/trades/trades.repository';
import { StocksController } from './stocks.controller';

@Module({
  imports: [PrismaModule],
  controllers: [StocksController],
  providers: [StocksService, TradesRepository],
})
export class StocksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('stocks');
  }
}
