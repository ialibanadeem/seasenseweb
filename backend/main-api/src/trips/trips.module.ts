import { Module } from '@nestjs/common';
import { AlertsModule } from '../alerts/alerts.module';
import { LocationModule } from '../location/location.module';
import { CommonModule } from '../common/common.module';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { LocationService } from './location.service';
import { AlertsService } from './alerts.service';

@Module({
  imports: [CommonModule, LocationModule, AlertsModule],
  providers: [TripsService],
  controllers: [TripsController]
})
export class TripsModule { }
