import { NextRequest, NextResponse } from 'next/server';

const findManyMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    glucose: {
      findMany: findManyMock,
    },
  })),
}));

const { GET } = require('./route');

describe('GET /api/glucose/[id]', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 500 if an error occurs when querying the glucose records', async () => {
    const mockRequest = {
      url: 'http://localhost/api/glucose/1',
    } as NextRequest;

    // Simulando erro ao consultar os registros de glicose
    findManyMock.mockRejectedValue(new Error('Database error'));

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Erro ao buscar registros de glicose' });
  });

  it('should return 200 and a list of glucose records if records are found', async () => {
    const mockRequest = {
      url: 'http://localhost/api/glucose/1',
    } as NextRequest;

    findManyMock.mockResolvedValue([
      { createdAt: '2024-01-01T00:00:00.000Z', result: 120 },
      { createdAt: '2024-02-01T00:00:00.000Z', result: 130 },
    ]);

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      records: [
        { createdAt: '2024-01-01T00:00:00.000Z', result: 120 },
        { createdAt: '2024-02-01T00:00:00.000Z', result: 130 },
      ],
    });
  });

  it('should return an empty list if no glucose records are found for the patient', async () => {
    const mockRequest = {
      url: 'http://localhost/api/glucose/1',
    } as NextRequest;

    // Simulando que não há registros de glicose para o paciente
    findManyMock.mockResolvedValue([]);

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ records: [] });
  });

  it('should return glucose records with correct structure', async () => {
    const mockRequest = { url: 'http://localhost/api/glucose/1' } as NextRequest;
  
    findManyMock.mockResolvedValue([
      { createdAt: '2024-01-01T00:00:00.000Z', result: 120 },
      { createdAt: '2024-02-01T00:00:00.000Z', result: 130 },
    ]);
  
    const response = await GET(mockRequest, { params: { id: '1' } });
    const result = await response.json();
  
    result.records.forEach((record: any) => {
      expect(typeof record.createdAt).toBe('string');
      expect(typeof record.result).toBe('number');
    });
  });
  
});
