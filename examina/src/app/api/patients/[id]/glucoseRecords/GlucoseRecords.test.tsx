import { NextRequest } from 'next/server';
import { PatientIdGlucoseService } from '@/services/PatientIdGlucose/patientIdGlucose.service';

jest.mock('@/services/PatientIdGlucose/patientIdGlucose.service', () => ({
  PatientIdGlucoseService: {
    getGlucoseRecordsByPatientId: jest.fn(),
  },
}));

const { GET } = require('./route');

describe('GET /api/glucose/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 500 se ocorrer um erro ao buscar registros de glicose', async () => {
    const mockRequest = { url: 'http://localhost/api/glucose/1' } as NextRequest;

    const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock;
    mockService.mockRejectedValue(new Error('Database error'));

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Erro ao buscar registros de glicose' });
  });

  it('deve retornar 200 e uma lista de registros de glicose se encontrados', async () => {
    const mockRequest = { url: 'http://localhost/api/glucose/1' } as NextRequest;

    const mockRecords = [
      { createdAt: '2024-01-01T00:00:00.000Z', result: 120 },
      { createdAt: '2024-02-01T00:00:00.000Z', result: 130 },
    ];

    const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock;
    mockService.mockResolvedValue({ records: mockRecords });

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      records: mockRecords,
    });
  });

  it('deve retornar uma lista vazia se não houver registros de glicose para o paciente', async () => {
    const mockRequest = { url: 'http://localhost/api/glucose/1' } as NextRequest;

    const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock;
    mockService.mockResolvedValue({ records: [] });

    const response = await GET(mockRequest, { params: { id: '1' } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ records: [] });
  });

  it('deve retornar registros de glicose com a estrutura correta', async () => {
    const mockRequest = { url: 'http://localhost/api/glucose/1' } as NextRequest;

    const mockRecords = [
      { createdAt: '2024-01-01T00:00:00.000Z', result: 120 },
      { createdAt: '2024-02-01T00:00:00.000Z', result: 130 },
    ];

    const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock;
    mockService.mockResolvedValue({ records: mockRecords });

    const response = await GET(mockRequest, { params: { id: '1' } });
    const result = await response.json();

    result.records.forEach((record: any) => {
      expect(typeof record.createdAt).toBe('string'); 
      expect(typeof record.result).toBe('number');
    });
  });
});
