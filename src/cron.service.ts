// cron.service.ts

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as https from 'https';

@Injectable()
export class CronService {
  constructor() {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    try {
      await this.pingServer();
      console.log('Pinging server to keep it alive...');
    } catch (error) {
      console.error('Error pinging server:', error.message);
    }
  }

  private pingServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const options = {
        hostname: 'jcyclebackend.onrender.com',
        method: 'GET',
        timeout: 60000,
      };

      const req = https.request(options, (res) => {
        console.log(`Ping response: ${res.statusCode}`);
        resolve();
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timed out'));
      });

      req.on('error', (err) => {
        console.error('Ping error:', err.message);
        reject(err);
      });

      req.end();
    });
  }
}
