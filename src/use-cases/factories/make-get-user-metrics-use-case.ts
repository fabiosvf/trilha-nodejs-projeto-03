import { GetUserMetricsUseCase } from '../get-uses-metrics';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
