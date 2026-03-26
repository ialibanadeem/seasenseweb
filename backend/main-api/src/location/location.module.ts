import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CommonModule } from '../common/common.module';
import { LocationController } from './location.controller';
import { GpsController } from './gps.controller';
import { GpsPollerService } from './gps-poller.service';
import { LocationService } from './location.service';

@Module({
  imports: [CommonModule, RedisModule],
  controllers: [LocationController, GpsController],
  providers: [LocationService, GpsPollerService],
  exports: [LocationService],
})
export class LocationModule { }
