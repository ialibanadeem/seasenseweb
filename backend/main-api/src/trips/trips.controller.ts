import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripFilterDto } from './dto/trip-filter.dto';
@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Get()
    findAll(@Query() query: TripFilterDto) {
        return this.tripsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tripsService.findOne(id);
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
