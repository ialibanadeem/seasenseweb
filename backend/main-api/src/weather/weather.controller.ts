import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get('analytics')
    async getAnalytics() {
        return this.weatherService.getMarineIntelligence();
    }
}
