import { Test, TestingModule } from '@nestjs/testing';
import { DemoBapController } from './demo-bap.controller';

describe('DemoBapController', () => {
  let controller: DemoBapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoBapController],
    }).compile();

    controller = module.get<DemoBapController>(DemoBapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
