import { Controller, Get, Param } from '@nestjs/common';
import { VesselAnalyticsService } from './vessel-analytics.service';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('vessels/:id/analytics')
export class VesselAnalyticsController {
    constructor(private readonly analyticsService: VesselAnalyticsService) {}

    @Get('overview')
    getOverview(@Param('id') id: string) {
        return this.analyticsService.getAnalytics(id);
    }

    @Get('trips')
    getTrips(@Param('id') id: string) {
        return this.analyticsService.getTrips(id);
    }

    @Get('heatmap')
    getHeatmap(@Param('id') id: string) {
        return this.analyticsService.getHeatmap(id);
    }

    @Get('alerts')
    getAlerts(@Param('id') id: string) {
        return this.analyticsService.getAlerts(id);
    }

    @Get('timeline')
    getTimeline(@Param('id') id: string) {
        return this.analyticsService.getTimeline(id);
    }
}
