import { NextRequest, NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';

const findManyMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    patient: {
      findMany: findManyMock,
    },
  })),
}));

const { GET } = require('./route');

describe('GET /api/patients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 400 if no query parameter is provided', async () => {
    const mockRequest = {
      url: 'http://localhost/api/patients',
    } as NextRequest;

    const response = await GET(mockRequest);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Parâmetro de busca inválido' });
  });

  it('should return 500 if an error occurs when querying the database', async () => {
    const mockRequest = {
      url: 'http://localhost/api/patients?query=John',
    } as NextRequest;


    findManyMock.mockRejectedValue(new Error('Database error'));

    const response = await GET(mockRequest);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Erro ao buscar pacientes' });
  });

  it('should return a list of patients if query is valid', async () => {
    const mockRequest = {
      url: 'http://localhost/api/patients?query=John',
    } as NextRequest;

    findManyMock.mockResolvedValue([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Johnny Depp' },
    ]);

    const response = await GET(mockRequest);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      patients: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Johnny Depp' },
      ],
    });
  });
});
