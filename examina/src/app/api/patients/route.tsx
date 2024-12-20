import { NextRequest, NextResponse } from 'next/server';
import { PatientService } from '@/services/PatientService/patient.service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Parâmetro de busca inválido' }, { status: 400 });
  }

  try {
    const response = await PatientService.searchPatients(query);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pacientes' }, { status: 500 });
  }
}
