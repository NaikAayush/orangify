import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingController } from './posting/posting.controller';
import { BecknController } from './beckn/beckn.controller';
import { DemoBapController } from './demo-bap/demo-bap.controller';
import { HttpModule } from '@nestjs/axios';
import { NextFunction, Request, Response } from 'express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [
    AppController,
    PostingController,
    BecknController,
    DemoBapController,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        console.log(JSON.stringify(req.body));
        console.log('BAP got request', req.body);
        // console.log('catalog', req.body.message.catalog);
        console.dir(req.body.message, { depth: null });
        // console.log('providers', req.body.message.catalog['bpp/providers']);
        res.send({ status: 'nice', body: req.body });
        next();
      })
      .forRoutes({
        path: '/demo-bap/**',
        method: RequestMethod.ALL,
      });
  }
}
