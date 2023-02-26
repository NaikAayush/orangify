import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { dummyDb } from 'src/posting/posting.controller';
import { Job } from 'src/posting/schemas';
import { createAuthorizationHeader } from './crypt';
import {
  Catalog,
  Context,
  Error,
  Item,
  Location,
  SearchMessage,
  SelectMessage,
  SelectResponseMessage,
  Tag,
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

const BPP_ID = 'orangify-network-2';
const BPP_URI = 'https://bpp.orangify.network/beckn';

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
          descriptor: { name: 'Orange Jobs' },
          providers: Array.from(orgs.entries()).map(([org, orgData], i) => {
            return {
              id: i.toString(),
              descriptor: { name: org },
              locations: orgData.locs,
              items: orgData.items,
            };
          }),
        },
      };

      const ctx: Context = JSON.parse(JSON.stringify(body.context));
      ctx.action = 'on_search';
      ctx.bpp_id = BPP_ID;
      ctx.bpp_uri = BPP_URI;
      const bapBody = {
        context: ctx,
        message,
      };

      try {
        const resp = await firstValueFrom(
          this.httpService.post(
            makeBapUrl(body.context.bap_uri, 'on_search'),
            bapBody,
            {
              headers: {
                Authorization: await createAuthorizationHeader(bapBody),
              },
            },
          ),
        );
        console.log(resp.data);
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
      }
    };

    searcher();

    return {
      ack: { status: 'ACK' },
      error: null,
    };
  }

  @Post('select')
  select(@Body() body: RequestContext & { message: SelectMessage }): Response {
    const items = body.message.order.items;
    if (items.length > 1) {
      return {
        ack: { status: 'ACK' },
        error: {
          type: 'CORE-ERROR',
          code: 'Orange',
          message: 'Cannot select more than one item at a time',
        },
      };
    }
    const item = items[0];
    const job = dummyDb.jobPostings.get(item.id);
    const provider = {
      descriptor: {
        name: job.hiringOrganization.name,
      },
      fulfillments: job.jobLocationType.map((loc, i) => {
        return { id: (i + 1).toString(), type: loc, tracking: false };
      }),
      locations: [
        {
          id: '1',
          descriptor: { name: job.jobLocation.address.name },
          country: { name: job.jobLocation.address.addressCountry },
          city: { name: job.jobLocation.address.addressRegion },
        },
      ],
    };
    const tags: Tag[] = [];
    job.qualifications.forEach((qual) => {
      tags.push({
        descriptor: { name: qual.type, code: qual.type },
        display: true,
        list: qual.values.map((v) => {
          return { descriptor: { name: v.kind, code: v.kind }, value: v.value };
        }),
      });
    });
    const jobItem = {
      id: item.id,
      descriptor: {
        name: job.title,
        long_desc: job.description,
      },
      category_ids: [],
      fulfillment_ids: job.jobLocationType.map((_, i) => (i + 1).toString()),
      location_ids: ['1'],
      xinput: {
        form: {
          url: '',
        },
      },
      time: {
        range: {
          start: job.datePosted,
          end: job.validThrough,
        },
      },
      tags,
      // tags: [
      //   // ...(...(job.qualifications.map(qual => {
      //   //   return [];
      //   // }))),
      //   // { descriptor: { name: 'Qualifications' }, list: job.qualifications.map(qual => {
      //   //   return {
      //   //     descriptor: {
      //   //       name: qual.type
      //   //     }
      //   //   }
      //   // }), display: true },
      // ],
    };
    const respMsg: SelectResponseMessage = {
      order: { provider, items: [jobItem], type: 'DEFAULT' },
    };
    // dummyDb.jobPostings.get(body.message.order.items);

    const ctx: Context = JSON.parse(JSON.stringify(body.context));
    ctx.action = 'on_select';
    ctx.bpp_id = BPP_ID;
    ctx.bpp_uri = BPP_URI;
    const bapBody = {
      context: ctx,
      message: respMsg,
    };

    const dostuff = async () => {
      try {
        const resp = await firstValueFrom(
          this.httpService.post(
            makeBapUrl(body.context.bap_uri, 'on_select'),
            bapBody,
            {
              headers: {
                Authorization: await createAuthorizationHeader(bapBody),
              },
            },
          ),
        );
        console.log(resp.data);
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
      }
    };

    dostuff();

    return {
      ack: { status: 'ACK' },
      error: null,
    };
  }
}
