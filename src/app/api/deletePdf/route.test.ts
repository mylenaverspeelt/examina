import { DELETE } from './route';
import { NextRequest } from 'next/server';
import { DeleteService } from '@/services/pdfs/deletePdf.service';

jest.mock('@/services/pdfs/deletePdf.service.ts', () => ({
  DeleteService: {
    deletePDF: jest.fn(),
  },
}));

function createNextRequestMock(body: any, method = 'DELETE'): NextRequest {
  const url = 'http://localhost/api/delete';
  return {
    method,
    headers: new Headers(),
    nextUrl: new URL(url),
    json: async () => body,
    cookies: {},
    body: JSON.stringify(body),
  } as unknown as NextRequest;
}

describe('DELETE /api/delete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a PDF successfully', async () => { 
    const mockDeletePDF = DeleteService.deletePDF as jest.Mock;
    mockDeletePDF.mockResolvedValueOnce('PDF excluído com sucesso');

    const nextReq = createNextRequestMock({ id: 1 });

    const response = await DELETE(nextReq);

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result).toEqual({ message: 'PDF excluído com sucesso' });
    expect(mockDeletePDF).toHaveBeenCalledWith({ id: 1 });
  });

  it('should return an error if no ID is provided', async () => {
    const nextReq = createNextRequestMock({});

    const response = await DELETE(nextReq);

    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result).toEqual({ message: 'ID é necessário' });
  });

  it('should return an error if PDF deletion fails', async () => {
    const mockDeletePDF = DeleteService.deletePDF as jest.Mock;
    mockDeletePDF.mockRejectedValueOnce(new Error('Deletion failed'));

    const nextReq = createNextRequestMock({ id: 1 });

    const response = await DELETE(nextReq);

    expect(response.status).toBe(500);
    const result = await response.json();
    expect(result).toEqual({ message: 'Erro ao excluir PDFError: Deletion failed' });
    expect(mockDeletePDF).toHaveBeenCalledWith({ id: 1 });
  });
});