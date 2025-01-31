import { NextRequest, NextResponse } from "next/server"
import { UploadPdfService } from "@/services/pdfs/uploadPdf.service"
import parseFormData from "@/utils/parseFormData"

export const config = {
	api: {
		bodyParser: false, 
	},
}

export async function POST(req: NextRequest) {
	try {
		const contentType = req.headers.get("content-type")
		if (!contentType || !contentType.includes("multipart/form-data")) {
			return NextResponse.json(
				{ success: false, message: "Formato inválido. Esperado multipart/form-data." },
				{ status: 400 }
			)
		}

		const fileData = await parseFormData(req)

		if (!fileData?.buffer || !fileData?.fileName) {
			return NextResponse.json(
				{ success: false, message: "Arquivo não encontrado no corpo da requisição." },
				{ status: 400 }
			)
		}

		const response = await UploadPdfService.processPdf(fileData.buffer, fileData.fileName)
		return NextResponse.json(response, { status: 200 })

	} catch (error: any) {
		console.error("Erro ao processar o upload:", error.message)
		return NextResponse.json(
			{
				success: false,
				message: "Erro interno do servidor.",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}


