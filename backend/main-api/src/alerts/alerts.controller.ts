import { Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
    constructor(private readonly alertsService: AlertsService) {}

    @Get()
    async getAllAlerts() {
        return this.alertsService.getFormattedAlerts();
    }

    @Get('kpis')
    async getKpis() {
        return this.alertsService.getKpis();
    }

    @Get('trends')
    async getTrends() {
        return this.alertsService.getTrends();
    }

    @Patch(':id/toggle-read')
    async toggleRead(@Param('id') id: string) {
        return this.alertsService.toggleReadStatus(id);
    }

    @Post('mark-all-read')
    async markAllRead() {
        return this.alertsService.markAllRead();
    }

    @Post(':id/action')
    async dispatchAction(@Param('id') id: string) {
        return this.alertsService.dispatchAction(id);
    }
}
