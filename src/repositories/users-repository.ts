import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  findByEmail(eail: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
