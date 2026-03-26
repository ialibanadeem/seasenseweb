import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { VesselsService } from './vessels.service';
import { VesselsController } from './vessels.controller';

import { VesselAnalyticsService } from './vessel-analytics.service';
import { VesselAnalyticsController } from './vessel-analytics.controller';

@Module({
  imports: [CommonModule],
  providers: [VesselsService, VesselAnalyticsService],
  controllers: [VesselsController, VesselAnalyticsController]
})
export class VesselsModule { }
