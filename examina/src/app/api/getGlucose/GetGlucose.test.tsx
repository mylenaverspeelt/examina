import { createMocks } from 'node-mocks-http';

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

  it('should return glucose result count by category', async () => {
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

  it('should correctly count borderline values for pre-diabetes and diabetes', async () => {
    const glucoseMock = [
      { result: 99 },
      { result: 100 },
      { result: 125 },
      { result: 126 },
      { result: 150 }
    ];

    findManyMock.mockResolvedValue(glucoseMock);

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);
    const result = await response.json();

    expect(result.normalCount).toBe(glucoseMock.filter(g => g.result <= 99).length);
    expect(result.preDiabetesCount).toBe(glucoseMock.filter(g => g.result >= 100 && g.result <= 125).length);
    expect(result.diabetesCount).toBe(glucoseMock.filter(g => g.result >= 126).length);

  });


  it('should return an error if failed to fetch glucose results', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);

    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result.error).toContain('Erro ao buscar os resultados de glicose');
  });

});
