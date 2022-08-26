import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response as IResponse, NextFunction } from 'express';

import { Response } from 'src/common/models';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: IResponse, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      const result = new Response(401).setMsg(
        'Authorization failed. Token not found.',
      );
      return res.status(result.status).json(result.getBody());
    }

    try {
      req.body.user = token;
      next();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      const result = new Response(401).setMsg('Authorization failed.');
      return res.status(result.status).json(result.getBody());
    }
  }
}
