import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export function convertBigintToString(obj: any) {
  for (const key in obj) {
    // convert main tree
    if (typeof obj[key] == 'bigint') {
      obj[key] = obj[key].toString();
    }

    for (const prop in obj[key]) {
      // recursively search for inner branches
      if (typeof obj[key][prop] == 'object') {
        convertBigintToString(obj[key]);
      } else {
        if (typeof obj[key][prop] == 'bigint') {
          obj[key][prop] = obj[key][prop].toString();
        }
      }
    }
  }
  return obj;
}

export function jsonSerializableMiddleware(
  req: any,
  res: any,
  next: NextFunction,
) {
  res.body = convertBigintToString(res.body);
  next();
}

@Injectable()
export class JsonSerializableMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    jsonSerializableMiddleware(req, res, next);
  }
}
