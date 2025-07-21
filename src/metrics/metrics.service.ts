import { Injectable, OnModuleInit } from '@nestjs/common';
import { Registry, Counter, Gauge, Histogram } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly registry: Registry;
  
  // Basic metrics
  public httpRequestsTotal: Counter;
  public httpRequestDuration: Histogram;
  public memoryUsage: Gauge;
  
  constructor() {
    this.registry = new Registry();
    
    // Create HTTP request counter
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
      registers: [this.registry],
    });
    
    // Create HTTP request duration histogram
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'path', 'status'],
      registers: [this.registry],
    });
    
    // Create memory usage gauge
    this.memoryUsage = new Gauge({
      name: 'nodejs_memory_usage_bytes',
      help: 'Memory usage of the Node.js process',
      labelNames: ['type'],
      registers: [this.registry],
      collect() {
        const memoryUsage = process.memoryUsage();
        this.set({ type: 'rss' }, memoryUsage.rss);
        this.set({ type: 'heapTotal' }, memoryUsage.heapTotal);
        this.set({ type: 'heapUsed' }, memoryUsage.heapUsed);
        this.set({ type: 'external' }, memoryUsage.external);
      },
    });
  }
  
  onModuleInit() {
    // Register metrics
    this.registry.registerMetric(this.httpRequestsTotal);
    this.registry.registerMetric(this.httpRequestDuration);
    this.registry.registerMetric(this.memoryUsage);
  }
  
  // Get metrics for Prometheus
  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
