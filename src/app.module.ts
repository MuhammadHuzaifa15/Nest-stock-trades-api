import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StocksModule } from './stocks/stocks.module';
import { TradesModule } from './trades/trades.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TradesModule, StocksModule],
})
export class AppModule {}
