import { Test, TestingModule } from '@nestjs/testing';
import { FdaMedicineService } from './fda-medicine.service';

describe('FdaMedicineService', () => {
  let service: FdaMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FdaMedicineService],
    }).compile();

    service = module.get<FdaMedicineService>(FdaMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
