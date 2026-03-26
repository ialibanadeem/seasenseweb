import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationUpdatePayload } from '../realtime/interfaces/tracking.interface';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Post('update')
    async recordLocation(@Body() data: LocationUpdatePayload) {
        return this.locationService.recordLocation(data);
    }

    @Get('latest/:tripId')
    async getLatest(@Param('tripId') tripId: string) {
        return this.locationService.getLatestForTrip(tripId);
    }
}
