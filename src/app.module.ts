import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TradesModule } from './trades/trades.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TradesModule],
})
export class AppModule {}
