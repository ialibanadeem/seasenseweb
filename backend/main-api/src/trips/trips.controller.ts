import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Get()
    findAll() {
        return this.tripsService.findAll();
    }

    @Post(':vesselId/start')
    startTrip(
        @Param('vesselId') vesselId: string,
        @Body('startTime') startTime: string,
    ) {
        return this.tripsService.startTrip(vesselId, new Date(startTime));
    }

    @Post(':tripId/end')
    endTrip(
        @Param('tripId') tripId: string,
        @Body('endTime') endTime: string,
    ) {
        return this.tripsService.endTrip(tripId, new Date(endTime));
    }

    @Get('history/:vesselId')
    getHistory(@Param('vesselId') vesselId: string) {
        return this.tripsService.getTripHistory(vesselId);
    }
}
