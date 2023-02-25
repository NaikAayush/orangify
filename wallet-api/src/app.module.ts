import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertsController } from './certs/certs.controller';
import { ContractService } from './contract/contract.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CertsController],
  providers: [AppService, ContractService],
})
export class AppModule {}
