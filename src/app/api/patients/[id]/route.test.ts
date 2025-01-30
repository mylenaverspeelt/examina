import { NextRequest } from "next/server"

const findUniqueMock = jest.fn()

jest.mock("@prisma/client", () => ({
	PrismaClient: jest.fn().mockImplementation(() => ({
		patient: {
			findUnique: findUniqueMock,
		},
	})),
}))

const { GET } = require("./route")

describe("GET /api/patients/[id]", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it("should return 400 if no id parameter is provided", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients",
		} as NextRequest

		const response = await GET(mockRequest, { params: { id: "" } })

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: "ID do paciente é obrigatório e deve ser um número válido." })
	})

	it("should return 404 if patient is not found", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients/999",
		} as NextRequest

		findUniqueMock.mockResolvedValue(null)

		const response = await GET(mockRequest, { params: { id: "999" } })

		expect(response.status).toBe(404)
		expect(await response.json()).toEqual({ error: "Paciente não encontrado." })
	})

	it("should return 500 if an error occurs when querying the database", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients/1",
		} as NextRequest

		findUniqueMock.mockRejectedValue(new Error("Database error"))

		const response = await GET(mockRequest, { params: { id: "1" } })

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({ error: "Erro ao buscar paciente." })
	})

	it("should return patient with correct structure", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients/1",
		} as NextRequest

		findUniqueMock.mockResolvedValue({
			id: 1,
			name: "João da Silva",
			age: 45,
			birthDate: "1978-05-15",
		})

		const response = await GET(mockRequest, { params: { id: "1" } })
		const result = await response.json()

		expect(result.patient).toHaveProperty("id")
		expect(result.patient).toHaveProperty("name")
		expect(result.patient).toHaveProperty("age")
		expect(result.patient).toHaveProperty("birthDate")
		expect(typeof result.patient.age).toBe("number")
		expect(typeof result.patient.birthDate).toBe("string")
	})
})