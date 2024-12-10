import { createMocks } from 'node-mocks-http';

const deleteMock = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    storage: {
      delete: deleteMock,
    },
    $disconnect: jest.fn(),
  })),
}));

const { DELETE } = require('./route');

describe('DELETE /api/delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should delete a PDF successfully', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: { id: 1 },
    });

    req.json = jest.fn().mockResolvedValue({ id: 1 });
    deleteMock.mockResolvedValue({});

    const response = await DELETE(req);

    expect(response.status).toBe(200);

    const result = await response.json();
    expect(result).toEqual({ message: 'PDF excluído com sucesso' });
    expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should return an error when ID is not provided', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: {},
    });

    req.json = jest.fn().mockResolvedValue({});

    const response = await DELETE(req);

    expect(response.status).toBe(400);

    const result = await response.json();
    expect(result).toEqual({ message: 'ID é necessário' });
  });

  it('should return an error when PDF deletion fails', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: { id: 1 },
    });

    req.json = jest.fn().mockResolvedValue({ id: 1 });
    deleteMock.mockRejectedValue(new Error('Deletion failed'));

    const response = await DELETE(req);

    expect(response.status).toBe(500);

    const result = await response.json();
    expect(result).toEqual({ message: 'Erro ao excluir PDF' });
  });

  it('should return error 500 in case of connection failure', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: { id: 1 },
    });
  
    req.json = jest.fn().mockResolvedValue({ id: 1 });
    deleteMock.mockRejectedValueOnce(new Error('Database connection failed'));
  
    const response = await DELETE(req);
  
    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result).toEqual({ message: 'Erro ao excluir PDF' });
  });
});
