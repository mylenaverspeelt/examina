import { NextRequest, NextResponse } from 'next/server';
import { PatientIdService } from '@/services/patients/patientId.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID do paciente é obrigatório e deve ser um número válido.' }, { status: 400 });
    }

    const patient = await PatientIdService.getPatientById(Number(id));
    if (!patient) {
      return NextResponse.json({ error: 'Paciente não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ patient }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar paciente.' }, { status: 500 });
  }
}
