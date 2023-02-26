import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingController } from './posting/posting.controller';

@Module({
  imports: [],
  controllers: [AppController, PostingController],
  providers: [AppService],
})
export class AppModule {}
