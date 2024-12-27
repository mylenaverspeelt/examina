import { POST } from './route';
import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
import { NextRequest } from 'next/server';

jest.mock('@/services/pdfs/uploadPdf.service.ts', () => ({
  UploadPdfService: {
    processPdf: jest.fn(),
  },
}));

describe('POST /api/uploadPdf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar erro 400 se o conteúdo não for multipart/form-data', async () => {
    const mockRequest = {
      headers: new Headers({ 'content-type': 'application/json' }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      success: false,
      message: 'Formato inválido. Esperado multipart/form-data',
    });
  });

  it('deve retornar erro 400 se nenhum arquivo for enviado', async () => {
    const mockRequest = {
      headers: new Headers({ 'content-type': 'multipart/form-data' }),
      formData: async () => new FormData(),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      success: false,
      message: 'Arquivo não enviado ou formato inválido',
    });
  });

  it('deve retornar sucesso 200 ao processar um PDF válido', async () => {
    const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile);

    const mockRequest = {
      headers: new Headers({ 'content-type': 'multipart/form-data' }),
      formData: async () => mockFormData,
    } as unknown as NextRequest;

    (UploadPdfService.processPdf as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Arquivo enviado e processado com sucesso!',
    });

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({
      success: true,
      message: 'Arquivo enviado e processado com sucesso!',
    });
    expect(UploadPdfService.processPdf).toHaveBeenCalledWith('test.pdf', expect.any(Buffer));
  });

  it('deve retornar erro 500 se o serviço falhar', async () => {
    const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile);

    const mockRequest = {
      headers: new Headers({ 'content-type': 'multipart/form-data' }),
      formData: async () => mockFormData,
    } as unknown as NextRequest;

    const error = new Error('Erro ao processar o PDF');
    (UploadPdfService.processPdf as jest.Mock).mockRejectedValue(error);

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      success: false,
      message: 'Erro interno do servidor',
      details: 'Erro ao processar o PDF',
    });
  });

  it('deve retornar erro 500 para erros desconhecidos', async () => {
    const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile);

    const mockRequest = {
      headers: new Headers({ 'content-type': 'multipart/form-data' }),
      formData: async () => mockFormData,
    } as unknown as NextRequest;

    (UploadPdfService.processPdf as jest.Mock).mockRejectedValue('Erro desconhecido');

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      success: false,
      message: 'Erro desconhecido ao processar o PDF',
    });
  });
});