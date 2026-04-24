import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { RealtimeModule } from '../realtime/realtime.module';
import { CommonModule } from '../common/common.module';
import { AlertsDetectorService } from './alerts-detector.service';
import { AlertsCronService } from './alerts-cron.service';

@Module({
    imports: [
        forwardRef(() => RealtimeModule), 
        CommonModule,
        ScheduleModule.forRoot()
    ],
    controllers: [AlertsController],
    providers: [AlertsService, AlertsDetectorService, AlertsCronService],
    exports: [AlertsService, AlertsDetectorService],
})
export class AlertsModule { }
