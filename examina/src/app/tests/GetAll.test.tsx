import { createMocks } from 'node-mocks-http';

const findManyMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    storage: {
      findMany: findManyMock,
    },
  })),
}));


const { GET } = require('./../api/getAll/route');

describe('GET /api/getAll', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve retornar uma lista de PDFs em base64', async () => {
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

    await GET(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(
      JSON.stringify([
        {
          id: 1,
          fileName: 'documento.pdf',
          base64Pdf: 'Y29udGXDumRvIGRvIFBERg==',
          createdAt: pdfsMock[0].createdAt.toISOString(),
        },
      ])
    );
  });

  it('deve retornar erro se falhar ao buscar os PDFs', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
    });

    await GET(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual(
      JSON.stringify({ error: 'Erro ao buscar PDFs: Error: Database error' })
    );
  });
});
