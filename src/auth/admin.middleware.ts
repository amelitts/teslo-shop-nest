import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (!user || !user.roles?.includes('admin')) {
      throw new ForbiddenException('Necesitas rol de admin');
    }
    next();
  }
}
