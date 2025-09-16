import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FileContentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.buffer || file.size === 0) {
          throw new BadRequestException('Um dos arquivos enviados está vazio');
        }
      }
    }
    next();
  }
}
