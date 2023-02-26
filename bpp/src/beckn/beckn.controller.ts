import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { dummyDb } from 'src/posting/posting.controller';
import { Job } from 'src/posting/schemas';
import {
  Catalog,
  Context,
  Error,
  Item,
  Location,
  SearchMessage,
} from './schemas';

interface RequestContext {
  context: Context;
}

interface Response {
  ack: {
    status: 'ACK' | 'NACK';
  };
  error: Error;
}

function makeBapUrl(prefix: string, endpoint: string): string {
  if (!prefix.endsWith('/')) {
    prefix = prefix + '/';
  }

  return `${prefix}${endpoint}`;
}

@Controller('beckn')
export class BecknController {
  constructor(private readonly httpService: HttpService) {}

  @Post('search')
  search(@Body() body: RequestContext & { message: SearchMessage }): Response {
    const searchKeys = body.message.intent.item.descriptor.name
      .split(' ')
      .map((s) => s.toLowerCase());

    const searcher = async () => {
      const searched: Job[] = [];

      dummyDb.jobPostings.forEach((job) => {
        for (const key of searchKeys) {
          if (job.title.toLowerCase().includes(key)) {
            searched.push(job);
            break;
          }
        }
      });

      const orgs: Map<string, { locs: Location[]; items: Item[] }> = new Map();
      for (const job of searched) {
        if (!orgs.has(job.hiringOrganization.name)) {
          orgs.set(job.hiringOrganization.name, { locs: [], items: [] });
        }

        const locs = orgs.get(job.hiringOrganization.name).locs;
        const items = orgs.get(job.hiringOrganization.name).items;
        const addr = job.jobLocation.address;

        const locId = (locs.length + 1).toString();

        locs.push({
          id: locId,
          descriptor: { name: addr.name },
          country: { name: addr.addressCountry },
          city: { name: addr.addressRegion },
        });
        // orgs.add(job.hiringOrganization.name);

        items.push({
          id: job.id,
          descriptor: { name: job.title, long_desc: job.description },
          location_ids: [locId],
        });
      }

      const message: { catalog: Catalog } = {
        catalog: {
          'bpp/descriptor': { name: 'Orange Jobs' },
          'bpp/providers': Array.from(orgs.entries()).map(
            ([org, orgData], i) => {
              return {
                id: i.toString(),
                descriptor: { name: org },
                locations: orgData.locs,
                items: orgData.items,
              };
            },
          ),
        },
      };

      const resp = await firstValueFrom(
        this.httpService.post(makeBapUrl(body.context.bap_uri, 'on_search'), {
          context: body.context,
          message,
        }),
      );
      console.log(resp.data);
    };

    searcher();

    return {
      ack: { status: 'ACK' },
      error: null,
    };
  }
}
