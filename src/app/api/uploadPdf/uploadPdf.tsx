// import { POST } from './route';
// import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
// import Busboy from 'busboy';
// import { Readable } from 'stream';
// import { NextResponse } from 'next/server';

// jest.mock('@/services/pdfs/uploadPdf.service', () => ({
//   UploadPdfService: {
//     processPdf: jest.fn(),
//   },
// }));

// jest.mock('busboy', () => {
//   return jest.fn().mockImplementation(() => ({
//     on: jest.fn(),
//     end: jest.fn(),
//   }));
// });

// describe('POST /api/upload', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const mockBusboyOn = jest.fn();
//   const mockBusboyEnd = jest.fn();

//   (Busboy as jest.Mock).mockImplementation(() => ({
//     on: mockBusboyOn,
//     end: mockBusboyEnd,
//   }));

//   function createReadableMock(data: Buffer): Readable {
//     const readable = new Readable({
//       read() {
//         this.push(data);
//         this.push(null); // Finaliza o stream
//       },
//     });
//     return readable;
//   }

//   it('should upload a PDF successfully', async () => {
//     const mockFileBuffer = Buffer.from('mock PDF content');
//     const mockFileName = 'test.pdf';
//     const mockResponse = { success: true, message: 'PDF uploaded successfully' };

//     const mockProcessPdf = UploadPdfService.processPdf as jest.Mock;
//     mockProcessPdf.mockResolvedValueOnce(mockResponse);

//     mockBusboyOn.mockImplementation((event: string, callback: Function) => {
//       if (event === 'file') {
//         callback(null, createReadableMock(mockFileBuffer), { filename: mockFileName });
//       } else if (event === 'finish') {
//         callback();
//       }
//     });

//     const req = {
//       method: 'POST',
//       headers: new Headers({
//         'content-type': 'multipart/form-data',
//       }),
//       body: createReadableMock(mockFileBuffer),
//     } as any;

//     const response = (await POST(req)) as NextResponse;

//     expect(response.status).toBe(200);
//     const result = await response.json();

//     expect(result).toEqual(mockResponse);
//     expect(mockProcessPdf).toHaveBeenCalledWith(mockFileBuffer, mockFileName);
//   });

//   it('should return an error if content-type is invalid', async () => {
//     const req = {
//       method: 'POST',
//       headers: new Headers({
//         'content-type': 'application/json',
//       }),
//     } as any;

//     const response = (await POST(req)) as NextResponse;

//     expect(response.status).toBe(400);
//     const result = await response.json();

//     expect(result).toEqual({
//       success: false,
//       message: 'Formato inválido. Esperado multipart/form-data',
//     });
//   });

//   it('should return an error if body is empty', async () => {
//     const req = {
//       method: 'POST',
//       headers: new Headers({
//         'content-type': 'multipart/form-data',
//       }),
//     } as any;

//     const response = (await POST(req)) as NextResponse;

//     expect(response.status).toBe(500);
//     const result = await response.json();

//     expect(result).toEqual({
//       success: false,
//       message: 'Erro interno do servidor',
//       details: 'Request body is empty',
//     });
//   });

//   it('should handle errors during file processing', async () => {
//     const mockFileBuffer = Buffer.from('mock PDF content');
//     const mockFileName = 'test.pdf';

//     const mockProcessPdf = UploadPdfService.processPdf as jest.Mock;
//     mockProcessPdf.mockRejectedValueOnce(new Error('Processing failed'));

//     mockBusboyOn.mockImplementation((event: string, callback: Function) => {
//       if (event === 'file') {
//         callback(null, createReadableMock(mockFileBuffer), { filename: mockFileName });
//       } else if (event === 'finish') {
//         callback();
//       }
//     });

//     const req = {
//       method: 'POST',
//       headers: new Headers({
//         'content-type': 'multipart/form-data',
//       }),
//       body: createReadableMock(mockFileBuffer),
//     } as any;

//     const response = (await POST(req)) as NextResponse;

//     expect(response.status).toBe(500);
//     const result = await response.json();

//     expect(result).toEqual({
//       success: false,
//       message: 'Erro interno do servidor',
//       details: 'Processing failed',
//     });
//   });
// });
