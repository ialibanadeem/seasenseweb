import { Module } from '@nestjs/common';
import { TrackingGateway } from './tracking/tracking.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GpsSyncService } from './gps-sync.service';
import { CommonModule } from '../common/common.module';
import { RedisModule } from '../redis/redis.module';
import { AlertsModule } from '../alerts/alerts.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secret',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRATION') || '24h') as any
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    RedisModule,
    forwardRef(() => AlertsModule),
  ],
  providers: [TrackingGateway, GpsSyncService],
  exports: [TrackingGateway],
})
export class RealtimeModule { }
