/**
 * @swagger
components:
  schemas:
    PdfUploadResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
    PdfUploadErrorResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
        details:
          type: string
  requestBodies:
    PdfUploadRequest:
      description: Requisição para upload de PDF
      required: true
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              file:
                type: string
                format: binary
                description: O arquivo PDF para ser enviado
responses:
  PdfUploadSuccess:
    description: Arquivo enviado e processado com sucesso
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PdfUploadResponse'
  PdfUploadError:
    description: Erro ao processar o PDF
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PdfUploadErrorResponse'

paths:
  /api/upload:
    post:
      summary: Faz o upload e processamento de um arquivo PDF
      description: Envia um arquivo PDF para extração de informações e armazena os dados no banco de dados.
      requestBody:
        $ref: '#/components/requestBodies/PdfUploadRequest'
      responses:
        200:
          $ref: '#/components/responses/PdfUploadSuccess'
        400:
          description: Erro de validação ou formato de arquivo inválido
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PdfUploadErrorResponse'
        500:
          $ref: '#/components/responses/PdfUploadError'

 */

import prisma from "@/utils/prisma/prisma"
import PDFParser from "pdf2json"
import { convertToText } from "@/utils/convertToText"
import { PdfUploadResponse } from "@/dto/pdfs/uploadPdf.dto"

export class UploadPdfService {
	static async processPdf(fileBuffer: Buffer, originalName: string): Promise<PdfUploadResponse> {
		const pdfParser = new PDFParser()

		return new Promise((resolve, reject) => {
			pdfParser.on("pdfParser_dataError", () => {
				reject(new Error("Erro ao processar o PDF"))
			})

			pdfParser.on("pdfParser_dataReady", async (pdfData) => {
				try {
					const extractedData = convertToText(pdfData)

					if (!extractedData.Paciente || !extractedData.Result || isNaN(parseInt(extractedData.Result, 10))) {
						throw new Error("Dados extraídos inválidos ou incompletos")
					}

					const glucoseValue = parseInt(extractedData.Result, 10)

					const storageEntry = await prisma.storage.create({
						data: {
							fileName: originalName,
							pdf: fileBuffer,
						},
					})

					let patient = await prisma.patient.findFirst({
						where: { name: extractedData.Paciente },
					})

					if (!patient) {
						patient = await prisma.patient.create({
							data: {
								name: extractedData.Paciente,
								age: extractedData.Idade,
								birthDate: extractedData.DataNascimento,
							},
						})
					}

					await prisma.glucose.create({
						data: {
							patientId: patient.id,
							pdfId: storageEntry.id,
							result: glucoseValue,
							createdAt: new Date(),
						},
					})

					resolve({
						success: true,
						message: "Arquivo enviado e processado com sucesso!",
					})
				} catch (error) {
					if (error instanceof Error) {
						reject({
							success: false,
							message: "Erro ao salvar dados no banco de dados",
							details: error.message,
						})
					} else {
						reject({
							success: false,
							message: "Erro desconhecido ao processar os dados",
						})
					}
				}
			})

			pdfParser.parseBuffer(fileBuffer)
		})
	}
}
