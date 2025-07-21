import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Record start time
    const start = Date.now();
    
    // Process request
    res.on('finish', () => {
      // Calculate duration
      const duration = (Date.now() - start) / 1000;
      
      // Skip metrics endpoint to avoid circular data
      if (req.path !== '/metrics') {
        // Get normalized path
        const path = this.normalizePath(req);
        
        // Record request count
        this.metricsService.httpRequestsTotal.inc({
          method: req.method,
          path,
          status: res.statusCode,
        });
        
        // Record request duration
        this.metricsService.httpRequestDuration.observe(
          {
            method: req.method,
            path,
            status: res.statusCode,
          },
          duration,
        );
      }
    });
    
    next();
  }

  // Helper method to normalize path for better metrics aggregation
  private normalizePath(req: Request): string {
    // If there's a route path available from the router, use it
    if (req.route && req.route.path) {
      return req.route.path;
    }
    
    // Otherwise use the actual path
    return req.path;
  }
}
