import { NextRequest, NextResponse } from "next/server"
import { PatientService } from "@/services/patients/getPatients.service"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get("query")

	if (!query) {
		return NextResponse.json({ error: "Parâmetro de busca inválido" }, { status: 400 })
	}

	try {
		const response = await PatientService.searchPatients(query)
		return NextResponse.json(response)
	} catch (error:unknown) {
		return NextResponse.json({ error: "Erro ao buscar pacientes" + error }, { status: 500 })
	}
}
