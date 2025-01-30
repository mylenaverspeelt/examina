import { NextRequest } from "next/server"

const findManyMock = jest.fn()

jest.mock("@prisma/client", () => ({
	PrismaClient: jest.fn().mockImplementation(() => ({
		patient: {
			findMany: findManyMock,
		},
	})),
}))

const { GET } = require("./route")

describe("GET /api/patients", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it("should return 400 if no query parameter is provided", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients",
		} as NextRequest

		const response = await GET(mockRequest)

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: "Parâmetro de busca inválido" })
	})

	it("should return 500 if an error occurs when querying the database", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=John",
		} as NextRequest

		findManyMock.mockRejectedValue(new Error("Database error"))

		const response = await GET(mockRequest)

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({ "error": "Erro ao buscar pacientesError: Database error" })
	})

	it("should return a list of patients if query is valid", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=John",
		} as NextRequest

		findManyMock.mockResolvedValue([
			{ id: 1, name: "John Doe" },
			{ id: 2, name: "Johnny Depp" },
		])

		const response = await GET(mockRequest)

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({
			patients: [
				{ id: 1, name: "John Doe" },
				{ id: 2, name: "Johnny Depp" },
			],
		})
	})

	it("should return patients array structure", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=John",
		} as NextRequest

		findManyMock.mockResolvedValue([
			{ id: 1, name: "John Doe" },
			{ id: 2, name: "Johnny Depp" },
		])

		const response = await GET(mockRequest)
		const result = await response.json()

		expect(Array.isArray(result.patients)).toBe(true)
		expect(result.patients[0]).toHaveProperty("id")
		expect(result.patients[0]).toHaveProperty("name")
	})

	it("should return patients matching partial name search", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=Joh",
		} as NextRequest

		findManyMock.mockResolvedValue([
			{ id: 1, name: "John Doe" },
			{ id: 2, name: "Johnny Depp" },
		])

		const response = await GET(mockRequest)

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({
			patients: [
				{ id: 1, name: "John Doe" },
				{ id: 2, name: "Johnny Depp" },
			],
		})
	})

	it("should return 400 if query parameter is empty", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=",
		} as NextRequest

		const response = await GET(mockRequest)

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: "Parâmetro de busca inválido" })
	})

	it("should handle query with special characters", async () => {
		const mockRequest = {
			url: "http://localhost/api/patients?query=%40John%21",
		} as NextRequest

		findManyMock.mockResolvedValue([
			{ id: 1, name: "John@Doe" },
		])

		const response = await GET(mockRequest)

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({
			patients: [{ id: 1, name: "John@Doe" }],
		})
	})
})