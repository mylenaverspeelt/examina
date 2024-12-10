// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import PDFParser from 'pdf2json';

// jest.mock('@prisma/client', () => {
//     return {
//         PrismaClient: jest.fn().mockImplementation(() => ({
//             storage: {
//                 create: jest.fn().mockResolvedValue({
//                     id: 1,
//                     fileName: 'test.pdf',
//                     pdf: Buffer.from('mock pdf content'),
//                     createdAt: new Date(),
//                 }),
//             },
//             patient: {
//                 findFirst: jest.fn().mockResolvedValue(null),
//                 create: jest.fn().mockResolvedValue({
//                     id: 1,
//                     name: 'John Doe',
//                     age: '35',
//                     birthDate: '1988-01-01',
//                 }),
//             },
//             glucose: {
//                 create: jest.fn().mockResolvedValue({
//                     id: 1,
//                     patientId: 1,
//                     pdfId: 1,
//                     result: 120,
//                     createdAt: new Date(),
//                 }),
//             },
//             $disconnect: jest.fn(),
//         })),
//     };
// });

// jest.mock('pdf2json', () => {
//     return jest.fn().mockImplementation(() => ({
//         on: jest.fn((event, callback) => {
//             if (event === 'pdfParser_dataReady') {
//                 callback({});
//             }
//         }),
//         parseBuffer: jest.fn(),
//     }));
// });

// jest.mock('../../../../utils/convertToText', () => ({
//     convertToText: jest.fn().mockReturnValue({
//         Paciente: 'John Doe',
//         Result: '120',
//         Idade: '35',
//         DataNascimento: '1988-01-01',
//     }),
// }));

// const { POST } = require('./route');

// describe('Upload Route', () => {
//     let prisma: any;

//     beforeEach(() => {
//         jest.clearAllMocks();

//         prisma = new PrismaClient();
//     });

//     const createMockRequest = (fileContent = 'mock pdf content', contentType = 'multipart/form-data') => {
//         const mockFile = new File([fileContent], 'test.pdf', { type: 'application/pdf' });

//         return new NextRequest(new Request('http://localhost/api/upload', {
//             method: 'POST',
//             headers: {
//                 'content-type': contentType
//             },
//             body: (() => {
//                 const formData = new FormData();
//                 formData.append('file', mockFile);
//                 return formData;
//             })()
//         }));
//     };

//     it('should successfully upload and process PDF', async () => {
//         const mockPdfContent = `Paciente: John Doe  Idade: 35  Data de nascimento: 1988-01-01  Glicose: 120 mg/dL`;

//         const req = createMockRequest(mockPdfContent);

//         const response = await POST(req);
//         const result = await response.json();


//         expect(response.status).toBe(200);
//         expect(result).toEqual({
//             success: true,
//             message: 'Arquivo enviado e processado com sucesso!',
//         });
//     });

//     it('should handle invalid content type', async () => {
//         const req = createMockRequest('mock content', 'application/json');

//         const response = await POST(req);
//         const result = await response.json();

//         expect(response.status).toBe(400);
//         expect(result).toEqual({
//             success: false,
//             message: 'Formato inválido. Esperado multipart/form-data',
//         });
//     });

//     it('should handle no files uploaded', async () => {
//         const req = new NextRequest(new Request('http://localhost/api/upload', {
//             method: 'POST',
//             headers: { 'content-type': 'multipart/form-data' },
//             body: (() => {
//                 const formData = new FormData();
//                 return formData;
//             })()
//         }));

//         const response = await POST(req);
//         const result = await response.json();

//         expect(response.status).toBe(400);
//         expect(result).toEqual({
//             success: false,
//             message: 'Nenhum arquivo enviado',
//         });
//     });
// });
