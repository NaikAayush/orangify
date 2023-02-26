import { Body, Controller, Post } from '@nestjs/common';

@Controller('demo-bap')
export class DemoBapController {
  @Post('')
  get(@Body() body: any) {
    console.log(body);
  }
}
