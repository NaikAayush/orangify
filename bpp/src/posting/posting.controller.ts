import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Job } from './schemas';

const dummyDb: { jobPostings: Map<string, Job> } = {
  jobPostings: new Map(),
};

@Controller('posting')
export class PostingController {
  @Post()
  newPosting(@Body() body: Job) {
    if (dummyDb.jobPostings.has(body.id)) {
      throw new HttpException('ID already exists', HttpStatus.BAD_REQUEST);
    } else {
      dummyDb.jobPostings.set(body.id, body);
    }
  }

  @Get()
  get(@Query('id') id: string | null | undefined): Job | Job[] {
    if (id === null || id === undefined) {
      return Array.from(dummyDb.jobPostings.values());
    } else {
      const job = dummyDb.jobPostings.get(id);
      if (job === null || job === undefined) {
        throw new HttpException('ID does not exist', HttpStatus.NOT_FOUND);
      } else {
        return job;
      }
    }
  }
}
