import { NextRequest } from "next/server"
import { PatientIdGlucoseService } from "@/services/glucose/getPatientGlucose.service"

jest.mock("@/services/glucose/getPatientGlucose.service", () => ({
	PatientIdGlucoseService: {
		getGlucoseRecordsByPatientId: jest.fn(),
	},
}))

const { GET } = require("./route")

describe("GET /api/glucose/[id]", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should return 400 if ID is invalid", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/invalid" } as NextRequest
		const response = await GET(mockRequest, { params: { id: "invalid" } })

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({
			error: "ID do paciente é obrigatório e deve ser um número válido"
		})
	})

	it("should return 400 if ID is missing", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/" } as NextRequest
		const response = await GET(mockRequest, { params: { id: "" } })

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({
			error: "ID do paciente é obrigatório e deve ser um número válido"
		})
	})

	it("should return 404 if no records are found", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/1" } as NextRequest
		const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock
		mockService.mockResolvedValue(null)

		const response = await GET(mockRequest, { params: { id: "1" } })

		expect(response.status).toBe(404)
		expect(await response.json()).toEqual({
			error: "Nenhum registro de glicose encontrado para este paciente"
		})
	})

	it("should return 500 if an error occurs on the server", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/1" } as NextRequest
		const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock
		mockService.mockRejectedValue(new Error("Database error"))

		const response = await GET(mockRequest, { params: { id: "1" } })

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({
			error: "Erro ao buscar registros de glicoseError: Database error"
		})
	})

	it("should return 200 with valid glucose records", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/1" } as NextRequest
		const mockRecords = {
			records: [
				{ createdAt: "2024-01-01T00:00:00.000Z", result: 120 },
				{ createdAt: "2024-02-01T00:00:00.000Z", result: 130 }
			]
		}

		const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock
		mockService.mockResolvedValue(mockRecords)

		const response = await GET(mockRequest, { params: { id: "1" } })
		const result = await response.json()

		expect(response.status).toBe(200)
		expect(result).toEqual(mockRecords)
		expect(mockService).toHaveBeenCalledWith(1)
	})

	it("should validate the structure of glucose records", async () => {
		const mockRequest = { url: "http://localhost/api/glucose/1" } as NextRequest
		const mockRecords = {
			records: [
				{ createdAt: "2024-01-01T00:00:00.000Z", result: 120 },
				{ createdAt: "2024-02-01T00:00:00.000Z", result: 130 }
			]
		}

		const mockService = PatientIdGlucoseService.getGlucoseRecordsByPatientId as jest.Mock
		mockService.mockResolvedValue(mockRecords)

		const response = await GET(mockRequest, { params: { id: "1" } })
		const result = await response.json()

		result.records.forEach((record: any) => {
			expect(record).toHaveProperty("createdAt")
			expect(record).toHaveProperty("result")
			expect(typeof record.createdAt).toBe("string")
			expect(typeof record.result).toBe("number")
			expect(Date.parse(record.createdAt)).not.toBeNaN()
		})
	})
})