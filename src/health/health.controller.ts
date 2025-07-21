import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  @HttpCode(200) // Explicitly set status code to 200
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'bands-api',
      uptime: process.uptime(),
    };
  }
}
