// import { POST } from './route';
// import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
// import { NextRequest } from 'next/server';
// import { JSDOM } from 'jsdom';

// jest.mock('@/services/pdfs/uploadPdf.service', () => ({
//   UploadPdfService: {
//     processPdf: jest.fn(),
//   },
// }));

// const dom = new JSDOM();
// global.File = dom.window.File;
// global.FormData = dom.window.FormData;
// global.Headers = dom.window.Headers;

// describe('POST /api/uploadPdf', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 400 error if content-type is not multipart/form-data', async () => {
//     const mockRequest = {
//       headers: new Headers({ 'content-type': 'application/json' }),
//     } as unknown as NextRequest;

//     const response = await POST(mockRequest);
//     const responseBody = await response.json();

//     expect(response.status).toBe(400);
//     expect(responseBody).toEqual({
//       success: false,
//       message: 'Formato inválido. Esperado multipart/form-data',
//     });
//   });

//   it('should return 400 error if no file is sent', async () => {
//     const mockRequest = {
//       headers: new Headers({ 'content-type': 'multipart/form-data' }),
//       formData: async () => new FormData(),
//     } as unknown as NextRequest;

//     const response = await POST(mockRequest);
//     const responseBody = await response.json();

//     expect(response.status).toBe(400);
//     expect(responseBody).toEqual({
//       success: false,
//       message: 'Arquivo não enviado ou formato inválido',
//     });
//   });

//   it('should return 200 success upon processing a valid PDF', async () => {
//     const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
//     const mockFormData = new FormData();
//     mockFormData.append('file', mockFile);

//     const mockRequest = {
//       headers: new Headers({ 'content-type': 'multipart/form-data' }),
//       formData: async () => mockFormData,
//     } as unknown as NextRequest;

//     (UploadPdfService.processPdf as jest.Mock).mockResolvedValue({
//       success: true,
//       message: 'Arquivo enviado e processado com sucesso!',
//     });

//     const response = await POST(mockRequest);
//     const responseBody = await response.json();

//     expect(response.status).toBe(200);
//     expect(responseBody).toEqual({
//       success: true,
//       message: 'Arquivo enviado e processado com sucesso!',
//     });
//     expect(UploadPdfService.processPdf).toHaveBeenCalledWith(expect.any(String));
//   });

//   it('should return 500 error if the service fails', async () => {
//     const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
//     const mockFormData = new FormData();
//     mockFormData.append('file', mockFile);

//     const mockRequest = {
//       headers: new Headers({ 'content-type': 'multipart/form-data' }),
//       formData: async () => mockFormData,
//     } as unknown as NextRequest;

//     const error = new Error('Erro ao processar o PDF');
//     (UploadPdfService.processPdf as jest.Mock).mockRejectedValue(error);

//     const response = await POST(mockRequest);
//     const responseBody = await response.json();

//     expect(response.status).toBe(500);
//     expect(responseBody).toEqual({
//       success: false,
//       message: 'Erro interno do servidor',
//       details: 'Erro ao processar o PDF',
//     });
//   });

//   it('should return 500 error for unknown errors', async () => {
//     const mockFile = new File(['test-content'], 'test.pdf', { type: 'application/pdf' });
//     const mockFormData = new FormData();
//     mockFormData.append('file', mockFile);

//     const mockRequest = {
//       headers: new Headers({ 'content-type': 'multipart/form-data' }),
//       formData: async () => mockFormData,
//     } as unknown as NextRequest;

//     (UploadPdfService.processPdf as jest.Mock).mockRejectedValue('Erro desconhecido');

//     const response = await POST(mockRequest);
//     const responseBody = await response.json();

//     expect(response.status).toBe(500);
//     expect(responseBody).toEqual({
//       success: false,
//       message: 'Erro interno do servidor',
//     });
//   });
// });
