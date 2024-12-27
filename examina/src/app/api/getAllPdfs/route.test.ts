import { createMocks } from 'node-mocks-http';

const findManyMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    storage: {
      findMany: findManyMock,
    },
  })),
}));

const { GET } = require('./route');

describe('GET /api/pdfs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of PDFs in base64', async () => {
    const pdfsMock = [
      {
        id: 1,
        fileName: 'documento.pdf',
        pdf: Buffer.from('conteúdo do PDF'),
        createdAt: new Date('2024-12-03T14:30:39.128Z'),
      },
    ];

    findManyMock.mockResolvedValue(pdfsMock);

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);

    expect(response.status).toBe(200);

    const result = await response.json();

    expect(result[0].base64Pdf).toMatch(/^([A-Za-z0-9+/=])+$/);
    expect(result[0].createdAt).toBe(pdfsMock[0].createdAt.toISOString());
  });

  it('should return an error if failed to fetch PDFs', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    const response = await GET(req, res);

    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result).toEqual({ error: "Erro ao buscar PDFs: Database error"});
    expect(result.error).toContain('Database error');
  });
});