import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { RealtimeModule } from '../realtime/realtime.module';
import { VesselsService } from './vessels.service';
import { VesselsController } from './vessels.controller';
import { VesselAnalyticsService } from './vessel-analytics.service';
import { VesselAnalyticsController } from './vessel-analytics.controller';

@Module({
  imports: [CommonModule, RealtimeModule],
  providers: [VesselsService, VesselAnalyticsService],
  controllers: [VesselsController, VesselAnalyticsController]
})
export class VesselsModule { }
