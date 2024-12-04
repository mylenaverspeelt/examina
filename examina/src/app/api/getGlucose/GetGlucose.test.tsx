import { createMocks } from 'node-mocks-http';
import { PrismaClient } from '@prisma/client';

const findManyMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    glucose: {
      findMany: findManyMock,
    },
  })),
}));

const { GET } = require('./route');

describe('GET /api/getGlucose', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve retornar contagem de resultados de glicose por categoria', async () => {
    const glucoseMock = [
      { result: 95 },
      { result: 105 },
      { result: 130 },
      { result: 90 },
      { result: 140 }
    ];

    findManyMock.mockResolvedValue(glucoseMock);

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);

    const result = await response.json();

    expect(result).toEqual({
      normalCount: 2,
      preDiabetesCount: 1,
      diabetesCount: 2
    });
  });

  it('deve retornar erro se falhar ao buscar os resultados de glicose', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);

    expect(response.status).toBe(500);
    
    const result = await response.json();
    expect(result).toEqual({ error: 'Erro ao buscar os resultados de glicose' });
  });
});