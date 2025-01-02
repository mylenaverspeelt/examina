jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
      patient: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      glucose: {
        findMany: jest.fn(),
      },
      storage: {
        findMany: jest.fn(),
      },
    })),
  }));
  