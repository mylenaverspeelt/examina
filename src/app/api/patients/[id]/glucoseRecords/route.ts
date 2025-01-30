import { NextRequest, NextResponse } from "next/server"
import { PatientIdGlucoseService } from "@/services/glucose/getPatientGlucose.service"

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id


	if (!id || isNaN(Number(id))) {
		return NextResponse.json(
			{ error: "ID do paciente é obrigatório e deve ser um número válido" },
			{ status: 400 }
		)
	}

	try {
		const patientId = parseInt(id, 10)
		const glucoseRecords = await PatientIdGlucoseService.getGlucoseRecordsByPatientId(patientId)

		if (!glucoseRecords) {
			return NextResponse.json(
				{ error: "Nenhum registro de glicose encontrado para este paciente" },
				{ status: 404 }
			)
		}

		return NextResponse.json(glucoseRecords)
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: "Erro ao buscar registros de glicose" + error },
			{ status: 500 }
		)
	}
}
