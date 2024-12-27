import { NextRequest, NextResponse } from 'next/server';
import { PatientIdService } from '@/services/patients/patientId.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID do paciente é obrigatório' }, { status: 400 });
  }

  try {
    const patient = await PatientIdService.getPatientById(parseInt(id, 10));

    if (!patient) {
      return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar paciente' + error }, { status: 500 });
  }
}
