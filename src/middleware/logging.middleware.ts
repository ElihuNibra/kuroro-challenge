import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private requests: { userId: string; ip: string }[] = [];

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    //I will lokk if there's an user Id to prooced width the saving
    if (authorizationHeader) {
      const userId = authorizationHeader.replace('Bearer ', '');
      // If i have thye, auth delete the Bearer part
      const ip = req.ip;
      console.log(`User:${userId}, has been saved with the following IP:${ip}`);
      // I Only save the IP if i have an userID
      this.requests.push({ userId, ip });
    }
    next();
  }

  getRequestsAndReset(): { userId: string; ip: string }[] {
    const requests = [...this.requests];
    this.requests = [];
    return requests;
  }
}
