import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);
    
    private readonly lat = 24.75;
    private readonly lon = 66.95;

    async getMarineIntelligence() {
        try {
            const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${this.lat}&longitude=${this.lon}&daily=wave_height_max,swell_wave_height_max,wind_wave_height_max&hourly=wave_height&models=best_match&current=wave_height,wave_direction,wind_wave_height,sea_surface_temperature,ocean_current_velocity,ocean_current_direction,sea_level_height_msl,wave_period,wind_wave_direction,swell_wave_height&past_days=0&forecast_days=7&wind_speed_unit=kn&minutely_15=ocean_current_velocity,ocean_current_direction,sea_level_height_msl&past_minutely_15=24&forecast_minutely_15=24&forecast_hours=6&cell_selection=nearest`;
            const response = await axios.get(url);
            const data = response.data;

            const current = data.current;
            const minutely = data.minutely_15;
            
            // Calculate Risk Level
            const waveHeight = current.wave_height || current.wind_wave_height || 0;
            const currentSpeed = current.ocean_current_velocity || 0;
            
            let riskLevel = 'Safe';
            if (waveHeight > 2.0 || currentSpeed > 1.5) {
                riskLevel = 'Dangerous';
            } else if (waveHeight > 1.0 || currentSpeed > 0.8) {
                riskLevel = 'Moderate';
            }

            // Calculate Tide Trend (Rising/Falling)
            let tideTrend = 'Stable';
            const seaLevels = minutely.sea_level_height_msl;
            if (seaLevels && seaLevels.length > 24) {
                // Compare current (index 24 is roughly 'now' if past_minutely_15=24) to +4 hours (index 24 + 16 = 40)
                const currentLevel = seaLevels[24] || 0;
                const futureLevel = seaLevels[40] || 0;
                if (futureLevel > currentLevel + 0.1) tideTrend = 'Rising';
                else if (futureLevel < currentLevel - 0.1) tideTrend = 'Falling';
            }

            // Calculate Sea Condition Score (0-100)
            let score = 100 - (waveHeight * 25) - (currentSpeed * 15);
            score = Math.max(0, Math.min(100, Math.round(score)));

            // Compute Safe Sailing Window (Next X hours)
            let safeHours = 0;
            if (data.hourly && data.hourly.wave_height) {
                for (let i = 0; i < data.hourly.wave_height.length; i++) {
                    const hWave = data.hourly.wave_height[i];
                    if (hWave && hWave < 1.5) {
                        safeHours++;
                    } else if (hWave >= 1.5) {
                        break; // Window ends
                    }
                }
            }

            return {
                live: {
                    waveHeight,
                    waveDirection: current.wave_direction || 0,
                    windWaveHeight: current.wind_wave_height || 0,
                    seaSurfaceTemp: current.sea_surface_temperature || 0,
                    currentSpeed: current.ocean_current_velocity || 0,
                    currentDirection: current.ocean_current_direction || 0,
                    tideLevel: current.sea_level_height_msl || 0,
                    tideTrend,
                    riskLevel
                },
                intelligence: {
                    seaConditionScore: score,
                    safeSailingWindowHours: safeHours
                },
                forecast: {
                    hourly: data.hourly,
                    daily: data.daily,
                    minutely: data.minutely_15
                }
            };
        } catch (error) {
            this.logger.error(`Failed to fetch marine data: ${error.message}`);
            throw new HttpException('Failed to fetch marine data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
