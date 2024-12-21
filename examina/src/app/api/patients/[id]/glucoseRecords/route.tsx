import { NextRequest, NextResponse } from 'next/server';
import { PatientIdGlucoseService } from '@/services/PatientIdGlucose/patientIdGlucose.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID do paciente é obrigatório e deve ser um número válido' }, { status: 400 });
  }

  try {
    const patientId = parseInt(id, 10);
    const response = await PatientIdGlucoseService.getGlucoseRecordsByPatientId(patientId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar registros de glicose' }, { status: 500 });
  }
}
