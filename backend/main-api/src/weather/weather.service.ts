import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);
    
    private readonly seaLat = 24.75;
    private readonly seaLon = 66.95;
    private readonly cityLat = 24.86;
    private readonly cityLon = 67.01;

    async getMarineIntelligence() {
        try {
            // Fetch Marine Data (Waves, Currents)
            const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${this.seaLat}&longitude=${this.seaLon}&daily=wave_height_max,swell_wave_height_max,wind_wave_height_max&hourly=wave_height&models=best_match&current=wave_height,wave_direction,wind_wave_height,sea_surface_temperature,ocean_current_velocity,ocean_current_direction,sea_level_height_msl,wave_period,wind_wave_direction,swell_wave_height&wind_speed_unit=kn&temperature_unit=celsius&minutely_15=ocean_current_velocity,ocean_current_direction,sea_level_height_msl&past_minutely_15=24&forecast_minutely_15=24&forecast_hours=6&cell_selection=nearest`;
            
            // Fetch Land Weather Data (Air Temp, Humidity, Wind)
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.cityLat}&longitude=${this.cityLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=kmh&temperature_unit=celsius`;

            const [marineRes, weatherRes] = await Promise.all([
                axios.get(marineUrl, { timeout: 8000 }),
                axios.get(weatherUrl, { timeout: 8000 })
            ]);

            const mData = marineRes.data || {};
            const wData = weatherRes.data || {};

            const mCurrent = mData.current || {};
            const wCurrent = wData.current || {};
            const minutely = mData.minutely_15 || {};
            
            // Calculate Risk Level
            const waveHeight = mCurrent.wave_height ?? mCurrent.wind_wave_height ?? 0;
            const currentSpeed = mCurrent.ocean_current_velocity ?? 0;
            
            let riskLevel = 'Safe';
            if (waveHeight > 2.0 || currentSpeed > 1.5) {
                riskLevel = 'Dangerous';
            } else if (waveHeight > 1.0 || currentSpeed > 0.8) {
                riskLevel = 'Moderate';
            }

            // Calculate Tide Trend
            let tideTrend = 'Stable';
            const seaLevels = minutely.sea_level_height_msl;
            if (seaLevels && Array.isArray(seaLevels) && seaLevels.length > 24) {
                const currentLevel = seaLevels[24] ?? 0;
                const futureLevel = seaLevels[40] ?? seaLevels[seaLevels.length - 1] ?? 0;
                if (futureLevel > currentLevel + 0.1) tideTrend = 'Rising';
                else if (futureLevel < currentLevel - 0.1) tideTrend = 'Falling';
            }

            // Calculate Sea Condition Score
            let score = 100 - (waveHeight * 25) - (currentSpeed * 15);
            score = Math.max(0, Math.min(100, Math.round(score)));

            // Compute Safe Sailing Window
            let safeHours = 0;
            if (mData.hourly && Array.isArray(mData.hourly.wave_height)) {
                for (let i = 0; i < mData.hourly.wave_height.length; i++) {
                    const hWave = mData.hourly.wave_height[i];
                    if (hWave !== null && hWave !== undefined && hWave < 1.5) {
                        safeHours++;
                    } else if (hWave >= 1.5) {
                        break;
                    }
                }
            }

            return {
                live: {
                    // Marine
                    waveHeight,
                    waveDirection: mCurrent.wave_direction ?? 0,
                    windWaveHeight: mCurrent.wind_wave_height ?? 0,
                    seaSurfaceTemp: mCurrent.sea_surface_temperature ?? 0,
                    currentSpeed: mCurrent.ocean_current_velocity ?? 0,
                    currentDirection: mCurrent.ocean_current_direction ?? 0,
                    tideLevel: mCurrent.sea_level_height_msl ?? 0,
                    tideTrend,
                    riskLevel,
                    // Land Weather
                    airTemp: wCurrent.temperature_2m ?? 0,
                    humidity: wCurrent.relative_humidity_2m ?? 0,
                    windSpeed: wCurrent.wind_speed_10m ?? 0,
                    windDirection: wCurrent.wind_direction_10m ?? 0,
                    conditionCode: wCurrent.weather_code ?? 0
                },
                intelligence: {
                    seaConditionScore: score,
                    safeSailingWindowHours: safeHours
                },
                forecast: {
                    hourly: mData.hourly || {},
                    daily: mData.daily || {},
                    minutely: mData.minutely_15 || {}
                }
            };
        } catch (error) {
            this.logger.error(`Failed to fetch marine data: ${error.message}`, error.stack);
            throw new HttpException(`Marine Intelligence Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
