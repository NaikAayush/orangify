import { Test, TestingModule } from '@nestjs/testing';
import { BecknController } from './beckn.controller';

describe('BecknController', () => {
  let controller: BecknController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BecknController],
    }).compile();

    controller = module.get<BecknController>(BecknController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
